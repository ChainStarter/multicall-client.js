# multicall-client.js

## config
```javascript
import {config} from "multicall-client";
config(
  {
    defaultChainId: 1,
    delay: 100,//debounce
    timeout: 20000,//ms
    maxCalls: 500,//Single request contains call
    allowFailure: true,//The result structure is different
    rpc: {
      [ChainId.ETH]: {
        url: '',// rpc url
        address: '',//multicall2 address
      }
    }
  }
)
```
## send calls
```javascript
import {Contract, multicallClient} from "multicall-client";

const contractBSC = new Contract(abi, address, ChainId.BSC);
const contractHECO = new Contract(abi, address, ChainId.HECO);
const contractETH = new Contract(abi, address, ChainId.ETH);

const calls = [
        contractBSC.balanceOf(account),
        contractHECO.balanceOf(account),
        contractETH.balanceOf(account)
      ]
multicallClient(calls).then(result => {
	// allowFailure=true
	// result type = [[success, call1result], [success, call2result], [success, call3result]]
	// allowFailure = false
	// result type = [call1result, call2result, call3result]
})
```
## multicall contract callData
```javascript
import {multicallClient} from "multicall-client";

multicallClient.getBlockInfo(ChainId.ETH).then(blockInfo =>{
  // blockInfo: {number, difficulty, gasLimit, Timestamp, hash}
})

multicallClient.getEthBalance(account, ChainId.ETH).then(ethBalance =>{
  
})

multicallClient.getBlockHash(135484, ChainId.ETH).then(blockHash =>{
  
})
```
