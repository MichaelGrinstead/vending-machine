import {useContext, useEffect, useState} from 'react'
import Interface from '../components/Interface'
import InterfaceSmall from '../components/InterfaceSmall'
import Items from '../components/Items'
import PurchasedItems from '../components/PurchasedItems'
import Withdraw from '../components/Withdraw'
import VendingContext from '../context/VendingContext'
import { useNavigate } from 'react-router'

declare var window : any

const Vending = () => {

  const navigate = useNavigate()

/*****************************************************************************************************
****************************************useContext**************************************************** 
******************************************************************************************************/    

  const {
    lightMode, 
    setLightMode, 
    showItems, 
    setShowItems, 
    loadPurchased, 
    remainingDeposit,
    vendingAddress,
    createVendingContractInstance,
    isUserOwner,
    getIsUserOwner,
    setCIDS,
    displayOwnerInfo,
    setDisplayOwnerInfo
  } = useContext(VendingContext)

/*****************************************************************************************************
*****************************************useState*****************************************************
******************************************************************************************************/      

  const [name, setName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [formattedAddress, setFormatAddress] = useState<string>("")

/*****************************************************************************************************
*****************************************Smart Contract Calls*****************************************
******************************************************************************************************/      

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
  
/*****************************************************************************************************
*****************************************Helper*******************************************************
******************************************************************************************************/      

  const formatAddress = async (address : string) => {
    const start = address.slice(0,5)
    const end = address.slice(37)
    const formatted = start + "...." + end
    setFormatAddress(formatted)
  }

  const returnURI = (x : number) => {
    return `https://personal-project-storage.infura-ipfs.io/ipfs/CIDS[${x}]`
  }

/*****************************************************************************************************
*****************************************useEffect****************************************************
******************************************************************************************************/      

  useEffect(() => {
    if(window.ethereum){
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
    
  },[])

  useEffect(() => {
    getName()
    getSymbol()
    formatAddress(vendingAddress)
    getIsUserOwner()
    setCIDS([])
    setShowItems(false)
  },[vendingAddress])

/*****************************************************************************************************
*****************************************HTML*********************************************************
******************************************************************************************************/      

  return (
    <div className={lightMode ? 'L-Vending' : 'Vending'}>
        <button onClick={() => navigate('/')} className={lightMode ? 'L-Home-Button' : 'Home-Button'}>Home</button>
        {isUserOwner
        ?

          <button onClick={() => setDisplayOwnerInfo(!displayOwnerInfo)} className={lightMode ? 'L-Owner-Button' : 'Owner-Button'}>Owner</button>
        :
        <></>
        }
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
          
          <div className={lightMode ? 'L-Contract-Information' : 'Contract-Information'}>
            <h3>Collection Name: {name}</h3>
            <h3>Collection Symbol: {symbol}</h3>
            <h3>Address: {formattedAddress}</h3>
            <h3>Viewing As:{isUserOwner ? " Owner" : " Buyer"} </h3>
          </div>
          {

          }
          {displayOwnerInfo && isUserOwner
          ?
          <Withdraw/>
          :
          <Interface/>

          }
          

        
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