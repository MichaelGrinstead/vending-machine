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
             <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[0]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(0)}</div> 
            </div>
            
            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[1]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(1)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[2]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(2)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[3]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(3)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[4]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(4)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[5]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(5)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[6]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(6)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[7]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(7)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[8]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(8)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[9]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(9)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[10]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(10)}</div> 
            </div>

            <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
              <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
                <div>{images[11]}</div>
              </div>
              <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>Id:{retreiveIds(11)}</div> 
            </div>
          </div>
          }
        </div>
        }
        
    </div>  
  )
}

export default PurchasedItems