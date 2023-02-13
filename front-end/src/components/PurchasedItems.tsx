import { useContext, useEffect } from "react"
import VendingContext from "../context/VendingContext"

const PurchasedItems = () => {

    const {images, imagesLoading, setImagesLoading, showPurchased} = useContext(VendingContext)
    
  return (
    <div className="Purchased-Items">
        {imagesLoading
        ?
        <div className="Loader" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%"}}></div>
        :
        <div className="Purchased-Items-Inner">
            {images.length === 0
            ?
            <h3 className="Heading-Text">You currently have no purchased items</h3>
            :
            images
            }
        </div>
        }
        <button 
        className="Enter"
        style={{width: "100%"}}
        onClick={() => showPurchased()} 
        >Show
        </button>
    </div>  
  )
}

export default PurchasedItems