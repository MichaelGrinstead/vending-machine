import {useEffect, useState} from 'react'
import { VendingContract, signer } from '../ContractObjects'
import { BigNumber } from 'ethers'

const PurchasedItems = () => {

    const [tokenIds, setTokenIds] = useState<any[]>([])
    const [URIs, setURIs] = useState<any[]>([])
    const [images, setImages] = useState<any>([])


    const getTokenIds = async () => {
        console.log("accessed1")
        const ids = await VendingContract.fetchIds(await signer.getAddress())
        setTokenIds(ids)
    } 

    console.log(tokenIds)
    console.log(URIs)
    console.log(images)



    const getURIs = async () => {
        console.log("accessed2")
        let URIArray : any[]= []
        tokenIds.map( async (id) => {
            const uri = await VendingContract.tokenIdToURI(id)
            URIArray.push(uri)
        })
        setURIs(URIArray)
    }

    const displayNFTs = () => {
        console.log("accessed3")
        const _images = []
        for(let i = 0; i < URIs.length; i++){
            _images.push(<img style={{height: "50px", width: "100px"}} src={URIs[i]}></img>)
        }
        setImages(_images)
    }

    

    useEffect(() => {
        getTokenIds()
    },[])

    useEffect(() => {
        setTimeout(() => getURIs(), 1000)
    }, [])

    useEffect(() => {
        setTimeout(() => displayNFTs(), 2000) 
    }, [])

   


  return (
    <div 
    className='Purchased-Items'
    >
        {images}   
    </div>
  )
}

export default PurchasedItems