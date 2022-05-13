
export function multicallClient(call: Array<Function>): Promise<any[]>;

interface Rpc {
  url: string,
  address: string
}

export declare enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC = 56,
  ETM3 = 36,
  ETM3Test = 37,
  ETH = 1,
  HECO = 128,
  MATIC = 137,
  OKEX = 66
}
interface rpcMap {
  [key: string]: Rpc
}


export interface Config {
  defaultChainId?: number,
  delay?: number,
  timeout?: number,
  maxCalls?: number,
  allowFailure?: boolean,
  rpc?: rpcMap
}

export function config(configData: Config): Config;

export class Contract{
  constructor(abi: Array<Object>, address: string, chainId?: number)
}
export function newContract(abi: Array<Object>, address: string, chainId?: number): any;

export function multicallClientSend(call: Array<Function>, provider: any) : any;
