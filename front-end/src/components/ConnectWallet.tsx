import {FC, ReactElement, useState, useContext} from 'react'
import {provider} from '../ContractObjects'
import VendingContext from '../context/VendingContext'
import { connectionState } from '../context/VendingContext'

declare var window : any 

const ConnectWallet : FC = () : ReactElement => {

  const {connectionStatus, setConnectionStatus} = useContext(VendingContext)

  const connect = async () =>  {
    console.log(connectionStatus)
    try{
      await provider.send("eth_requestAccounts", [])
    }catch(e){
      console.log(e)
      setConnectionStatus(connectionState.NO_WALLET)
      console.log(connectionStatus)
    }finally{
      setConnectionStatus(connectionState.CONNECTED)
    }
  }

  


  return (
    <button
    className= 'Connect'
    onClick= {connect}
    >
      CONNECT WALLET
    </button>
  )
}

export default ConnectWallet
