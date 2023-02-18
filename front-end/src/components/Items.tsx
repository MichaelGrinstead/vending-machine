import {useContext} from 'react'
import VendingContext from '../context/VendingContext'
import cherry_ripe_B from '../images-BlackBG/cherry_ripe.png'
import cherry_ripe_W from '../images/cherry_ripe.jpeg'
import mi_goreng_B from '../images-BlackBG/mi_goreng.png'
import mi_goreng_W from '../images/mi_goreng.jpg'
import protein_bar_B from '../images-BlackBG/protein_bar.png'
import protein_bar_W from '../images/protein_bar.jpeg'
import nurofen_B from '../images-BlackBG/nurofen.png'
import nurofen_W from '../images/nurofen.jpeg'
import goat_beer_B from '../images-BlackBG/goat_beer.png'
import goat_beer_W from '../images/goat_beer.png'
import coffee_B from '../images-BlackBG/coffee.png'
import coffee_W from '../images/coffee.jpeg'
import tuna_B from '../images-BlackBG/tuna.png'
import tuna_W from '../images/tuna.jpg'
import broccolini_B from '../images-BlackBG/broccolini.png'
import broccolini_W from '../images/broccolini.jpeg'
import peanuts_B from '../images-BlackBG/peanuts.png'
import peanuts_W from '../images/peanuts.jpg'
import egg_B from '../images-BlackBG/egg.png'
import egg_W from '../images/egg.jpeg'
import sriracha_B from '../images-BlackBG/sriracha.png'
import sriracha_W from '../images/sriracha.jpeg'
import bhuja_B from '../images-BlackBG/bhuja.png'
import bhuja_W from '../images/bhuja.jpeg'

const Items = () => {

    const {currentItemSelected, setCurrentItemSelected, lightMode} = useContext(VendingContext)
    


  return (
        <div className={lightMode ? 'L-Vending-Items' : 'Vending-Items'}>
        

          {currentItemSelected === "1"
          ?
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
              <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>1</div> 
              <img src={lightMode ? cherry_ripe_W : cherry_ripe_B} className={lightMode ? 'L-Item' : 'Item'}></img>
            </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>
          </div>
          :
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
              <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>1</div> 
              <img src={lightMode ? cherry_ripe_W : cherry_ripe_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("1")}></img> 
            </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
          </div>
          }  
          
        

        {currentItemSelected === "2"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
        <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
          <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>2</div> 
            <img src={lightMode ? mi_goreng_W : mi_goreng_B} className={lightMode ? 'L-Item' : 'Item'}></img>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>2</div> 
            <img src={lightMode ? mi_goreng_W : mi_goreng_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("2")}></img>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
          </div>
        }  

        {currentItemSelected === "3"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>3</div> 
            <img src={lightMode ? protein_bar_W : protein_bar_B} className={lightMode ? 'L-Item' : 'Item'}></img>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>3</div> 
            <img src={lightMode ? protein_bar_W : protein_bar_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("3")}></img>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
        </div>
        }

        {currentItemSelected === "4"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>4</div> 
            <img src= {lightMode ? nurofen_W : nurofen_B} className={lightMode ? 'L-Item' : 'Item'}></img>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>4</div> 
            <img src= {lightMode ? nurofen_W : nurofen_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("4")}></img>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
        </div>
        } 


        {currentItemSelected === "5"
        ?
        <img src={lightMode ? goat_beer_W : goat_beer_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? goat_beer_W : goat_beer_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("5")}></img>

        } 
        
        {currentItemSelected === "6"
        ?
        <img src={lightMode ? coffee_W : coffee_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? coffee_W : coffee_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("6")}></img>

        } 

        {currentItemSelected === "7"
        ?
        <img src={lightMode ? tuna_W : tuna_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? tuna_W : tuna_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("7")}></img>

        } 
        
        {currentItemSelected === "8"
        ?
        <img src={lightMode ? broccolini_W : broccolini_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? broccolini_W : broccolini_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("8")}></img>

        } 

        {currentItemSelected === "9"
        ?
        <img src={lightMode ? peanuts_W : peanuts_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? peanuts_W : peanuts_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("9")}></img>

        } 

        {currentItemSelected === "10"
        ?
        <img src={lightMode ? egg_W : egg_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? egg_W : egg_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("10")}></img>

        } 

        {currentItemSelected === "11"
        ?
        <img src={lightMode ? sriracha_W : sriracha_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? sriracha_W : sriracha_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("11")}></img>

        } 

        {currentItemSelected === "12"
        ?
        <img src={lightMode ? bhuja_W : bhuja_B} className={lightMode ? 'L-Item' : 'Item'}></img>
        :
        <img src={lightMode ? bhuja_W : bhuja_B} className={lightMode ? 'L-Item' : 'Item'} onClick={() => setCurrentItemSelected("12")}></img>

        } 
    </div>
  )
}

export default Items
