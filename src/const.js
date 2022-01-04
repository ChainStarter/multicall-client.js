import lodash from "lodash";
export const ChainId = {
  ETH: 1,
  BSC: 56,
  HECO: 128,
  MATIC: 137
}

export const multicallConfig = {
  defaultChainId: ChainId.ETH,
  delay: 100,
  timeout: 20000,
  maxCalls: 500,
  allowFailure: true,
  rpc: {
    [ChainId.ETH]: {
      url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    },
    [ChainId.BSC]: {
      url: 'https://bsc-dataseed.binance.org/',
      address: '0x6427169aB7344F9C37E9dC9001c681BEcd09343d',
    },
    [ChainId.HECO]: {
      url: 'https://http-mainnet-node.huobichain.com',
      address: '0xBF4b1bE1F00F5624ba4D65f8548ccF6E75d0deFe',
    },
    [ChainId.MATIC]: {
      url: 'https://polygon-rpc.com/',
      address: '0x6427169aB7344F9C37E9dC9001c681BEcd09343d',
    }
  }
}

/**
 * @param configData
 * @returns {{allowFailure: boolean, delay: number, rpc: {[p: string]: {address: string, url: string}|{address: string, url: string}|{address: string, url: string}|{address: string, url: string}, [p: number]: {address: string, url: string}|{address: string, url: string}|{address: string, url: string}|{address: string, url: string}, "[ChainId.MATIC]": {address: string, url: string}}, defaultChainId: (number|number), timeout: number, maxCalls: number}}
 */
export function config(configData){
  lodash.merge(
    multicallConfig,
    configData
  )
  return multicallConfig
}

