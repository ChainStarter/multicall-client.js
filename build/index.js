!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lodash"),require("web3")):"function"==typeof define&&define.amd?define(["exports","lodash","web3"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).core={},e.lodash,e.Web3)}(this,(function(e,t,n){"use strict";function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=a(t),s=a(n);const r={ETH:1,BSC:56,HECO:128,MATIC:137,OKEX:66},u={defaultChainId:r.ETH,delay:100,timeout:2e4,maxCalls:500,allowFailure:!0,rpc:{[r.ETH]:{url:"https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",address:"0x5ba1e12693dc8f9c48aad8770482f4739beed696"},[r.BSC]:{url:"https://bsc-dataseed.binance.org",address:"0x6427169aB7344F9C37E9dC9001c681BEcd09343d"},[r.HECO]:{url:"https://http-mainnet-node.hecochain.com",address:"0xBF4b1bE1F00F5624ba4D65f8548ccF6E75d0deFe"},[r.MATIC]:{url:"https://polygon-rpc.com",address:"0x6427169aB7344F9C37E9dC9001c681BEcd09343d"},[r.OKEX]:{url:"https://exchainrpc.okex.org",address:"0x86267f0116c923cbb2f3460c2b421562b6189f5d"}}};const i=require("web3-eth-contract"),c={},o={};function p(e,t,n=u.defaultChainId){const a=e.reduce((e,t)=>("function"===t.type&&(e[t.name]=t),e),{}),l=`${t}_${n}`;if(o[l]){const t=[...o[l],...e],n=[],a={};for(let e=0;e<t.length;e++){const l=JSON.stringify(t[e]);a[l]||n.push(t[e]),a[l]=!0}o[l]=n}else o[l]=e;c[l]=new i(o[l],t);const s={abi:e,address:t,chainId:n};return new Proxy(s,{get:function(e,t){return(...e)=>function(e,t){if(!a[e])throw new Error(`'${e}' is not a function`);if(a[e].inputs.length!==t.length)throw new Error(`The method parameter is ${a[e].inputs.length} and only ${t.length} was found`);return{method:e,params:t,address:s.address,chainId:n,outputs:a[e].outputs}}(t,e)}})}var y=[{inputs:[{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"aggregate",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"},{internalType:"bytes[]",name:"returnData",type:"bytes[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"blockAndAggregate",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"},{internalType:"bytes32",name:"blockHash",type:"bytes32"},{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"}],name:"getBlockHash",outputs:[{internalType:"bytes32",name:"blockHash",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[],name:"getBlockNumber",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockCoinbase",outputs:[{internalType:"address",name:"coinbase",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockDifficulty",outputs:[{internalType:"uint256",name:"difficulty",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockGasLimit",outputs:[{internalType:"uint256",name:"gaslimit",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getCurrentBlockTimestamp",outputs:[{internalType:"uint256",name:"timestamp",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"addr",type:"address"}],name:"getEthBalance",outputs:[{internalType:"uint256",name:"balance",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getLastBlockHash",outputs:[{internalType:"bytes32",name:"blockHash",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bool",name:"requireSuccess",type:"bool"},{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"tryAggregate",outputs:[{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bool",name:"requireSuccess",type:"bool"},{components:[{internalType:"address",name:"target",type:"address"},{internalType:"bytes",name:"callData",type:"bytes"}],internalType:"struct Multicall2.Call[]",name:"calls",type:"tuple[]"}],name:"tryBlockAndAggregate",outputs:[{internalType:"uint256",name:"blockNumber",type:"uint256"},{internalType:"bytes32",name:"blockHash",type:"bytes32"},{components:[{internalType:"bool",name:"success",type:"bool"},{internalType:"bytes",name:"returnData",type:"bytes"}],internalType:"struct Multicall2.Result[]",name:"returnData",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"}];let d={},m=0,b={};const f={};function h(){for(let e in f){const t=[];for(let n=0;n<f[e].calls.length&&void 0!==f[e].calls[n].result;n++)t.push(f[e].calls[n].result);t.length===f[e].calls.length&&(f[e].resolve(t),delete f[e])}}function g(e){if(1===e.__length__)return e[0];const t=[];for(let n=0;n<e.__length__;n++)t.push(e[n]);return t}async function T(e){const t=e,n=e[0],a=u.rpc[n.chainId];if(!a)throw new Error(`multicall-client unsupported chainId(${n.chainId}). Please read the documentation to configure rpc`);var l=new s.default(a.url);const r=new l.eth.Contract(y,a.address),i=t.map(e=>{const t=c[`${e.address}_${e.chainId}`];return[e.address,t.methods[e.method](...e.params).encodeABI()]}),o=u.allowFailure?"tryBlockAndAggregate":"aggregate",p=await new Promise(async e=>{let t;const n=setTimeout(()=>{t||e({returnData:[]})},u.timeout),a=u.allowFailure?[!1,i]:[i];r.methods[o](...a).call().then(a=>{t=a,clearTimeout(n),e(t)}).catch(t=>{clearTimeout(n),e({returnData:[]})})});for(let e=0;e<t.length;e++){let n;if(u.allowFailure)if(p.returnData[e]&&p.returnData[e][0]){let a=null;try{a=g(l.eth.abi.decodeParameters(t[e].outputs,p.returnData[e].returnData)),n=[p.returnData[e].success,a],n.success=p.returnData[e].success,n.returnData=a}catch(e){n=[!1,null],n.success=!1,n.returnData=null}}else n=[!1,null],n.success=!1,n.returnData=null;else if(p.returnData[e])try{n=g(l.eth.abi.decodeParameters(t[e].outputs,p.returnData[e]))}catch(e){n=null}else n=null;t[e].result=n,h()}}function w(e){return new Promise((t,n)=>{f[m++]={resolve:t,calls:e},function(){for(let t=0;t<e.length;t++){const n=e[t].chainId||u.defaultChainId;d[n]||(d[n]=0);const a=`${d[n]}_${n}`;b[a]?(b[a].calls.push(e[t]),b[a].calls.length>=u.maxCalls&&(d[n]+=1)):b[a]={calls:[e[t]]}}for(let e in b)b[e].timeOut&&(clearTimeout(b[e].timeOut),b[e].timeOut=null),b[e].calls.length>=u.maxCalls?(T(b[e].calls),d[b[e].calls[0].chainId]+=1,delete b[e]):b[e].timeOut=setTimeout(()=>{T(b[e].calls),d[b[e].calls[0].chainId]+=1,delete b[e]},u.delay)}()})}function C(e){const t=e||u.defaultChainId,n=u.rpc[t];if(!n)throw new Error(`multicall-client unsupported chainId(${t}). Please read the documentation to configure rpc`);return new p(y,n.address,t)}w.getBlockInfo=async function(e){const t=C(e),n=[t.getBlockNumber(),t.getCurrentBlockCoinbase(),t.getCurrentBlockDifficulty(),t.getCurrentBlockGasLimit(),t.getCurrentBlockTimestamp(),t.getLastBlockHash()],a=await w(n),[l,s,r,u,i,c]=a;return{number:l,coinbase:s,difficulty:r,gasLimit:u,Timestamp:i,hash:c}},w.getEthBalance=async function(e,t){const n=[C(t).getEthBalance(e)],a=await w(n),[l]=a;return l},w.getBlockHash=async function(e,t){const n=[C(t).getBlockHash(e)],a=await w(n),[l]=a;return l};e.ChainId=r,e.Contract=p,e.config=function(e){return l.default.merge(u,e),u},e.multicallClient=w,e.multicallClientSend=async function(e,t){const n=e[0],a=u.rpc[n.chainId].address,l=((e,t,n)=>new(new s.default(e).eth.Contract)(t,n))(t,y,a),r=e.map(e=>{const t=c[`${e.address}_${e.chainId}`];return[e.address,t.methods[e.method](...e.params).encodeABI()]});return l.methods.aggregate(r)},e.newContract=function(e,t,n=u.defaultChainId){return new p(e,t,n)},Object.defineProperty(e,"__esModule",{value:!0})}));
