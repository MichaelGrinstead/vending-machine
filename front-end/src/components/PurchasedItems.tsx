import { useContext, useEffect } from "react"
import VendingContext from "../context/VendingContext"

const PurchasedItems = () => {

    const {images, imagesLoading, lightMode, tokenIds, retrieveImages} = useContext(VendingContext)

    const retreiveIds = (index : number) => {
      if(tokenIds[index]){
        return Number(tokenIds[index])
      }else{
        return ""
      }
    }

    const purchased = () => {
      let items = []
      for(let i = 0; i < 12; i++){
         items.push(
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
              <div>{images[i]}</div>
            </div>
          <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(i)}</div> 
        </div>
         )
      }
      return items
    }

    useEffect(() => {
      retrieveImages()
    },[])

    
  return (
    <div className={lightMode ? "L-Purchased-Items" : 'Purchased-Items'}>
        {imagesLoading
        ?
        <div 
        className={lightMode ? "L-Loader" : 'Loader'} 
        style={
          {marginLeft: "auto", 
          marginRight: "auto", 
          marginTop: "35%", 
          height: "50px", 
          width: "50px"
        }}></div>
        :
        <div className={lightMode ? "L-Purchased-Items-Outer" : "Purchased-Items-Outer"}>
          {images.length === 0
          ?
          <h2 className={lightMode ? "L-No-Purchased-Items" : "No-Purchased-Items"}>You currently have no purchased items</h2>
          :
          <div className={lightMode ? "L-Purchased-Items-Inner" : 'Purchased-Items-Inner'}>
            {purchased()}
          </div>
          }
        </div>
        }
        
    </div>  
  )
}

export default PurchasedItems