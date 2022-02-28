import {multicallConfig} from "./const";
import Multicall2Abi from './abi/multicall2.json'
import {Contract, contractStore} from "./contract";
import Web3 from "web3";

/**
 * Increasing
 * @type {{'chainId': 0}}
 */
let groupId = {}

/**
 * Increasing
 * @type {number}
 */
let callsId = 0

/**
 * @type {{'groupId_chainId': {calls,timeOut}}}
 */
let callsGroup = {}

/**
 * @type {{'callsId': {resolve,calls}}}
 */
const resolveGroup = {}

function checkedResult() {
  for (let i in resolveGroup) {
    const result = []
    for (let j = 0; j < resolveGroup[i].calls.length; j++) {
      if (resolveGroup[i].calls[j].result === undefined) {
        break
      } else {
        result.push(resolveGroup[i].calls[j].result)
      }
    }
    if (result.length === resolveGroup[i].calls.length) {
      resolveGroup[i].resolve(result)
      delete resolveGroup[i]
    }
  }
}

function objectToArray(obj) {
  if (obj.__length__ === 1) {
    return obj[0]
  }
  const arr = []
  for (let i = 0; i < obj.__length__; i++) {
    arr.push(obj[i])
  }
  return arr
}

async function request(calls) {
  const queryCalls = calls
  const firstCall = calls[0]
  const rpc = multicallConfig.rpc[firstCall.chainId]
  if (!rpc) {
    throw new Error(`multicall-client unsupported chainId(${firstCall.chainId}). Please read the documentation to configure rpc`)
  }
  var web3 = new Web3(new Web3.providers.HttpProvider(rpc.url));
  const multicall = new web3.eth.Contract(Multicall2Abi, rpc.address)
  const callRequests = queryCalls.map(call => {
    const contract = contractStore[`${call.address}_${call.chainId}`]
    return [
      call.address,
      contract.methods[call.method](...call.params).encodeABI()
    ]
  })
  const aggregate = multicallConfig.allowFailure ? 'blockAndAggregate' : 'aggregate'
  const response = await new Promise((async (resolve) => {
    let result;
    const timeout = setTimeout(() => {
      if (!result) {
        resolve({returnData: []})
        throw new Error(`Request timed out ${multicallConfig.timeout}ms`)
      }
    }, multicallConfig.timeout)
    multicall.methods[aggregate](callRequests).call().then(result_ => {
      result = result_
      clearTimeout(timeout)
      resolve(result)
    }).catch((e) => {
      clearTimeout(timeout)
      resolve({returnData: []})
      throw e
    })
  }))
  for (let i = 0; i < queryCalls.length; i++) {
    let result
    if (multicallConfig.allowFailure) {
      if (!response.returnData[i]) {
        result = [false, null]
        result.success = false
        result.returnData = null
      } else {
        const result_ = objectToArray(web3.eth.abi.decodeParameters(queryCalls[i].outputs, response.returnData[i].returnData))
        result = [
          response.returnData[i].success,
          result_
        ]
        result.success = response.returnData[i].success
        result.returnData = result_
      }
    } else {
      if (!response.returnData[i]) {
        result = null
      } else {
        result = objectToArray(web3.eth.abi.decodeParameters(queryCalls[i].outputs, response.returnData[i]))
      }
    }
    queryCalls[i].result = result
    checkedResult()
  }
}

/**
 * @param calls
 * @returns {Promise<result>}
 */
export function multicallClient(calls) {
  function handleData() {
    // Grouping to chainId
    for (let i = 0; i < calls.length; i++) {
      const chainId = calls[i].chainId || multicallConfig.defaultChainId
      if (!groupId[chainId]) {
        groupId[chainId] = 0
      }
      const key = `${groupId[chainId]}_${chainId}`
      if (callsGroup[key]) {
        callsGroup[key].calls.push(calls[i])
        // full
        if (callsGroup[key].calls.length >= multicallConfig.maxCalls) {
          groupId[chainId] += 1
        }
      } else {
        callsGroup[key] = {
          calls: [calls[i]]
        }
      }
    }
    // handle timeDebounce,calls
    for (let key in callsGroup) {
      if (callsGroup[key].timeOut) {
        clearTimeout(callsGroup[key].timeOut)
        callsGroup[key].timeOut = null
      }
      if (callsGroup[key].calls.length >= multicallConfig.maxCalls) {
        request(callsGroup[key].calls)
        groupId[callsGroup[key].calls[0].chainId] += 1
        delete callsGroup[key]
      } else {
        // reset timeOut
        callsGroup[key].timeOut = setTimeout(() => {
          request(callsGroup[key].calls)
          groupId[callsGroup[key].calls[0].chainId] += 1
          delete callsGroup[key]
        }, multicallConfig.delay)
      }
    }
  }

  return new Promise((resolve, reject) => {
    resolveGroup[callsId++] = {
      resolve,
      calls
    }
    handleData()
  })
}

function getMulticallContract(chainId_) {
  const chainId = chainId_ || multicallConfig.defaultChainId
  const rpc = multicallConfig.rpc[chainId]
  if (!rpc) {
    throw new Error(`multicall-client unsupported chainId(${chainId}). Please read the documentation to configure rpc`)
  }
  return new Contract(Multicall2Abi, rpc.address, chainId);
}

/**
 * @param chainId
 * @returns {Promise<{difficulty: *, number: *, gasLimit: *, Timestamp: *, hash: *}>}
 */
multicallClient.getBlockInfo = async function (chainId) {
  const contract = getMulticallContract(chainId)
  const calls = [
    contract.getBlockNumber(),
    contract.getCurrentBlockCoinbase(),
    contract.getCurrentBlockDifficulty(),
    contract.getCurrentBlockGasLimit(),
    contract.getCurrentBlockTimestamp(),
    contract.getLastBlockHash()
  ]
  const result = await multicallClient(calls)
  const [number, coinbase, difficulty, gasLimit, Timestamp, hash] = result
  return {number,coinbase, difficulty, gasLimit, Timestamp, hash}
}

/**
 * @param address
 * @param chainId
 * @returns {Promise<balance>}
 */
multicallClient.getEthBalance = async function (address, chainId) {
  const contract = getMulticallContract(chainId)
  const calls = [
    contract.getEthBalance(address)
  ]
  const result = await multicallClient(calls)
  const [balance] = result
  return balance
}
/**
 *
 * @param blockNumber
 * @param chainId
 * @returns {Promise<hash>}
 */
multicallClient.getBlockHash = async function (blockNumber, chainId) {
  const contract = getMulticallContract(chainId)
  const calls = [
    contract.getBlockHash(blockNumber)
  ]
  const result = await multicallClient(calls)
  const [hash] = result
  return hash
}
