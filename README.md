# multicall-client.js

## config
```javascript
import {config, ChainId} from "@chainstarter/multicall-client.js";
ChainId.rinkeby = 4
const multicallConfig = config(
  {
    defaultChainId: 1,
    delay: 100,//debounce
    timeout: 20000,//ms
    maxCalls: 500,//Single request contains call
    allowFailure: true,//The result structure is different
    rpc: {
      [ChainId.ETH]: {
        url: '',// rpc url (https|wss)
        address: '',//multicall2 address
      },
      [ChainId.rinkeby]: {
        url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696'
      }
    }
  }
)
```
## send calls
```javascript
import {Contract, multicallClient} from "@chainstarter/multicall-client.js";

const contractBSC = new Contract(abi, address, ChainId.BSC);
// typescript:
// const contractBSC: any = new Contract(abi, address, ChainId.BSC);
// const contractBSC = newContract(abi, address, ChainId.BSC);
const contractHECO = new Contract(abi, address, ChainId.HECO);
const contractETH = new Contract(abi, address, ChainId.ETH);

const calls = [
        contractBSC.balanceOf(account),
        contractHECO.balanceOf(account),
        contractETH.balanceOf(account)
      ]
multicallClient(calls).then(result => {
	// allowFailure = true
	// result type = [[success, call1result], [success, call2result], [success, call3result]]
	// allowFailure = false
	// result type = [call1result, call2result, call3result]
})
```
## multicall contract callData
```javascript
import {multicallClient} from "@chainstarter/multicall-client.js";

multicallClient.getBlockInfo(ChainId.ETH).then(blockInfo =>{
  // blockInfo: {number, coinbase, difficulty, gasLimit, Timestamp, hash}
})

multicallClient.getEthBalance(account, ChainId.ETH).then(ethBalance =>{
  
})

multicallClient.getBlockHash(135484, ChainId.ETH).then(blockHash =>{
  
})
```
