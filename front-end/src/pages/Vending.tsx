import {useEffect, useState, useContext} from 'react'
import Interface from '../components/Interface'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import VendingContext from '../context/VendingContext'

const Vending = () => {

  return (
    <div
        style={{height: "100%", width: "100%"}}
        >
          <div className='Vending'>
            <div className='Vending-Inner'>
              <Items/>
            </div>
          </div>
          <PurchasedItems/>
          <Interface/>

        </div>
  )
}

export default Vending