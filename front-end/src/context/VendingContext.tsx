import React, {createContext, useState, ReactNode} from 'react'
import {signer, VendingFactoryContract } from '../ContractObjects'
import VendingABI from '../ABIs/VendingABI'
import {ethers, Contract} from 'ethers'

export const enum connectionState {
  UNCONNECTED,
  NO_WALLET,
  INCORRECT_NETWORK,
  CONNECTED
}

interface VendingContextInterface {
    createVendingContractInstance : (address: string) => ethers.Contract
    getNewVendingContractAddress : () => Promise<void>
    vendingAddress : string
    setVendingAddress : React.Dispatch<React.SetStateAction<string>>
    currentItemSelected : string
    setCurrentItemSelected : React.Dispatch<React.SetStateAction<string>>
    connectionStatus : connectionState
    setConnectionStatus: React.Dispatch<React.SetStateAction<connectionState>>
    images : any[]
    URIs : any[]
    getImages : () => void
    imagesLoading : boolean
    setImagesLoading : React.Dispatch<React.SetStateAction<boolean>>
    loadPurchased : () => void
    lightMode : boolean
    setLightMode : React.Dispatch<React.SetStateAction<boolean>>
    showItems : boolean
    setShowItems : React.Dispatch<React.SetStateAction<boolean>>
    remainingDeposit : string
    setRemainingDeposit : React.Dispatch<React.SetStateAction<string>>
    retrieveImages : () => Promise<void>
    tokenIds : any[] 
    isUserOwner : boolean
    getIsUserOwner : () => Promise<void>
    CIDS : any[]
    setCIDS : React.Dispatch<React.SetStateAction<any[]>>
    displayOwnerInfo : boolean
    setDisplayOwnerInfo :  React.Dispatch<React.SetStateAction<boolean>>
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

  

  const [lightMode, setLightMode] = useState<boolean>(false)

  const [currentItemSelected, setCurrentItemSelected] = useState<string>("")

  const [showItems, setShowItems] = useState<boolean>(false)
  
  const [connectionStatus, setConnectionStatus] = useState<connectionState>(connectionState.UNCONNECTED)

  const [isUserOwner, setIsUserOwner] = useState<boolean>(false)

  const [tokenIds, setTokenIds] = useState<any[]>([])

  const [CIDS, setCIDS] = useState<any[]>([])

  const [remainingDeposit, setRemainingDeposit] = useState<string>("")

  const [displayOwnerInfo, setDisplayOwnerInfo] = useState<boolean>(false)

  const createVendingContractInstance = (address : string) => {
    const Contract = new ethers.Contract(address, VendingABI, signer)
    return Contract
  }

///Setting the contract address 

  const [vendingAddress, setVendingAddress] = useState<string>("")

  const getNewVendingContractAddress = async () => {
    const owner = await signer.getAddress()
    const address = await VendingFactoryContract.ownerToVendingContract(owner)
    setVendingAddress(address)

  }

///Sets isUserOwner to true if connected account is the contract owner

const getIsUserOwner = async () => {
  const contract : Contract = createVendingContractInstance(vendingAddress)
  const owner = await contract.owner()
  const user = await signer.getAddress()
  if(owner === user){
    setIsUserOwner(true)
  }else{
    setIsUserOwner(false)
  }
}


///Logic to display purchased items   

  const [imagesLoading, setImagesLoading] = useState<boolean>(false)
  
  const [URIs, setURIs] = useState<any[]>([])

  const [images, setImages] = useState<any>([])

  const getImages = () => {
  const _images = []
    for(let i = 0; i < URIs.length; i++){
      _images.push(<img className={lightMode ? 'L-Image' : 'Image'} style={{border: "none"}} src={URIs[i]}></img>)
    } 
    setImages(_images)
  }

  // const retrieveImages = async () => {
  //   const contract = createVendingContractInstance(vendingAddress)
  //   const user = await signer.getAddress()
  //   const ids = await contract.fetchIds(user)
  //   setTokenIds(ids)
  
  //   // Fetch all URIs in parallel
  //   const URIArray = await Promise.all(
  //     ids.map(async (id: any) => {
  //       return await contract.tokenIdToURI(id)
  //     })
  //   )
  //   setURIs(URIArray)
  // }

  const retrieveImages = async () => {
    const contract = createVendingContractInstance(vendingAddress);
    const user = await signer.getAddress();
    const ids = await contract.fetchIds(user);
    setTokenIds(ids);

    // Fetch all URIs in parallel
    const URIArray = await Promise.allSettled(
      ids.map(async (id: any) => {
        return await contract.tokenIdToURI(id);
      })
    );

    const fulfilledURIs: any[] = []

    URIArray.forEach((result) => {
      if(result.status === "fulfilled"){
        fulfilledURIs.push(result.value)
      }else{
        console.log(result.reason)
      }
    })
    console.log(fulfilledURIs)

    setURIs(fulfilledURIs)
    
  };

  console.log(URIs)

  

  console.log(tokenIds)
  console.log(URIs)

  const loadPurchased = () => {
    setImagesLoading(true)
    showPurchased()
  }

  const showPurchased = () => {
    setShowItems(true)
    getImages()
    setTimeout(() => setImagesLoading(false), 2000)
  }

  

  return(
    <VendingContext.Provider
    value={{
        createVendingContractInstance,
        getNewVendingContractAddress,
        currentItemSelected, 
        setCurrentItemSelected,
        connectionStatus,
        setConnectionStatus,
        images,
        URIs,
        getImages, 
        imagesLoading,
        setImagesLoading,
        loadPurchased,
        lightMode,
        setLightMode,
        showItems,
        setShowItems,
        remainingDeposit,
        setRemainingDeposit,
        retrieveImages,
        tokenIds,
        vendingAddress,
        setVendingAddress,
        isUserOwner,
        getIsUserOwner,
        CIDS,
        setCIDS,
        displayOwnerInfo,
        setDisplayOwnerInfo
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext