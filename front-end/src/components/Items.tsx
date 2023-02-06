import {useContext} from 'react'
import VendingContext from '../context/VendingContext'

const Items = () => {

    const {currentItemSelected, setCurrentItemSelected} = useContext(VendingContext)
    


  return (
        <div className='Vending-Items'>
        {currentItemSelected === "1"
        ?
        <div className='ItemSelected'>Item 1</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("1")}>Item 1</div>

        }  

        {currentItemSelected === "2"
        ?
        <div className='ItemSelected'>Item 2</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("2")}>Item 2</div>

        }  

        {currentItemSelected === "3"
        ?
        <div className='ItemSelected'>Item 3</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("3")}>Item 3</div>

        } 

        {currentItemSelected === "4"
        ?
        <div className='ItemSelected'>Item 4</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("4")}>Item 4</div>

        } 

        {currentItemSelected === "5"
        ?
        <div className='ItemSelected'>Item 5</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("5")}>Item 5</div>

        } 
        
        {currentItemSelected === "6"
        ?
        <div className='ItemSelected'>Item 6</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("6")}>Item 6</div>

        } 

        {currentItemSelected === "7"
        ?
        <div className='ItemSelected'>Item 7</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("7")}>Item 7</div>

        } 
        
        {currentItemSelected === "8"
        ?
        <div className='ItemSelected'>Item 8</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("8")}>Item 8</div>

        } 

        {currentItemSelected === "9"
        ?
        <div className='ItemSelected'>Item 9</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("9")}>Item 9</div>

        } 

        {currentItemSelected === "10"
        ?
        <div className='ItemSelected'>Item 10</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("10")}>Item 10</div>

        } 

        {currentItemSelected === "11"
        ?
        <div className='ItemSelected'>Item 11</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("11")}>Item 11</div>

        } 

        {currentItemSelected === "12"
        ?
        <div className='ItemSelected'>Item 12</div>
        :
        <div className='Item' onClick={() => setCurrentItemSelected("12")}>Item 12</div>

        } 
    </div>
  )
}

export default Items
