import {multicallConfig} from "./const";
const EthContract = require('web3-eth-contract');

/**
 * @type {{address_chainId: Contract}}
 */
export const contractStore = {}
const abiStore = {}
/**
 * @param abi
 * @param address
 * @param chainId
 * @returns {{address, chainId: number, abi}}
 * @constructor
 */
export function Contract(abi, address, chainId = multicallConfig.defaultChainId){
  const abi_ = abi.reduce((_, item) => {
    if (item.type === 'function') {
      _[item.name] = item
      const inputs = item.inputs.reduce((l,i)=>{
        l.push(i.type)
        return l
      },[])
      _[`${item.name}(${inputs.join(',')})`] = item
    }
    return _
  }, {})
  const key = `${address}_${chainId}`
  if (!abiStore[key]){
    abiStore[key] = abi
  } else {
    const newAbi_ = [...abiStore[key], ...abi]
    const newAbi = []
    const filterMap = {}
    for (let i = 0; i < newAbi_.length; i++) {
      const jsonStr = JSON.stringify(newAbi_[i])
      if (!filterMap[jsonStr]){
        newAbi.push(newAbi_[i])
      }
      filterMap[jsonStr] = true
    }
    abiStore[key] = newAbi
  }
  contractStore[key] = new EthContract(abiStore[key], address)
  const contract = {
    abi,
    address,
    chainId
  }

  function methods(method, params){
    if (!abi_[method]) {
      throw new Error(`'${method}' is not a function`);
    }
    if (abi_[method].inputs.length !== params.length) {
      throw new Error(`The method parameter is ${abi_[method].inputs.length} and only ${params.length} was found`);
    }
    return {
      method,
      params,
      address: contract.address,
      chainId,
      outputs: abi_[method].outputs
    }
  }
  return new Proxy(contract, {
    get: function(target, key) {
      return (...arg) => methods(key, arg);
    },
  })
}
/**
 * @param abi
 * @param address
 * @param chainId
 * @returns {{address, chainId: number, abi}}
 * @constructor
 */
export function newContract(abi, address, chainId = multicallConfig.defaultChainId){
  return new Contract(abi, address, chainId)
}
