import { useContext, useEffect } from "react"
import VendingContext from "../context/VendingContext"

const PurchasedItems = () => {

    const {images, imagesLoading} = useContext(VendingContext)

    console.log(images)
    
  return (
    <div className="Purchased-Items">
        {imagesLoading
        ?
        <div className="Loader" style={{marginLeft: "auto", marginRight: "auto", marginTop: "5%"}}></div>
        :
        <div className="Purchased-Items-Inner">
            {images.length === 0
            ?
            <h3>you currently have no purchased items</h3>
            :
            images
            }
        </div>
        }
    </div>  
  )
}

export default PurchasedItems