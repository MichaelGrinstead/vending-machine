import { ethers, utils } from 'ethers'
import {useEffect, useState, useContext} from 'react'
import {VendingContract, GLTokenContract, VendingAddress, signer} from '../ContractObjects'
import VendingContext from '../context/VendingContext'

const Interface = () => {

  const {currentItemSelected, setCurrentItemSelected} = useContext(VendingContext)

  
  const enum status {
    ENTERING_DEPOSIT,
    DISPLAYING_DEPOSIT,
    SELECTING_ORDER,
    DISPLAYING_REMAINING_DEPOSIT,
    PAYMENT_COMPLETE
  }

  const [cost, setCost] = useState<string>("")
  const [itemDisplay, setItemDisplay] = useState<string>("")
  const [inputDepositDisplay, setInputDepositDisplay] = useState<string>("00.00")
  const [depositString, setDepositString] = useState<string>("")
  const [depositValue, setDepositValue] = useState<number>(0)
  const [depositDisplay, setDepositDisplay] = useState<string>("")
  const [purchaseStatus, setPurchaseStatus] = useState<status>(status.ENTERING_DEPOSIT)
  const [itemSelected, setItemSelected] = useState<boolean>(false)
  const [remainingDeposit, setRemainingDeposit] = useState<string>("")

  console.log(currentItemSelected)
  console.log(inputDepositDisplay)
  console.log(purchaseStatus)
  console.log(depositValue)

  const makeDeposit = async () => {
    try{
      const approval = await GLTokenContract.approve(VendingAddress, depositValue)
      await approval.wait()
    }catch(e){
      console.log(e)
    }finally{
      setPurchaseStatus(status.DISPLAYING_DEPOSIT)
      setDepositDisplay(inputDepositDisplay)
    } 
  }

  const getRemainingDeposit = async () => {
    const changeNumber = await GLTokenContract.allowance(signer.getAddress(), VendingAddress)
    const changeFormatted = changeNumber/100
    const changeFinal = changeFormatted.toFixed(2)
    setRemainingDeposit(changeFinal)
  }

 

  
  const updateOrder = (value : string) => {
    if((currentItemSelected === "1") && (value === "0" || value === "1" || value === "2")){
      setCurrentItemSelected(currentItemSelected + value)
      setItemDisplay(currentItemSelected + value)
    }else if(value != "0"){
      setCurrentItemSelected(value)
      setItemDisplay(value)
      setItemSelected(true)
    }
  }

  const inputPayment = (input : string) => {
    setPurchaseStatus(status.ENTERING_DEPOSIT)

    const value = depositString.concat(input)
    setDepositString(value)
    const numberValue : number = parseInt(value)
    setDepositValue(numberValue)
    const formattedValue : number = numberValue/100
    console.log(formattedValue)
    const finalValue = formattedValue.toFixed(2)
    setInputDepositDisplay(finalValue)
  }

  const clearOrder = () => {
    setPurchaseStatus(status.ENTERING_DEPOSIT)
    setCurrentItemSelected("")
    setInputDepositDisplay("00.00")
    setDepositString("")
    setItemSelected(false)
  }

  const clearPaymentDisplay = () => {
    setInputDepositDisplay("00.00")
    setDepositString("")
  }

  const enterOrder = () => {
    
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
    await VendingContract.purchase(buyer, parseInt(currentItemSelected), depositValue)
  }

///Conditional HTML

  const selectionText = () => {
    if(purchaseStatus === status.ENTERING_DEPOSIT){
      return <h3 className='Selection-Text-Moving-First'>Please make a Deposit</h3>
    }else if(purchaseStatus === status.DISPLAYING_DEPOSIT){
      return <h3 className='Selection-Text-Moving-First'>You have deposited ${depositDisplay}</h3>
    }else if(purchaseStatus === status.SELECTING_ORDER){
      return <h3 className='Selection-Text-Moving-First'>Please make your selection</h3>
    }else if(purchaseStatus === status.DISPLAYING_REMAINING_DEPOSIT){
      return <h3 className='Selection-Text-Moving-First'>You have ${remainingDeposit} remaining</h3>
    }
  }

  const enterButton = () => {
    if(purchaseStatus === status.ENTERING_DEPOSIT){
      return <button className='Key' style={{fontSize: "30px"}} onClick={() => makeDeposit()}>Enter</button>
    }else if(purchaseStatus === status.SELECTING_ORDER){
      return  <button className='Key' style={{fontSize: "30px"}} onClick={() => enterOrder()}>Enter</button>
    }else{
      return <button className='Key' style={{fontSize: "30px"}}>Enter</button>
    }
  }

///UseEffect

  useEffect(()=> {
    const timer = setTimeout(() => setPurchaseStatus(status.SELECTING_ORDER), 9500)
    return () => clearTimeout(timer)
  }, [depositDisplay])

  useEffect(() => {
    clearOrder()
  }, [])

  useEffect(() => {
    selectionText()
  },[purchaseStatus])

  useEffect(() => {
    getRemainingDeposit()
  }, [])

 return (
    <div className='Interface'>
        {purchaseStatus === status.ENTERING_DEPOSIT
        ?
          <div className='Display'>
            {inputDepositDisplay == "00.00"
            ?
            selectionText()
            :
            <h3>${inputDepositDisplay}</h3>
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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

          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {purchaseStatus === status.ENTERING_DEPOSIT
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
          {enterButton()}
        </div>

    </div>
  )
}

export default Interface