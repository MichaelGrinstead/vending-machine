import React from 'react'
import { FC, useContext } from 'react'
import VendingContext from '../context/VendingContext'
import CurrencyInput from 'react-currency-input-field';

interface Prices {
    [key : number] : string 
  }

  interface Clicked {
    [key : number] : boolean
  }
  
  

interface props {
    handleClick : (e: React.MouseEvent<HTMLElement>) => void
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void
    handleItemUpload : (e: any) => Promise<void>
    checkItems : boolean
    changingPrice : boolean
    updatingPriceNumber : string | null
    updatePrice : (e: React.KeyboardEvent<HTMLElement>) => Promise<void>
    price : Prices
    setClickedItem :  React.Dispatch<React.SetStateAction<Clicked>>
    itemNumber : number
}
const Item : FC<props> = ({
    handleClick, 
    handleChange, 
    updatePrice,  
    handleItemUpload, 
    checkItems, 
    changingPrice, 
    updatingPriceNumber,
    price,
    setClickedItem,
    itemNumber
})  => {

    const {currentItemSelected, lightMode, isUserOwner, CIDS} = useContext(VendingContext)

    console.log(itemNumber)

  return (
    <div>
          {currentItemSelected === itemNumber.toString()
          ?
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
              <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>{itemNumber.toString()}</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id='1'
              >$
              </div>
            
                {checkItems
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} >
                    <input style= {{display: 'none'}} name={itemNumber.toString()} onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[itemNumber - 1]}`}/>             
                }
            

            </div>
            {changingPrice && updatingPriceNumber === itemNumber.toString()
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '1' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[itemNumber]) === 0 ? "0.00" : price[itemNumber]}</div>
            }
                
          </div>
          :
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
              <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>{itemNumber.toString()}</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id={itemNumber.toString()}
              >$
              </div>
                {checkItems
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                    <input style= {{display: 'none'}} type='file' id='file1' name={itemNumber.toString()} onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' id = {itemNumber.toString()} onClick={() => setClickedItem({1 : true})} src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[itemNumber - 1]}`}/>             
                }
            </div>
            {changingPrice && updatingPriceNumber === itemNumber.toString()
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= {itemNumber.toString()} 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[itemNumber]) === 0 ? "0.00" : price[itemNumber]}</div>
            }  
          
          </div>
          }  
          
    </div>
  )
}

export default Item
