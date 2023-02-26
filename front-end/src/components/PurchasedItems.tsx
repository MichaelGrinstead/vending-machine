import { useContext, useEffect } from "react"
import VendingContext from "../context/VendingContext"

const PurchasedItems = () => {

    const {images, imagesLoading, loadPurchased, setImagesLoading, retrieveImages, lightMode} = useContext(VendingContext)

    console.log(imagesLoading)
    console.log(images)

    
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
            
            <div>{images[0]}</div>
            <div>{images[1]}</div>
            <div>{images[2]}</div>
            <div>{images[3]}</div>
            <div>{images[4]}</div>
            <div>{images[5]}</div>
            <div>{images[6]}</div>
            <div>{images[7]}</div>
            <div>{images[8]}</div>
            <div>{images[9]}</div>
            <div>{images[10]}</div>
            <div>{images[11]}</div>
            <div>{images[12]}</div>
          </div>
          }
        </div>
        }
        
    </div>  
  )
}

export default PurchasedItems