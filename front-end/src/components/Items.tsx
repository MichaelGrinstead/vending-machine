import {useContext} from 'react'
import VendingContext from '../context/VendingContext'

const Items = () => {

    const {itemSelected, setItemSelected} = useContext(VendingContext)
    


  return (
        <div className='Vending-Items'>
        {itemSelected === "1"
        ?
        <div className='ItemSelected'>Item 1</div>
        :
        <div className='Item' onClick={() => setItemSelected("1")}>Item 1</div>

        }  

        {itemSelected === "2"
        ?
        <div className='ItemSelected'>Item 2</div>
        :
        <div className='Item' onClick={() => setItemSelected("2")}>Item 2</div>

        }  

        {itemSelected === "3"
        ?
        <div className='ItemSelected'>Item 3</div>
        :
        <div className='Item' onClick={() => setItemSelected("3")}>Item 3</div>

        } 

        {itemSelected === "4"
        ?
        <div className='ItemSelected'>Item 4</div>
        :
        <div className='Item' onClick={() => setItemSelected("4")}>Item 4</div>

        } 

        {itemSelected === "5"
        ?
        <div className='ItemSelected'>Item 5</div>
        :
        <div className='Item' onClick={() => setItemSelected("5")}>Item 5</div>

        } 
        
        {itemSelected === "6"
        ?
        <div className='ItemSelected'>Item 6</div>
        :
        <div className='Item' onClick={() => setItemSelected("6")}>Item 6</div>

        } 

        {itemSelected === "7"
        ?
        <div className='ItemSelected'>Item 7</div>
        :
        <div className='Item' onClick={() => setItemSelected("7")}>Item 7</div>

        } 
        
        {itemSelected === "8"
        ?
        <div className='ItemSelected'>Item 8</div>
        :
        <div className='Item' onClick={() => setItemSelected("8")}>Item 8</div>

        } 

        {itemSelected === "9"
        ?
        <div className='ItemSelected'>Item 9</div>
        :
        <div className='Item' onClick={() => setItemSelected("9")}>Item 9</div>

        } 

        {itemSelected === "10"
        ?
        <div className='ItemSelected'>Item 10</div>
        :
        <div className='Item' onClick={() => setItemSelected("10")}>Item 10</div>

        } 

        {itemSelected === "11"
        ?
        <div className='ItemSelected'>Item 11</div>
        :
        <div className='Item' onClick={() => setItemSelected("11")}>Item 11</div>

        } 

        {itemSelected === "12"
        ?
        <div className='ItemSelected'>Item 12</div>
        :
        <div className='Item' onClick={() => setItemSelected("12")}>Item 12</div>

        } 
    </div>
  )
}

export default Items
