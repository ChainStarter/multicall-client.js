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
  timeout: 200000,
  rpc: {
    [ChainId.ETH]: {
      rpc: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      address: '',
    },
    [ChainId.BSC]: {
      rpc: 'https://bsc-dataseed.binance.org/',
      address: '',
    },
    [ChainId.HECO]: {
      rpc: 'https://http-mainnet-node.huobichain.com',
      address: '',
    },
    [ChainId.MATIC]: {
      rpc: 'https://polygon-rpc.com/',
      address: '',
    }
  }
}

export function config(configData){
  lodash.merge(
    multicallConfig,
    configData
  )
}

