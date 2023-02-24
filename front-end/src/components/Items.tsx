import {useContext, useState} from 'react'
import VendingContext from '../context/VendingContext'
import { VendingContract } from '../ContractObjects'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
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

const ID = process.env.REACT_APP_INFURA_PROJECT_ID
const SECRET = process.env.REACT_APP_INFURA_PROJECT_SECRET

console.log(ID)
console.log(SECRET)

const Items = () => {

    const {currentItemSelected, setCurrentItemSelected, lightMode} = useContext(VendingContext)

    
    const auth = 'Basic ' + Buffer.from(ID + ':' + SECRET).toString('base64');
    const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth,
    }
  })
    const handleItemUpload = async (e : any) => {
      const item : any = e.target.files[0]
      const itemNumber = e.target.name
      console.log(item)
      console.log(itemNumber)
      try{
          const added = await client.add(item)
          console.log(added.path)
          console.log(`https://personal-project-storage.infura-ipfs.io/ipfs/${added.path}`)
         
          await VendingContract.addCID(parseInt(itemNumber), added.path)
      }catch(error){
          console.log(error)
      }finally{
        console.log(await VendingContract.tokenURI(1))
      }
  }

  

  return (
        <div className={lightMode ? 'L-Vending-Items' : 'Vending-Items'}>
        

          {currentItemSelected === "1"
          ?
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
              <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>1</div> 
              <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                <input style= {{display: 'none'}} type='file' id='file1' name='1' onChange={handleItemUpload}></input>
                Upload Image
              </label>            
            </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
          </div>
          :
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
              <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>1</div> 
              <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                <input style= {{display: 'none'}} type='file' id='file1' name='1' onChange={handleItemUpload}></input>
                Upload Image 
              </label>
            </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
          </div>
          }  
          
        

        {currentItemSelected === "2"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
        <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
          <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>2</div> 
          <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file2'>
            <input style= {{display: 'none'}} type='file' id='file2' name='2' onChange={handleItemUpload}></input>
            Upload Image
          </label> 
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>2</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file2'>
              <input style= {{display: 'none'}} type='file' id='file2' name='2' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
          </div>
        }  

        {currentItemSelected === "3"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>3</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file3'>
              <input style= {{display: 'none'}} type='file' id='file3' name='3' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>3</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file3'>
              <input style= {{display: 'none'}} type='file' id='file3' name='3' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
        </div>
        }

        {currentItemSelected === "4"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>4</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file4'>
              <input style= {{display: 'none'}} type='file' id='file4' name='4' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>4</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file4'>
              <input style= {{display: 'none'}} type='file' id='file4' name='4' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
        </div>
        } 


        {currentItemSelected === "5"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>5</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file5'>
              <input style= {{display: 'none'}} type='file' id='file5' name='5' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>          
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>5</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file5'>
              <input style= {{display: 'none'}} type='file' id='file5' name='5' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        {currentItemSelected === "6"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>6</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file6'>
              <input style= {{display: 'none'}} type='file' id='file6' name='6' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>6</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file6'>
              <input style= {{display: 'none'}} type='file' id='file6' name='6' onChange={handleItemUpload}></input>
              Upload Imag6
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        
        {currentItemSelected === "7"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>7</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file7'>
              <input style= {{display: 'none'}} type='file' id='file7' name='7' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>7</div> 
             <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file7'>
              <input style= {{display: 'none'}} type='file' id='file7' name='7' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        
        
        {currentItemSelected === "8"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>8</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file8'>
              <input style= {{display: 'none'}} type='file' id='file8' name='8' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>8</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file8'>
              <input style= {{display: 'none'}} type='file' id='file8' name='8' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        

        {currentItemSelected === "9"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>9</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file9'>
              <input style= {{display: 'none'}} type='file' id='file9' name='9' onChange={handleItemUpload}></input>
              Upload Image
            </label> 
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>9</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file9'>
              <input style= {{display: 'none'}} type='file' id='file9' name='9' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        }


        {currentItemSelected === "10"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>10</div> 
             <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file10'>
              <input style= {{display: 'none'}} type='file' id='file10' name='10' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>10</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file10'>
              <input style= {{display: 'none'}} type='file' id='file10' name='10' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        } 

       
        {currentItemSelected === "11"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>11</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file11'>
              <input style= {{display: 'none'}} type='file' id='file11' name='11' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>11</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file11'>
              <input style= {{display: 'none'}} type='file' id='file11' name='11' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        } 

        {currentItemSelected === "12"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>12</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file12'>
              <input style= {{display: 'none'}} type='file' id='file12' name='12' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>12</div> 
            <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file12'>
              <input style= {{display: 'none'}} type='file' id='file12' name='12' onChange={handleItemUpload}></input>
              Upload Image
            </label>
          </div>
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        }
    </div>
  )
}

export default Items
