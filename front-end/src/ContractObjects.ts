import {ethers} from 'ethers'
import {Contract} from 'ethers'
import VendingTokenABI from './ABIs/VendingTokenABI'
import VendingFactoryABI from './ABIs/VendingFactoryABI'


declare var window: any

///LocalHost

const VendingTokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const VendingFactoryAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

//Mumbai

// const VendingTokenAddress = "0x961c835b6D4713F390a01B0358059C84c9b5773F"
// const VendingFactoryAddress = "0xd07C90b4dFd6CCD7AfaDAB0E1500AAF0A89EEeFb"




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
