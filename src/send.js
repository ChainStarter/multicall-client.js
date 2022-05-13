import Web3 from "web3";
import Multicall2Abi from './abi/multicall2.json'
import {multicallConfig} from "./const";
import {contractStore} from "./contract";


export const getContract = (provider, abi, address) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(abi, address)
}

export async function multicallClientSend(calls, provider){
  const firstCall = calls[0]
  const multicallAddress = multicallConfig.rpc[firstCall.chainId].address
  const multicall = getContract(provider, Multicall2Abi, multicallAddress)
  const callRequests = calls.map(call => {
    const contract = contractStore[`${call.address}_${call.chainId}`]
    return [
      call.address,
      contract.methods[call.method](...call.params).encodeABI()
    ]
  })
  return multicall.methods.aggregate(callRequests)
}
