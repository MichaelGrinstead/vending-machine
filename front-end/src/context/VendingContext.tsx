import React, {createContext, useState, ReactNode} from 'react'
import { VendingContract, signer } from '../ContractObjects'

export const enum connectionState {
  UNCONNECTED,
  NO_WALLET,
  CONNECTED
}

interface VendingContextInterface {
    currentItemSelected : string
    setCurrentItemSelected : React.Dispatch<React.SetStateAction<string>>
    connectionStatus : connectionState
    setConnectionStatus: React.Dispatch<React.SetStateAction<connectionState>>
    images : any[]
    tokenIds : any[]
    getTokenIds : () => Promise<void>
    URIs : any[]
    getURIs : () => Promise<void>
    getImages : () => void
    imagesLoading : boolean
    setImagesLoading : React.Dispatch<React.SetStateAction<boolean>>
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

  const [currentItemSelected, setCurrentItemSelected] = useState<string>("")

  const [connectionStatus, setConnectionStatus] = useState<connectionState>(connectionState.UNCONNECTED)

  const [imagesLoading, setImagesLoading] = useState<boolean>(false)

  const [tokenIds, setTokenIds] = useState<any[]>([])
  
  const getTokenIds = async () => {
    let ids
    const user = await signer.getAddress()
    try{
      ids = await VendingContract.fetchIds(user)
    }catch(e){
      console.log(e)
    }finally{
      setTokenIds(ids)
      getURIs()
    }
  }

  const [URIs, setURIs] = useState<any[]>([])

  const getURIs = async () => {
    let URIArray : any[]= []
    try{
      tokenIds.map( async (id) => {
        const uri = await VendingContract.tokenIdToURI(id)
        URIArray.push(uri)
      })
    }catch(e){
      console.log(e)
    }finally{
      console.log(URIArray)
      setURIs(URIArray) 
      getImages()
    }
  }

  console.log(URIs)

  const [images, setImages] = useState<any>([])

  const getImages = () => {
    const _images = []
    try{
      for(let i = 0; i < URIs.length; i++){
        _images.push(<img className='Image' src={URIs[i]}></img>)
      }
    }catch(e){
      console.log(e)
    }finally{
      setImages(_images)
    } 
  }

  return(
    <VendingContext.Provider
    value={{
        currentItemSelected, 
        setCurrentItemSelected,
        connectionStatus,
        setConnectionStatus,
        images,
        tokenIds,
        getTokenIds,
        URIs,
        getURIs,
        getImages, 
        imagesLoading,
        setImagesLoading
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext