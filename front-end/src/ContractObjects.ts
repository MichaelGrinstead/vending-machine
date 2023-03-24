import {ethers} from 'ethers'
import {Contract} from 'ethers'
import VendingTokenABI from './ABIs/VendingTokenABI'
import VendingFactoryABI from './ABIs/VendingFactoryABI'


declare var window: any

///LocalHost

// const VendingTokenAddress = "0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3"
// const VendingFactoryAddress = "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650"

// Mumbai

const VendingTokenAddress = "0xe4B12a26d62dDc6d00EF784ab0263011B518419e"
const VendingFactoryAddress = "0x7F965088170FdB9003B436437B40b762e025A9E6"




let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let VendingTokenContract : Contract
let VendingFactoryContract : Contract 




if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    VendingTokenContract = new ethers.Contract(VendingTokenAddress, VendingTokenABI, signer);
    VendingFactoryContract = new ethers.Contract(VendingFactoryAddress, VendingFactoryABI, signer); 
  
}   

export {provider, signer, VendingFactoryContract, VendingTokenContract, VendingTokenAddress}