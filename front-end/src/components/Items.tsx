import {useContext} from 'react'
import VendingContext from '../context/VendingContext'
import cherry_ripe from '../images/cherry_ripe.jpeg'
import mi_goreng from '../images/mi_goreng.jpg'
import protein_bar from '../images/protein_bar.jpeg'
import nurofen from '../images/nurofen.jpeg'
import goat_beer from '../images/goat_beer.png'
import coffee from '../images/coffee.jpeg'
import tuna from '../images/tuna.jpg'
import broccolini from '../images/broccolini.jpeg'
import peanuts from '../images/peanuts.jpg'
import egg from '../images/egg.jpeg'
import sriracha from '../images/sriracha.jpeg'
import bhuja from '../images/bhuja.jpeg'

const Items = () => {

    const {currentItemSelected, setCurrentItemSelected} = useContext(VendingContext)
    


  return (
        <div className='Vending-Items'>
        {currentItemSelected === "1"
        ?
        <img src={cherry_ripe} className='ItemSelected'></img>
        :
        <img src={cherry_ripe} className='Item' onClick={() => setCurrentItemSelected("1")}></img>

        }  

        {currentItemSelected === "2"
        ?
        <img src={mi_goreng} className='ItemSelected'></img>
        :
        <img src={mi_goreng} className='Item' onClick={() => setCurrentItemSelected("2")}></img>

        }  

        {currentItemSelected === "3"
        ?
        <img src={protein_bar} className='ItemSelected'></img>
        :
        <img src={protein_bar} className='Item' onClick={() => setCurrentItemSelected("3")}></img>

        } 

        {currentItemSelected === "4"
        ?
        <img src= {nurofen} className='ItemSelected'></img>
        :
        <img src= {nurofen} className='Item' onClick={() => setCurrentItemSelected("4")}></img>

        } 

        {currentItemSelected === "5"
        ?
        <img src={goat_beer} className='ItemSelected'></img>
        :
        <img src={goat_beer} className='Item' onClick={() => setCurrentItemSelected("5")}></img>

        } 
        
        {currentItemSelected === "6"
        ?
        <img src={coffee} className='ItemSelected'></img>
        :
        <img src={coffee} className='Item' onClick={() => setCurrentItemSelected("6")}></img>

        } 

        {currentItemSelected === "7"
        ?
        <img src={tuna} className='ItemSelected'></img>
        :
        <img src={tuna} className='Item' onClick={() => setCurrentItemSelected("7")}></img>

        } 
        
        {currentItemSelected === "8"
        ?
        <img src={broccolini} className='ItemSelected'></img>
        :
        <img src={broccolini} className='Item' onClick={() => setCurrentItemSelected("8")}></img>

        } 

        {currentItemSelected === "9"
        ?
        <img src={peanuts} className='ItemSelected'></img>
        :
        <img src={peanuts} className='Item' onClick={() => setCurrentItemSelected("9")}></img>

        } 

        {currentItemSelected === "10"
        ?
        <img src={egg} className='ItemSelected'></img>
        :
        <img src={egg} className='Item' onClick={() => setCurrentItemSelected("10")}></img>

        } 

        {currentItemSelected === "11"
        ?
        <img src={sriracha} className='ItemSelected'></img>
        :
        <img src={sriracha} className='Item' onClick={() => setCurrentItemSelected("11")}></img>

        } 

        {currentItemSelected === "12"
        ?
        <img src={bhuja} className='ItemSelected'></img>
        :
        <img src={bhuja} className='Item' onClick={() => setCurrentItemSelected("12")}></img>

        } 
    </div>
  )
}

export default Items
