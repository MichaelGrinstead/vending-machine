import { useContext, useEffect } from "react"
import VendingContext from "../context/VendingContext"

const PurchasedItems = () => {

    const {images, imagesLoading, showPurchased, lightMode} = useContext(VendingContext)
    
  return (
    <div className={lightMode ? "L-Purchased-Items" : 'Purchased-Items'}>
        {imagesLoading
        ?
        <div className={lightMode ? "L-Loader" : 'Loader'} style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%"}}></div>
        :
        <div className={lightMode ? "L-Purchased-Items-Inner" : 'Purchased-Items-Inner'}>
            {images.length === 0
            ?
            <h3>You currently have no purchased items</h3>
            :
            images
            }
        </div>
        }
        <button 
        className={lightMode ? "L-Enter" : 'Enter'}
        style={{width: "100%"}}
        onClick={() => showPurchased()} 
        >Show
        </button>
    </div>  
  )
}

export default PurchasedItems