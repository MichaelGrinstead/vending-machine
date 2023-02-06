import React, {createContext, useState, ReactNode} from 'react'

interface VendingContextInterface {
    currentItemSelected : string
    setCurrentItemSelected : React.Dispatch<React.SetStateAction<string>>
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

    
    const [currentItemSelected, setCurrentItemSelected] = useState<string>("")

  return(
    <VendingContext.Provider
    value={{
        currentItemSelected, 
        setCurrentItemSelected
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext