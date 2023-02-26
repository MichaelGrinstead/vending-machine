import React, {createContext, useState, ReactNode} from 'react'
import { VendingContract, signer } from '../ContractObjects'

export const enum connectionState {
  UNCONNECTED,
  NO_WALLET,
  INCORRECT_NETWORK,
  CONNECTED
}

interface VendingContextInterface {
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
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

  const [lightMode, setLightMode] = useState<boolean>(false)

  const [currentItemSelected, setCurrentItemSelected] = useState<string>("")

  const [showItems, setShowItems] = useState<boolean>(false)
  
  const [connectionStatus, setConnectionStatus] = useState<connectionState>(connectionState.UNCONNECTED)

  const [imagesLoading, setImagesLoading] = useState<boolean>(false)
  
  const [URIs, setURIs] = useState<any[]>([])

  const [images, setImages] = useState<any>([])

  const [remainingDeposit, setRemainingDeposit] = useState<string>("")

  const getImages = () => {
  const _images = []
    for(let i = 0; i < URIs.length; i++){
      _images.push(<img className={lightMode ? 'L-Image' : 'Image'} src={URIs[i]}></img>)
    } 
    setImages(_images)
  }

  const retrieveImages = async () => {
    const user = await signer.getAddress()
    const ids = await VendingContract.fetchIds(user)
    const URIArray : any[] = []
    ids.map( async (id : any) => {
      const uri = await VendingContract.tokenIdToURI(id)
      URIArray.push(uri)
    })
    setURIs(URIArray)
    
  }

  const loadPurchased = () => {
    setImagesLoading(true)
    setTimeout(() => showPurchased(), 5000)
  }

  const showPurchased = () => {
    setShowItems(true)
    getImages()
    setTimeout(() => setImagesLoading(false), 5000)
  }

  

  return(
    <VendingContext.Provider
    value={{
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
        retrieveImages
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext