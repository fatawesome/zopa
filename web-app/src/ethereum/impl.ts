import { BaseEthereum, configureEthereum } from './lib'
import abi from './abi.json'
const address = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
export interface Img {
  is_claimed: boolean
  title: string
  url: string
  owner: string
}
class Ethereum extends BaseEthereum {
  constructor (
    account: string
  ) {
    super(account, address, abi)
  }
  async getImg (id: number): Promise<Img> {
    return await this.contract.methods.Imgs(id).call({ from: this.account })
  }
  async buyImg (title: string, url: string): Promise<Img> {
    return await this.contract.methods.buyImg(title, url).send({ from: this.account, value: 10**18 })
  }
  async getAllImgs (): Promise<Img[]> {
    return (await this.contract.methods.getAllImgs().call({ from: this.account })).filter((x: Img) => x.is_claimed)
    // const promises = []
    // for (let i = 1; i < 1001; i++) {
    //   promises.push(this.getImg(i))
    // }
    // return (await Promise.all(promises)).filter(x => x.is_claimed)
  }
}
const { useEthereumInit, useEthereum } = configureEthereum(Ethereum)
export { useEthereumInit, useEthereum }
