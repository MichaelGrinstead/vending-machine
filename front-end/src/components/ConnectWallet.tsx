import {FC, ReactElement, useState, useContext} from 'react'
import {provider} from '../ContractObjects'
import VendingContext from '../context/VendingContext'
import { connectionState } from '../context/VendingContext'

declare var window : any 

const ConnectWallet : FC = () : ReactElement => {

  const {connectionStatus, setConnectionStatus, lightMode} = useContext(VendingContext)

  const connect = async () =>  {
    console.log(connectionStatus)
    try{
      await provider.send("eth_requestAccounts", [])
    }catch(e){
      console.log(e)
      
      setConnectionStatus(connectionState.NO_WALLET)
      console.log(connectionStatus)
    }finally{
      if(!window.ethereum.isConnected() ){
        setConnectionStatus(connectionState.NO_WALLET)
      }else if(window.ethereum.isConnected() && window.ethereum.networkVersion === "80001"){
        setConnectionStatus(connectionState.CONNECTED)
      }else if(window.ethereum.isConnected() && window.ethereum.networkVersion !== "80001"){
        setConnectionStatus(connectionState.INCORRECT_NETWORK)
      }
    }
  }

  


  return (
    <button
    className= {lightMode ? 'L-Connect' : 'Connect'}
    onClick= {connect}
    >
      CONNECT WALLET
    </button>
  )
}

export default ConnectWallet
