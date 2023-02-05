import { format } from 'path'
import {useEffect, useState} from 'react'
import {VendingContract, signer} from '../ContractObjects'

const Interface = () => {

  const enum status {
    NO_SELECTION,
    ITEM_SELECTED,
    PAYMENT_IN_PROGRESS,
    PAYMENT_ENTERED,
    PAYMENT_COMPLETE
  }


  const [order, setOrder] = useState<string>("")
  const [itemSelected, setItemSelected] = useState<string>("")
  const [cost, setCost] = useState<string>("")
  const [paymentDisplay, setPaymentDisplay] = useState<string>("00.00")
  const [paymentString, setPaymentString] = useState<string>("")
  const [purchaseStatus, setPurchaseStatus] = useState<status>(status.NO_SELECTION)


  const selectionText = () => {
    if(purchaseStatus == status.NO_SELECTION){
      return <h3 className='Selection-Text-Moving-First'>Please make your selection</h3>
    }else if(purchaseStatus == status.ITEM_SELECTED){
      return <h3 className='Selection-Text-Moving-Second'>You have selected Item {itemSelected}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The cost is ${cost}</h3>
    }else if(purchaseStatus == status.PAYMENT_IN_PROGRESS){
      return <h3 className='Selection-Text-Moving-Third'>Please enter in ${cost} or more</h3>
    }
  }

  
  const updateOrder = (value : string) => {
    if((order === "1") && (value === "0" || value === "1" || value === "2")){
      setOrder(order + value)
    }else if(value != "0"){
      setOrder(value)
    }
  }

  const inputPayment = (input : string) => {

    const value = paymentString.concat(input)
    setPaymentString(value)
    const numberValue : number = parseInt(value)
    const formattedValue : number = numberValue/100
    const finalValue = formattedValue.toString()
    setPaymentDisplay(finalValue)
    
  }

  const clearOrder = () => {
    setOrder("")
    setPurchaseStatus(status.NO_SELECTION)
    setItemSelected("")
    setPaymentDisplay("00.00")
    setPaymentString("")
  }

  const enterOrder = () => {
    setPurchaseStatus(status.ITEM_SELECTED)
    setItemSelected(order)
    getCost(order)
    setOrder("")
  }

  const getCost = (order : string) => {
    if(parseInt(order) > 0 && parseInt(order) <= 4){
      setCost("2.00")
    }else if(parseInt(order) > 4 && parseInt(order) <= 8){
      setCost("4.00")
    }else if(parseInt(order) > 8 && parseInt(order) <= 12){
    setCost("6.00")
    }
  }

  const payOrder = () => {

  }

  useEffect(()=> {
    const timer = setTimeout(() => setPurchaseStatus(status.PAYMENT_IN_PROGRESS), 9)
    return () => clearTimeout(timer)
  }, [itemSelected])

 return (
    <div className='Interface'>
        {purchaseStatus === status.PAYMENT_IN_PROGRESS
        ?
          <div className='Display'>
            {paymentDisplay == "00.00"
            ?
            selectionText()
            :
            <h3>${paymentDisplay}</h3>
            }
            
          </div>
        :
         <div className='Display'>
            {order == ""
            ?
            selectionText()
            :
            <h3>{order}</h3>
            }
            
          </div>
        }
        <div className='Keypad'>
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("1")}
            >1</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("1")}
            >1</button>
          }

          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("2")}
            >2</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("2")}
            >2</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("3")}
            >3</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("3")}
            >3</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("4")}
            >4</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("4")}
            >4</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("5")}
            >5</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("5")}
            >5</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("6")}
            >6</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("6")}
            >6</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("7")}
            >7</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("7")}
            >7</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("8")}
            >8</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("8")}
            >8</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("9")}
            >9</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("9")}
            >9</button>
          }
            <button 
            className='Key'
            onClick={() => clearOrder()}
            >Clear</button>
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => inputPayment("0")}
            >0</button>
          :
            <button 
            className='Key'
            onClick={() => updateOrder("0")}
            >0</button>
          }
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            onClick={() => payOrder()}
            >Enter</button>
          :
            <button 
            className='Key'
            onClick={() => enterOrder()}
            >Enter</button>
          }
        </div>

    </div>
  )
}

export default Interface