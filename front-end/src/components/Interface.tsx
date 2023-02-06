import { ethers, utils } from 'ethers'
import {useEffect, useState, useContext} from 'react'
import {VendingContract, signer} from '../ContractObjects'
import VendingContext from '../context/VendingContext'

const Interface = () => {

  const {currentItemSelected, setCurrentItemSelected} = useContext(VendingContext)

  
  const enum status {
    NO_SELECTION,
    ITEM_SELECTED,
    PAYMENT_IN_PROGRESS,
    PAYMENT_ENTERED,
    PAYMENT_COMPLETE
  }

  const [cost, setCost] = useState<string>("")
  const [itemDisplay, setItemDisplay] = useState<string>("")
  const [paymentDisplay, setPaymentDisplay] = useState<string>("00.00")
  const [paymentString, setPaymentString] = useState<string>("")
  const [paymentValue, setPaymentValue] = useState<number>(0)
  const [purchaseStatus, setPurchaseStatus] = useState<status>(status.NO_SELECTION)
  const [itemSelected, setItemSelected] = useState<boolean>(false)

  console.log(currentItemSelected)
  console.log(paymentDisplay)
  console.log(purchaseStatus)
  console.log(paymentValue)


  const selectionText = () => {
    if(purchaseStatus == status.NO_SELECTION){
      return <h3 className='Selection-Text-Moving-First'>Please make your selection</h3>
    }else if(purchaseStatus == status.ITEM_SELECTED){
      return <h3 className='Selection-Text-Moving-Second'>You have selected Item {currentItemSelected}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The cost is ${cost}</h3>
    }else if(purchaseStatus == status.PAYMENT_IN_PROGRESS){
      return <h3 className='Selection-Text-Moving-Third'>Please enter in ${cost} or more</h3>
    }
  }

  
  const updateOrder = (value : string) => {
    if((currentItemSelected === "1") && (value === "0" || value === "1" || value === "2")){
      setItemDisplay(currentItemSelected + value)
    }else if(value != "0"){
      setCurrentItemSelected(value)
      setItemDisplay(value)
      setItemSelected(true)
    }
  }

  const inputPayment = (input : string) => {

    const value = paymentString.concat(input)
    setPaymentString(value)
    const numberValue : number = parseInt(value)
    setPaymentValue(numberValue)
    const formattedValue : number = numberValue/100
    console.log(formattedValue)
    // const finalValue = addDecimal(formattedValue)
    const finalValue = formattedValue.toString()
    console.log(finalValue)
    setPaymentDisplay(finalValue)
  }

  // const addDecimal = (value : number) => {
  //   let decimalValue
  //   const singleDecimals = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
  //   if(value >= 1 && value < 10){
  //     const stringValue = value.toString()
  //     decimalValue = stringValue + "." + "0" + "0"
  //   }else if(singleDecimals.includes(value)){
  //     const stringValue = value.toString()
  //     console.log(stringValue)
  //     decimalValue = stringValue + "0"
  //   }else{
  //     decimalValue = value.toString()
  //   }
  //   return decimalValue
  // }

  const clearOrder = () => {

    setPurchaseStatus(status.NO_SELECTION)
    setCurrentItemSelected("")
    setPaymentDisplay("00.00")
    setPaymentString("")
    setItemSelected(false)
  }

  const clearPaymentDisplay = () => {
    setPaymentDisplay("00.00")
    setPaymentString("")
  }

  console.log(itemSelected)

  const enterOrder = () => {
    setPurchaseStatus(status.ITEM_SELECTED)
    getCost(currentItemSelected)
    setItemDisplay("")
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

  const payOrder = async () => {
    console.log("clicked")
    const buyer = await signer.getAddress()
    console.log(buyer)
    console.log(paymentDisplay)
    console.log(parseInt(currentItemSelected))
    console.log(paymentValue)
    await VendingContract.purchase(buyer, parseInt(currentItemSelected), paymentValue)
  }


  useEffect(()=> {
    const timer = setTimeout(() => setPurchaseStatus(status.PAYMENT_IN_PROGRESS), 95)
    return () => clearTimeout(timer)
  }, [purchaseStatus === status.ITEM_SELECTED])

  useEffect(() => {
    clearOrder()
  }, [])

  useEffect(() => {
    selectionText()
  },[purchaseStatus])

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
            {itemDisplay === ""
            ?
            selectionText()
            :
            <h3>{itemDisplay}</h3>
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
          {purchaseStatus === status.PAYMENT_IN_PROGRESS
          ?
            <button 
            className='Key'
            style={{fontSize: "30px"}}
            onClick={() => clearPaymentDisplay()}
            >Clear</button>
          :
            <button 
            className='Key'
            style={{fontSize: "30px"}}
            onClick={() => clearOrder()}
            >Clear</button>
          }
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
            style={{fontSize: "30px"}}
            onClick={() => payOrder()}
            >Enter</button>
          :
            <button 
            className='Key'
            style={{fontSize: "30px"}}
            onClick={() => enterOrder()}
            >Enter</button>
          }
        </div>

    </div>
  )
}

export default Interface