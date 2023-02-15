import {ethers} from 'ethers'
import {Contract} from 'ethers'
import GLTokenABI from './ABIs/GLTokenABI'
import VendingABI from './ABIs/VendingABI'


declare var window: any

///LocalHost

const VendingTokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
const VendingAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"



let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let VendingTokenContract : Contract
let VendingContract : Contract 




if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    VendingTokenContract = new ethers.Contract(VendingTokenAddress, GLTokenABI, signer);
    VendingContract = new ethers.Contract(VendingAddress, VendingABI, signer); 
  
}   

export {provider, signer, VendingContract, VendingTokenContract, VendingAddress, VendingTokenAddress}
