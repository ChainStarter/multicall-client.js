import {multicallConfig} from "./const";

let callsId = 0
let callsGroup = {
  '0': []
}

export function multicallClient(calls) {
  /**
   * {
      "method": "balanceOf",
      "params": ["0x23FCB0E1DDbC821Bd26D5429BA13B7D5c96C0DE0"],
      "address": "0x3ff975cb501D5F9b9991e4C443D0C2096Ad89bd7",
      "chainId": 56
    }
   */
  for (let i = 0; i < calls.length; i++) {
    if (callsGroup[calls[i].chainId]) {
      callsGroup[calls[i].chainId].push(calls[i].chainId)
    } else {
      callsGroup[calls[i].chainId] = [calls[i].chainId]
    }
  }
  return new Promise((resolve, reject) => {

  })
}
