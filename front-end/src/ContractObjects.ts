import {ethers} from 'ethers'
import {Contract} from 'ethers'
import VendingTokenABI from './ABIs/VendingTokenABI'
import VendingABI from './ABIs/VendingABI'


declare var window: any

///LocalHost

// const VendingTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// const VendingAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

//Mumbai

const VendingTokenAddress = "0x961c835b6D4713F390a01B0358059C84c9b5773F"
const VendingAddress = "0xd07C90b4dFd6CCD7AfaDAB0E1500AAF0A89EEeFb"




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
