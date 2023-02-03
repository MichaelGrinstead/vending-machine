import React, {useState} from 'react'

const Interface = () => {

  const [order, setOrder] = useState("0")

  const updateOrder = (value : string) => {
    setOrder(order + value)
  }

  const enterOrder = () => {
    
  }

  return (
    <div className='Interface'>
        <div className='Display'>{order}</div>
        <div className='Keypad'>
            <button 
            className='Key'
            onClick={() => updateOrder("1")}
            >1</button>
            <button 
            className='Key'
            onClick={() => updateOrder("2")}
            >2</button>
            <button 
            className='Key'
            onClick={() => updateOrder("3")}
            >3</button>
            <button 
            className='Key'
            onClick={() => updateOrder("4")}
            >4</button>
            <button 
            className='Key'
            onClick={() => updateOrder("5")}
            >5</button>
            <button 
            className='Key'
            onClick={() => updateOrder("6")}
            >6</button>
            <button 
            className='Key'
            onClick={() => updateOrder("7")}
            >7</button>
            <button 
            className='Key'
            onClick={() => updateOrder("8")}
            >8</button>
            <button 
            className='Key'
            onClick={() => updateOrder("9")}
            >9</button>
            <button 
            className='Key'
            onClick={() => setOrder("")}
            >clear</button>
            <button 
            className='Key'
            onClick={() => updateOrder("0")}
            >0</button>
            <button 
            className='Key'
            onClick={() => enterOrder()}
            >enter</button>
        </div>

    </div>
  )
}

export default Interface