import {ethers} from 'ethers'
import {Contract} from 'ethers'
import VendingTokenABI from './ABIs/VendingTokenABI'
import VendingABI from './ABIs/VendingABI'


declare var window: any

///LocalHost

const VendingTokenAddress = "0xE7BAc446Ca699463a99A9F860331Cf28AC8b6183"
const VendingAddress = "0xe7b905Cf4D172ba8E364916D07e74e1fF9a99034"



let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let VendingTokenContract : Contract
let VendingContract : Contract 




if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    VendingTokenContract = new ethers.Contract(VendingTokenAddress, VendingTokenABI, signer);
    VendingContract = new ethers.Contract(VendingAddress, VendingABI, signer); 
  
}   

export {provider, signer, VendingContract, VendingTokenContract, VendingAddress, VendingTokenAddress}
