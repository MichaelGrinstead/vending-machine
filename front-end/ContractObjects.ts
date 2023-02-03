import {ethers} from 'ethers'
import {Contract} from 'ethers'
import GLTokenABI from './ABIs/GLTokenABI'
import VendingABI from './ABIs/VendingABI'


declare var window: any

///LocalHost

const GLTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const VendingAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"



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
