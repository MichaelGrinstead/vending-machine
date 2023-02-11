import {ethers} from 'ethers'
import {Contract} from 'ethers'
import GLTokenABI from './ABIs/GLTokenABI'
import VendingABI from './ABIs/VendingABI'


declare var window: any

///LocalHost

const GLTokenAddress = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed"
const VendingAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d"



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

export {provider, signer, VendingContract, GLTokenContract, VendingAddress, GLTokenAddress}
