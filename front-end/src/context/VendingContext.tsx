import React, {createContext, useState, ReactNode} from 'react'

interface VendingContextInterface {
    order : string
    setOrder : React.Dispatch<React.SetStateAction<string>>
}

const VendingContext = createContext<VendingContextInterface>({} as VendingContextInterface)

export const VendingProvider  = ({children} : {children : ReactNode}) => {

    const [order, setOrder] = useState<string>("")

  return(
    <VendingContext.Provider
    value={{
        order,
        setOrder
      }}
      >
        {children}
    </VendingContext.Provider>
  ) 
}

export default VendingContext