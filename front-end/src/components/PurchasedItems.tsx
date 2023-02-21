import { useContext, useEffect } from "react"
import VendingContext from "../context/VendingContext"

const PurchasedItems = () => {

    const {images, imagesLoading, lightMode} = useContext(VendingContext)
    
  return (
    <div className={lightMode ? "L-Purchased-Items" : 'Purchased-Items'}>
        {imagesLoading
        ?
        <div className={lightMode ? "L-Loader" : 'Loader'} style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%"}}></div>
        :
        <div className={lightMode ? "L-Purchased-Items-Outer" : "Purchased-Items-Outer"}>
          {images.length === 0
          ?
          <h2 className={lightMode ? "L-No-Purchased-Items" : "No-Purchased-Items"}>You currently have no purchased items</h2>
          :
          <div className={lightMode ? "L-Purchased-Items-Inner" : 'Purchased-Items-Inner'}>
            images
          </div>
          }
        </div>
        }
        
    </div>  
  )
}

export default PurchasedItems