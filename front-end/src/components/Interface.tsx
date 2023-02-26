import {useEffect, useState, useContext} from 'react'
import {VendingContract, VendingTokenContract, VendingAddress, signer} from '../ContractObjects'
import VendingContext from '../context/VendingContext'

const Interface = () => {

  const {
    currentItemSelected, 
    setCurrentItemSelected,
    lightMode,
    remainingDeposit,
    setRemainingDeposit
  } = useContext(VendingContext)

  
  const enum status {
    ENTERING_DEPOSIT,
    DISPLAYING_DEPOSIT,
    SELECTING_ITEM,
    ITEM_SELECTED,
    DISPLAYING_COST,
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
  


  const makeDeposit = async () => {
    try{
      const approval = await VendingTokenContract.approve(VendingAddress, depositValue)
      await approval.wait()
    }catch(e){
      console.log(e)
    }finally{
      setPurchaseStatus(status.DISPLAYING_DEPOSIT)
      setDepositDisplay(inputDepositDisplay)
      getRemainingDeposit()
      setTimeout(() => setPurchaseStatus(status.SELECTING_ITEM), 9000)
    
    } 
  }

  const getRemainingDeposit = async () => {
    const changeNumber = await VendingTokenContract.allowance(signer.getAddress(), VendingAddress)
    const changeFormatted = changeNumber/100
    const changeFinal = changeFormatted.toFixed(2)
    setRemainingDeposit(changeFinal)
  }

  const updateOrder = (value : string) => {
    if((currentItemSelected === "1") && (value === "0" || value === "1" || value === "2")){
      setCurrentItemSelected(currentItemSelected + value)
      setItemDisplay(currentItemSelected + value)
    }else if(value !== "0"){
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
    const finalValue = formattedValue.toFixed(2)
    setInputDepositDisplay(finalValue)
  }

  const clearOrder = async () => {
    setPurchaseStatus(status.ENTERING_DEPOSIT)
    setCurrentItemSelected("")
    setInputDepositDisplay("00.00")
    setDepositString("")
    setItemSelected(false)
    await VendingTokenContract.approve(VendingAddress, 0)
  }

  const clearPaymentDisplay = () => {
    setInputDepositDisplay("00.00")
    setDepositString("")
  }

  const enterOrder = () => {
    getCost(currentItemSelected)
    setItemDisplay("")
    setPurchaseStatus(status.ITEM_SELECTED)
    setTimeout(() => setPurchaseStatus(status.DISPLAYING_COST), 9000)
    
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
    const buyer = await signer.getAddress()
    try{
      const purchase = await VendingContract.purchase(buyer, parseInt(currentItemSelected), (parseInt(cost)*100))
      await purchase.wait()
    }catch(e){
      console.log(e)
    }finally{
      getRemainingDeposit()
      setPurchaseStatus(status.DISPLAYING_REMAINING_DEPOSIT)
      setCurrentItemSelected("")
  
      if(remainingDeposit === "0.00"){
        setTimeout(() => setPurchaseStatus(status.ENTERING_DEPOSIT), 9000)
        setInputDepositDisplay("00.00")
      }else{
        setTimeout(() => setPurchaseStatus(status.SELECTING_ITEM), 9000)
      }
    } 
  }

  console.log(purchaseStatus)
  console.log(remainingDeposit)

///Conditional HTML

  const selectionText = () => {
    if(purchaseStatus === status.ENTERING_DEPOSIT){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'}>Please enter an amount to deposit</h3>
    }else if(purchaseStatus === status.DISPLAYING_DEPOSIT){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'}>You have deposited ${depositDisplay}</h3>
    }else if(purchaseStatus === status.SELECTING_ITEM){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving-Longer' : 'Selection-Text-Moving-Longer'}>Please make your selection or press clear to end</h3>
    }else if(purchaseStatus === status.ITEM_SELECTED){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'}>You have selected item {currentItemSelected}</h3> 
    }else if(purchaseStatus === status.DISPLAYING_COST){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving-Longer' : 'Selection-Text-Moving-Longer'}>The cost is ${cost}&nbsp;&nbsp;&nbsp;Press enter to confirm</h3>
    }else if(purchaseStatus === status.DISPLAYING_REMAINING_DEPOSIT){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'}>You have ${remainingDeposit} remaining</h3>
    }
    
    
  }

  const enterButton = () => {
    if(purchaseStatus === status.ENTERING_DEPOSIT){
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'} 
              style={{fontSize: "30px"}} 
              onClick={() => makeDeposit()}
              >Enter
              </button>

    }else if(purchaseStatus === status.SELECTING_ITEM){
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'} 
              style={{fontSize: "30px"}} 
              onClick={() => enterOrder()}
              >Enter
              </button>

    }else if(purchaseStatus === status.DISPLAYING_COST){
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'} 
              style={{fontSize: "30px"}} 
              onClick={() => payOrder()}
              >Enter
              </button>

    }else{
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'} 
              style={{fontSize: "30px"}}
              >Enter
              </button>
    }
  }

  const clearButton = () => {
    if(purchaseStatus === status.ENTERING_DEPOSIT){
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'}
              style={{fontSize: "30px"}}
              onClick={() => clearPaymentDisplay()}
              >Clear
              </button>

    }else if(purchaseStatus === status.SELECTING_ITEM){
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'}
              style={{fontSize: "30px"}}
              onClick={() => clearOrder()}
              >Clear
              </button>

    }else{
      return  <button 
              className={lightMode ? 'L-Key' : 'Key'}
              style={{fontSize: "30px"}}
              >Clear
              </button>
    }
  }

///UseEffect

  useEffect(() => {
    selectionText()
  },[purchaseStatus])

  useEffect(() => {
    getRemainingDeposit()
  }, [])

 return (
    <div className={lightMode ? 'L-Interface' : 'Interface'}>
        {purchaseStatus === status.ENTERING_DEPOSIT
        ?
          <div className={lightMode ? 'L-Display' : 'Display'}>
            {inputDepositDisplay === "00.00"
            ?
            selectionText()
            :
            <h3>${inputDepositDisplay}</h3>
            }
            
          </div>
        :
         <div className={lightMode ? 'L-Display' : 'Display'}>
            {itemDisplay === ""
            ?
            selectionText()
            :
            <h3>{itemDisplay}</h3>
            }
            
          </div>
        }
        <div className={lightMode ? 'L-Keypad' : 'Keypad'}>
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("1")}
            >1</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("1")}
            >1</button>
          }

          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("2")}
            >2</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("2")}
            >2</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("3")}
            >3</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("3")}
            >3</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("4")}
            >4</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("4")}
            >4</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("5")}
            >5</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("5")}
            >5</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("6")}
            >6</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("6")}
            >6</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("7")}
            >7</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("7")}
            >7</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("8")}
            >8</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("8")}
            >8</button>
          }
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("9")}
            >9</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("9")}
            >9</button>
          }
          {clearButton()}
          {purchaseStatus === status.ENTERING_DEPOSIT
          ?
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => inputPayment("0")}
            >0</button>
          :
            <button 
            className={lightMode ? 'L-Key' : 'Key'}
            onClick={() => updateOrder("0")}
            >0</button>
          }
          {enterButton()}
        </div>

    </div>
  )
}

export default Interface