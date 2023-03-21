import React, {useState, useContext, useEffect} from 'react'
import VendingContext from '../context/VendingContext'
import { VendingTokenContract, signer } from '../ContractObjects'

const Withdraw = () => {

    const {lightMode, createVendingContractInstance, vendingAddress} = useContext(VendingContext)

    const [balance, setBalance]  = useState<string>("")
    const [numberOfTokensMinted, setNumberOfTokensMinted] = useState<number>(0)

    const getBalance = async () => {
        const balance = await VendingTokenContract.balanceOf(vendingAddress) 
        console.log(balance)
        const balanceFormatted = (balance / 100).toFixed(2)
        setBalance(balanceFormatted)
    }

    const withdrawBalance = async () => {
        const contract = createVendingContractInstance(vendingAddress)
        await contract.withdraw()
    }

    const getCurrentTokenId = async () => {
        const contract = createVendingContractInstance(vendingAddress)
        const tokenId = await contract.tokenId()
        setNumberOfTokensMinted(tokenId)
    }

    useEffect(() => {
      getBalance()
      getCurrentTokenId()
    },[])
    

  return (
    <div className={lightMode ? 'L-Owner-Container' : 'Owner-Container'}>
        <div className={lightMode ? 'L-Owner-Inner' : "Owner-Inner"}>
            <h3 style={{fontSize:"35px", marginTop: "20%", fontFamily: "digital-7"}}> Tokens Minted: {numberOfTokensMinted}</h3>

            <h3 style={{fontSize:"35px", marginTop: "40%", fontFamily: "digital-7"}}> Balance: ${balance}</h3>
            <button className={lightMode ? 'L-Withdraw' : 'Withdraw'} onClick={() => withdrawBalance()}>Withdraw</button>

        </div>
    </div>
  )
}

export default Withdraw
