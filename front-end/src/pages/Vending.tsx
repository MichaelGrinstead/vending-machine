import {useEffect, useState, useContext} from 'react'
import Interface from '../components/Interface'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import VendingContext from '../context/VendingContext'

const Vending = () => {

  const {getTokenIds, setImagesLoading} = useContext(VendingContext)

  const [showItems, setShowItems] = useState<boolean>()

  const showPurchased = () => {
    setShowItems(!showItems)
    getTokenIds()
    setImagesLoading(true)
    setTimeout(() => setImagesLoading(false), 2000)

  }

  return (
    <div
        style={{height: "100%", width: "100%"}}
        >
          <div className='Vending'>
            <h3 
            className='Show-Items'
            onClick={() => showPurchased()}
            >Show Items</h3>
            <div className='Vending-Inner'>
              <Items/>
            </div>
          </div>
          {showItems
          ?
          <PurchasedItems/>
          :
          <></>
          }
          <Interface/>

        </div>
  )
}

export default Vending