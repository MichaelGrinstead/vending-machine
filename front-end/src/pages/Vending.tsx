import {useContext} from 'react'
import Interface from '../components/Interface'
import InterfaceSmall from '../components/InterfaceSmall'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import VendingContext from '../context/VendingContext'

const Vending = () => {

  const {lightMode, setLightMode} = useContext(VendingContext)

  return (
    <div className={lightMode ? 'L-Vending' : 'Vending'}>
          <div className={lightMode ? 'L-Vending-Outer' : 'Vending-Outer'}>
            <div className={lightMode ? 'L-Vending-Inner' : 'Vending-Inner'}>
              <Items/>
            </div>
            <InterfaceSmall/>
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