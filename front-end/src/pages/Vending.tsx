import {useContext, useEffect, useState} from 'react'
import Interface from '../components/Interface'
import InterfaceSmall from '../components/InterfaceSmall'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import VendingContext from '../context/VendingContext'

declare var window : any

const Vending = () => {

  const {
    lightMode, 
    setLightMode, 
    showItems, 
    setShowItems, 
    loadPurchased, 
    remainingDeposit,
    vendingAddress,
    createVendingContractInstance,
    getVendingContractAddress
  } = useContext(VendingContext)

  const [displayInfo, setDisplayInfo] = useState<boolean>(false)

  const [name, setName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")

  const getName = async () => {
    const contract = createVendingContractInstance(vendingAddress)
    const name = await contract.name()
    setName(name)
  }

  const getSymbol = async () => {
    const contract = createVendingContractInstance(vendingAddress)
    const symbol = await contract.symbol()
    setSymbol(symbol)
  }  

  useEffect(() => {
    if(window.ethereum){
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
    getVendingContractAddress()
  },[])

  useEffect(() => {
    getName()
    getSymbol()
  },[vendingAddress])

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
              <InterfaceSmall/>
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
                onClick={() => loadPurchased()}
                >Show Purchased
                </button>

              }
              <br></br>
              <br></br>
              {showItems
              ?
              <button 
              className={lightMode ? 'L-Show-Items' : 'Show-Items'}
              onClick={() => loadPurchased()}
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
          
          <button className={lightMode ? 'L-Display-Info' : 'Display-Info'} onClick={() => setDisplayInfo(!displayInfo)} >Info</button>
          
         {displayInfo
         ?
          <div
            className={lightMode ? 'L-Contract-Information' : 'Contract-Information'}>

              <h3>Contract Address: {vendingAddress}</h3>
              <h3>Token Name: {name}</h3>
              <h3>Token Symbol: {symbol}</h3>

            </div>
            :
            <></>
          }
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