import {useContext} from 'react'
import VendingContext from '../context/VendingContext'

const Items = () => {

    const {order, setOrder} = useContext(VendingContext)
    


  return (
        <div className='Vending-Items'>
        {order === "1"
        ?
        <div className='ItemSelected'>Item 1</div>
        :
        <div className='Item' onClick={() => setOrder("1")}>Item 1</div>

        }  

        {order === "2"
        ?
        <div className='ItemSelected'>Item 2</div>
        :
        <div className='Item' onClick={() => setOrder("2")}>Item 2</div>

        }  

        {order === "3"
        ?
        <div className='ItemSelected'>Item 3</div>
        :
        <div className='Item' onClick={() => setOrder("3")}>Item 3</div>

        } 

        {order === "4"
        ?
        <div className='ItemSelected'>Item 4</div>
        :
        <div className='Item' onClick={() => setOrder("4")}>Item 4</div>

        } 

        {order === "5"
        ?
        <div className='ItemSelected'>Item 5</div>
        :
        <div className='Item' onClick={() => setOrder("5")}>Item 5</div>

        } 
        
        {order === "6"
        ?
        <div className='ItemSelected'>Item 6</div>
        :
        <div className='Item' onClick={() => setOrder("6")}>Item 6</div>

        } 

        {order === "7"
        ?
        <div className='ItemSelected'>Item 7</div>
        :
        <div className='Item' onClick={() => setOrder("7")}>Item 7</div>

        } 
        
        {order === "8"
        ?
        <div className='ItemSelected'>Item 8</div>
        :
        <div className='Item' onClick={() => setOrder("8")}>Item 8</div>

        } 

        {order === "9"
        ?
        <div className='ItemSelected'>Item 9</div>
        :
        <div className='Item' onClick={() => setOrder("9")}>Item 9</div>

        } 

        {order === "10"
        ?
        <div className='ItemSelected'>Item 10</div>
        :
        <div className='Item' onClick={() => setOrder("10")}>Item 10</div>

        } 

        {order === "11"
        ?
        <div className='ItemSelected'>Item 11</div>
        :
        <div className='Item' onClick={() => setOrder("11")}>Item 11</div>

        } 

        {order === "12"
        ?
        <div className='ItemSelected'>Item 12</div>
        :
        <div className='Item' onClick={() => setOrder("12")}>Item 12</div>

        } 
    </div>
  )
}

export default Items
