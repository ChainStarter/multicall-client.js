# multicall-client.js

## config [v1.0.0]
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
## query calls [v1.0.0]
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
## getBlockInfo [v1.0.0]
```javascript
import {multicallClient} from "@chainstarter/multicall-client.js";

multicallClient.getBlockInfo(ChainId.ETH).then(blockInfo =>{
  // blockInfo: {number, coinbase, difficulty, gasLimit, Timestamp, hash}
})
```

## getEthBalance [v1.0.0]
```javascript
import {multicallClient} from "@chainstarter/multicall-client.js";

multicallClient.getEthBalance(account, ChainId.ETH).then(ethBalance =>{
  
})
```

## getBlockHash [v1.0.0]
```javascript
import {multicallClient} from "@chainstarter/multicall-client.js";

multicallClient.getBlockHash(135484, ChainId.ETH).then(blockHash =>{
  
})
```

## send transaction [v1.3.1]
```javascript
import {Contract, multicallClientSend} from "@chainstarter/multicall-client.js";

/**
 import {useWeb3React} from "@web3-react/core";
 const {library} = useWeb3React()
 const provider = library.provider
 */
const provider = window.ethereum

const contractETH = new Contract(abi, address, ChainId.ETH);
multicallClientSend([
  contract.getRewardA(account),
  contract.getRewardB(account),
  contract.getRewardA(account2),
  contract.getRewardB(account3)
], provider).send({
  from: '',
  //...
}).on('transactionHash', (hash) => {
 
}).on('receipt', (rec) => {
    
}).on('error', (err) => {
    
  })
```
## getTransactionReceipt [v1.3.2]
```javascript
import {multicallClient} from "@chainstarter/multicall-client.js";

    multicallClient.getTransactionReceipt(transactionHash, ChainId.BSC).then(res => {
      
    }).catch(()=>{
      
    })
```
## getWeb3 [v1.3.2]
```javascript
import {getWeb3} from "@chainstarter/multicall-client.js";
const web3 = getWeb3(ChainId.BSC)
var contract = new web3.eth.Contract(contractABI, adderss);
//get event
contract.getPastEvents('EventA', {filter: {}, fromBlock: 10000, toBlock: 'latest'}).then((res) => {
  console.log(res)
})
```
## support overloaded [v1.4.0]
Contract
```solidity
contract A {
    function f() public pure returns (uint8 out) {
        out = 1;
    }

    function f(uint256 n) public pure returns (uint256 out) {
        out = n;
    }
    function f(uint256 n, address addr) public pure returns (uint256 out) {
        if(addr == address(0)){
            out = 0;
        } else{
            out =  n;
        }

    }
}
```
ABI
```json
[
	{
		"inputs": [],
		"name": "f",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "out",
				"type": "uint8"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "n",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "f",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "out",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "n",
				"type": "uint256"
			}
		],
		"name": "f",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "out",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
```
```javascript
import {Contract, multicallClient} from "@chainstarter/multicall-client.js";

const contractETH = new Contract(abi, address, ChainId.ETH);

const calls = [
  contractETH.f(),// default overloaded last = f(uint256,address)
  contractETH["f()"](),
  contractETH["f(uint256)"](1),
  contractETH["f(uint256,address)"](1,0x0000000000000000000000000000000000000000),
      ]
multicallClient(calls).then(result => {
	//...
})
```
