import {useState} from 'react'
import Interface from '../components/Interface'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'

const Vending = () => {

  const [showItems, setShowItems] = useState<boolean>()

  return (
    <div
        style={{height: "100%", width: "100%"}}
        >
          <div className='Vending'>
            <h3 
            className='Show-Items'
            onClick={() => setShowItems(!showItems)}
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