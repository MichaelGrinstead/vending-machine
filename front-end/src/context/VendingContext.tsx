import React, {createContext, useState, ReactNode} from 'react'

interface VendingContextInterface {
    itemSelected : string
    setItemSelected : React.Dispatch<React.SetStateAction<string>>
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

    
    const [itemSelected, setItemSelected] = useState<string>("")

  return(
    <VendingContext.Provider
    value={{
        itemSelected, 
        setItemSelected
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext