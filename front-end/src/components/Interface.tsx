import {useEffect, useState, useContext} from 'react'
import {VendingTokenContract, signer} from '../ContractObjects'
import VendingContext from '../context/VendingContext'

const Interface = () => {

  const {
    currentItemSelected, 
    setCurrentItemSelected,
    lightMode,
    remainingDeposit,
    setRemainingDeposit,
    retrieveImages,
    createVendingContractInstance,
    vendingAddress
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

  console.log(vendingAddress
    )
  const makeDeposit = async () => {
    const user = await signer.getAddress()
    console.log(await VendingTokenContract.balanceOf(user))
    console.log(depositValue)
    if(await VendingTokenContract.balanceOf(user) > depositValue){

      try{
        const approval = await VendingTokenContract.approve(vendingAddress, depositValue)
        await approval.wait()
      }catch(e){
        console.log(e)
      }finally{
        setPurchaseStatus(status.DISPLAYING_DEPOSIT)
        setDepositDisplay(inputDepositDisplay)
        getRemainingDeposit()
        setTimeout(() => setPurchaseStatus(status.SELECTING_ITEM), 9000)
      
      } 
    }else{
      console.log("not enough tokens")    }
  }

  const getRemainingDeposit = async () => {
    const changeNumber = await VendingTokenContract.allowance(signer.getAddress(), vendingAddress)
    // if(changeNumber > 200){
    //   setPurchaseStatus(status.SELECTING_ITEM)
    // }
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
    try{
      const clear = await VendingTokenContract.approve(vendingAddress, 0)
      await clear.wait()
    }catch(e){
      console.log(e)
    }finally{
      setPurchaseStatus(status.ENTERING_DEPOSIT)
      setCurrentItemSelected("")
      setInputDepositDisplay("00.00")
      setDepositString("")
      getRemainingDeposit()
    }
  }

  const clearPaymentDisplay = () => {
    setInputDepositDisplay("00.00")
    setDepositString("")
  }

  const enterOrder = () => {
    getCost(currentItemSelected)
    setItemDisplay("")
    setPurchaseStatus(status.ITEM_SELECTED)
    setTimeout(() => setPurchaseStatus(status.DISPLAYING_COST), 8000)
    
  }

  const getCost = async (order : string) => {
    const contract = createVendingContractInstance(vendingAddress)
    const cost = ((await contract.itemNumberToPrice(order)) / 100).toFixed(2)
    setCost(cost)
  }

  const payOrder = async () => {
    const contract = createVendingContractInstance(vendingAddress)
    const buyer = await signer.getAddress()
    try{
      const purchase = await contract.purchase(buyer, parseInt(currentItemSelected))
      await purchase.wait()
    }catch(e){
      console.log(e)
    }finally{
      getRemainingDeposit()
      setPurchaseStatus(status.DISPLAYING_REMAINING_DEPOSIT)
      setCurrentItemSelected("")
      setInputDepositDisplay("00.00")
      setItemDisplay("")
  
      if(remainingDeposit === "0.00"){
        setTimeout(() => setPurchaseStatus(status.PAYMENT_COMPLETE), 9000)
        setTimeout(() => setPurchaseStatus(status.ENTERING_DEPOSIT), 18000)
      }else{
        setTimeout(() => setPurchaseStatus(status.PAYMENT_COMPLETE), 9000)
        setTimeout(() => setPurchaseStatus(status.SELECTING_ITEM), 18000)
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
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'} style={{width: '400px'}} >You have selected item {currentItemSelected}</h3> 
    }else if(purchaseStatus === status.DISPLAYING_COST){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving-Longer' : 'Selection-Text-Moving-Longer'} style={{width: '1000px'}}>The cost is ${cost}&nbsp;&nbsp;&nbsp;Press enter to confirm or clear to cancel</h3>
    }else if(purchaseStatus === status.DISPLAYING_REMAINING_DEPOSIT){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'}>You have ${remainingDeposit} remaining</h3>
    }else if(purchaseStatus === status.PAYMENT_COMPLETE){
      return <h3 className={lightMode ? 'L-Selection-Text-Moving' : 'Selection-Text-Moving'}>Thank You for your purchase.</h3>
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

    }else if(purchaseStatus === status.DISPLAYING_COST){
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

  useEffect(() => {
    retrieveImages()
    
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