import {useContext} from 'react'
import Interface from '../components/Interface'
import InterfaceSmall from '../components/InterfaceSmall'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import VendingContext from '../context/VendingContext'

const Vending = () => {

  const {lightMode, setLightMode, showItems, setShowItems} = useContext(VendingContext)

  return (
    <div className={lightMode ? 'L-Vending' : 'Vending'}>
          <div className={lightMode ? 'L-Vending-Outer' : 'Vending-Outer'}>
            {showItems
              ?
              <PurchasedItems/>
              :  
              <div className={lightMode ? 'L-Vending-Inner' : 'Vending-Inner'}>
                <Items/>
              </div>
              }
            <div className='InterfaceSmall-Container'>
              <InterfaceSmall/>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {showItems
              ?
                <button 
                className={lightMode ? 'L-Show-Items' : 'Show-Items'}
                onClick={() => setShowItems(false)}
                >Show Items
                </button>
              :
                <button 
                className={lightMode ? 'L-Show-Items' : 'Show-Items'}
                onClick={() => setShowItems(true)}
                >Show Purchased
                </button>

              }
              
            </div>
          </div>
          {/* <PurchasedItems/> */}
          <Interface/>
          {lightMode
          ?
          <button className='L-Switch-Theme' onClick={() => {setLightMode(false)}} >Dark</button>
          :
          <button className='Switch-Theme' onClick={() => {setLightMode(true)}}>Light</button>
          }


        </div>
  )
}

export default Vending