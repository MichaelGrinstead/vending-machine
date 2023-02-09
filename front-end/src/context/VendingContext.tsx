import React, {createContext, useState, ReactNode} from 'react'

export const enum connectionState {
  UNCONNECTED,
  NO_WALLET,
  CONNECTED
}

interface VendingContextInterface {
    currentItemSelected : string
    setCurrentItemSelected : React.Dispatch<React.SetStateAction<string>>
    connectionStatus : connectionState
    setConnectionStatus: React.Dispatch<React.SetStateAction<connectionState>>
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

  
  
  const [currentItemSelected, setCurrentItemSelected] = useState<string>("")

  const [connectionStatus, setConnectionStatus] = useState<connectionState>(connectionState.UNCONNECTED)

  return(
    <VendingContext.Provider
    value={{
        currentItemSelected, 
        setCurrentItemSelected,
        connectionStatus,
        setConnectionStatus
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext