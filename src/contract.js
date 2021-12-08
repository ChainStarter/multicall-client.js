import {multicallConfig} from "./const";

export function Contract(abi, address, chainId = multicallConfig.defaultChainId){
  const abi_ = abi.reduce((_, item) => {
    if (item.type === 'function') {
      _[item.name] = item
    }
    return _
  }, {})
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
      chainId
    }
  }
  return new Proxy(contract, {
    get: function(target, key) {
      return (...arg) => methods(key, arg);
    },
  })
}
