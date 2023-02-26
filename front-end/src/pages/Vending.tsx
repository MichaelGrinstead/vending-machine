import {useContext} from 'react'
import Interface from '../components/Interface'
import InterfaceSmall from '../components/InterfaceSmall'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import VendingContext from '../context/VendingContext'

const Vending = () => {

  const {
    lightMode, 
    setLightMode, 
    showItems, 
    setShowItems, 
    showPurchased, 
    remainingDeposit
  } = useContext(VendingContext)

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
            <div className='Vending-Side-Container'>

              <div className={lightMode ? 'L-Change-Display': 'Change-Display'}><h4>${remainingDeposit}</h4></div>
              <br></br>
              <br></br>
              <br></br>
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
                onClick={() => showPurchased()}
                >Show Purchased
                </button>

              }
              <br></br>
              <br></br>
              {showItems
              ?
              <button 
              className={lightMode ? 'L-Show-Items' : 'Show-Items'}
              onClick={() => showPurchased()}
              >Refresh
              </button>
              :
              <button 
              className={lightMode ? 'L-Show-Items' : 'Show-Items'}
              style={{color: "transparent",  backgroundColor: "transparent", borderColor: "transparent"}}
              >
              </button>
              }
              
            </div>
          </div>
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