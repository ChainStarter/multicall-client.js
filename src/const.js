import lodash from "lodash";
export const ChainId = {
  ETH: 1,
  BSC: 56,
  HECO: 128,
  MATIC: 137,
  OKEX: 66,
  MAINNET : 1,
  ROPSTEN : 3,
  RINKEBY : 4,
  GOERLI: 5,
  KOVAN : 42,
  ETM3 : 36,
  ETM3Test : 37,
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
      url: 'https://bsc-dataseed.binance.org',
      address: '0x6427169aB7344F9C37E9dC9001c681BEcd09343d',
    },
    [ChainId.HECO]: {
      url: 'https://http-mainnet-node.hecochain.com',
      address: '0xBF4b1bE1F00F5624ba4D65f8548ccF6E75d0deFe',
    },
    [ChainId.MATIC]: {
      url: 'https://polygon-rpc.com',
      address: '0x6427169aB7344F9C37E9dC9001c681BEcd09343d',
    },
    [ChainId.OKEX]: {
      url: 'https://exchainrpc.okex.org',
      address: '0x86267f0116c923cbb2f3460c2b421562b6189f5d'
    },
    [ChainId.RINKEBY]: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      address: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    },
    [ChainId.GOERLI]: {
      url: 'https://goerli.infura.io/v3/24eed2d69d2b4dcba4339f5a81908cb8',
      address: '0x740a1313c9e6dbb043ff3a12c42dfacb3d6ec188'
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

