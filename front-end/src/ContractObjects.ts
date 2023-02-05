import {ethers} from 'ethers'
import {Contract} from 'ethers'
import GLTokenABI from './ABIs/GLTokenABI'
import VendingABI from './ABIs/VendingABI'


declare var window: any

///LocalHost

const GLTokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
const VendingAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"



let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let GLTokenContract : Contract
let VendingContract : Contract 




if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    GLTokenContract = new ethers.Contract(GLTokenAddress, GLTokenABI, signer);
    VendingContract = new ethers.Contract(VendingAddress, VendingABI, signer); 
  
}   

export {provider, signer, VendingContract, GLTokenContract}
