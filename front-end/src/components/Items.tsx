import {useContext, useState, useEffect} from 'react'
import VendingContext from '../context/VendingContext'
import { Contract } from 'ethers'
import {signer } from '../ContractObjects'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import CurrencyInput from 'react-currency-input-field';

const ID = process.env.REACT_APP_INFURA_PROJECT_ID
const SECRET = process.env.REACT_APP_INFURA_PROJECT_SECRET

interface Prices {
  [key : number] : string 
}

interface Clicked {
  [key : number] : boolean
}

const Items = () => {

    const {currentItemSelected,
       setCurrentItemSelected,
        lightMode,
        vendingAddress,
        createVendingContractInstance,
        getIsUserOwner,
        isUserOwner,
        CIDS,
        setCIDS
      } = useContext(VendingContext)

    
    const [changingPrice, setChangingPrice] = useState<boolean>(false)
    const [updatingPriceNumber, setUpdatingPriceNumber] = useState<string | null>("")
    const [price, setPrice] = useState<Prices>({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
      11: "",
      12: ""
    })

    const [priceInput, setPriceInput] = useState<Prices>({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
      11: "",
      12: ""
    })

    const [clickedItem, setClickedItem] = useState<Clicked>({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false ,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11:false,
      12:false 
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setPriceInput(prevPrice => {
        return{
            ...prevPrice,
            [e.target.name] : e.target.value
        }
      })
    }

    const handleClick = (e : React.MouseEvent<HTMLElement>) => {
      console.log('clicked')
      const target = e.target as HTMLElement
      const itemNumber = target.getAttribute("id")
      setUpdatingPriceNumber(itemNumber)
      setChangingPrice(!changingPrice)
    }

    const updatePrice = async (e : React.KeyboardEvent<HTMLElement>) => {

      const target = e.currentTarget as HTMLElement
      const itemNumber = (target.getAttribute('name')) as string 

      if(e.key === 'Enter'){
        const contract = createVendingContractInstance(vendingAddress)
        const num = parseInt(itemNumber)
        let priceFormatted 
        if(priceInput[num].indexOf(".") !== -1){
          priceFormatted = parseFloat(priceInput[num].slice(1)) * 100
        }else{
          priceFormatted = parseInt(priceInput[num].slice(1)) * 100 
      }
        try{
          const set = await contract.setPrice(num, priceFormatted)
          await set.wait()
        }catch(e) {
          console.log(e)
        }finally{
          const number : number = (parseInt("0" + itemNumber))
          const finalPrice = (await contract.itemNumberToPrice(number) / 100).toFixed(2)
          setPrice({
            ...price,
            [number] : finalPrice.toString()})
            setUpdatingPriceNumber("")
            setChangingPrice(!changingPrice)
        }
      }
    }

    const fetchPrice = async () => {
      const contract = createVendingContractInstance(vendingAddress);
      const priceData : Prices = {};
      for (let i = 1; i <= 12; i++) {
        priceData[i] = ((await contract.itemNumberToPrice(i)) / 100).toFixed(2);
      }
      setPrice(priceData);
      setUpdatingPriceNumber("")
      setChangingPrice(false)
    };

    console.log(typeof(price[2]))

    console.log(price)

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
      const contract = createVendingContractInstance(vendingAddress)
      console.log(item)
      console.log(itemNumber)
      try{
          const added = await client.add(item)
         
          const add = await contract.addCID(parseInt(itemNumber), added.path)
          await add.wait()

      }catch(error){
          console.log(error)
      }finally{
        fetchItems()
      }
  }

  const fetchItems = async () => {
    const contract : Contract = createVendingContractInstance(vendingAddress)
    const promises = []
    for (let i = 1; i <= 12; i++) {
      promises.push(contract.itemNumberToCID(i))
    }
    const CIDS = await Promise.all(promises)
    setCIDS(CIDS)
  }

  const checkItems = (x : number) => {
    if(CIDS[x] === "" || CIDS[x] === null || CIDS.length === 0){
      return true
    }else {
      return false
    }
  }
  
  console.log(CIDS)

  ///useEffect

  useEffect(() => {
    fetchItems()
    fetchPrice()
  }, [])

  useEffect(() => {
    getIsUserOwner()
  }, [vendingAddress])

  

  return (
        <div className={lightMode ? 'L-Vending-Items' : 'Vending-Items'}>
        

          {currentItemSelected === "1"
          ?
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
              <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>1</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id='1'
              >$
              </div>
            
                {checkItems(0)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                    <input style= {{display: 'none'}} type='file' id='file1' name='1' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[0]}`}/>             
                }
            

            </div>
            {changingPrice && updatingPriceNumber === "1"
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[1]) === 0 ? "0.00" : price[1]}</div>
            }
                
          </div>
          :
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
              <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>1</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id='1'
              >$
              </div>
                {checkItems(0)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                    <input style= {{display: 'none'}} type='file' id='file1' name='1' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' id = '1' onClick={() => setClickedItem({1 : true})} src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[0]}`}/>             
                }
            </div>
            {changingPrice && updatingPriceNumber === "1"
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[1]) === 0 ? "0.00" : price[1]}</div>
            }  
          
          </div>
          }  
          
        

        {currentItemSelected === "2"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
        <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
          <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>2</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '2'
              >$
              </div>
                {checkItems(1)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file2'>
                    <input style= {{display: 'none'}} type='file' id='file2' name='2' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' onClick={() => setClickedItem({2 : true})} src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[1]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "2"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '2' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${price[2] === "" ? "0.00" : price[2]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>2</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '2'
              >$
              </div>
                {checkItems(1)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file2'>
                    <input style= {{display: 'none'}} type='file' id='file2' name='2' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' onClick={() => setClickedItem({2 : true})} src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[1]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "2"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '2' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[2]) === 0 ? "0.00" : price[2]}</div>
            }  
          
          </div>
        }  

        {currentItemSelected === "3"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>3</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '3'
              >$
              </div>
                {checkItems(2)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file3'>
                    <input style= {{display: 'none'}} type='file' id='file3' name='3' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' onClick={() => setClickedItem({3 : true})} src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[2]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "3"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '3' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[3]) === 0 ? "0.00" : price[3]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>3</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '3'
              >$
              </div>
                {checkItems(2)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file3'>
                    <input style= {{display: 'none'}} type='file' id='file3' name='3' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' onClick={() => setClickedItem({3 : true})} src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[2]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "3"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '3' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[3]) === 0 ? "0.00" : price[3]}</div>
            }
        </div>
        }

        {currentItemSelected === "4"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>4</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '4'
              >$
              </div>
              {checkItems(3)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file4'>
                    <input style= {{display: 'none'}} type='file' id='file4' name='4' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[3]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "4"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '4' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[4]) === 0 ? "0.00" : price[4]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>4</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '4'
              >$
              </div>
              {checkItems(3)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file4'>
                    <input style= {{display: 'none'}} type='file' id='file4' name='4' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[3]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "4"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '4' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[4]) === 0 ? "0.00" : price[4]}</div>
            }  
        </div>
        } 


        {currentItemSelected === "5"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>5</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '5'
              >$
              </div>
              {checkItems(4)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file5'>
                    <input style= {{display: 'none'}} type='file' id='file5' name='5' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[4]}`}/>             
                }
          </div>          
            {changingPrice && updatingPriceNumber === "5"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '5' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[5]) === 0 ? "0.00" : price[5]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>5</div> 
            <div 
            className={lightMode ? 'L-Update-Price' : 'Update-Price'}
            onClick={handleClick}
            id= '5'
            >$
            </div>
              {checkItems(4)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file5'>
                    <input style= {{display: 'none'}} type='file' id='file5' name='5' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[4]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "5"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '5' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[5]) === 0 ? "0.00" : price[5]}</div>
            }  
        </div>
        } 

        {currentItemSelected === "6"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>6</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '6'
              >$
              </div>
              {checkItems(5)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file6'>
                    <input style= {{display: 'none'}} type='file' id='file6' name='6' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[5]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "6"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '6' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[6]) === 0 ? "0.00" : price[6]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>6</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '6'
              >$
              </div>
             {checkItems(5)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file6'>
                    <input style= {{display: 'none'}} type='file' id='file6' name='6' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[5]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "6"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '6' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[6]) === 0 ? "0.00" : price[6]}</div>
            }  
        </div>
        } 

        
        {currentItemSelected === "7"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>7</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '7'
              >$
              </div>
                {checkItems(6)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file7'>
                    <input style= {{display: 'none'}} type='file' id='file7' name='7' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[6]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "7"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '7' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[7]) === 0 ? "0.00" : price[7]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>7</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '7'
              >$
              </div>
                {checkItems(6)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file7'>
                    <input style= {{display: 'none'}} type='file' id='file7' name='7' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[6]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "7"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '7' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[7]) === 0 ? "0.00" : price[7]}</div>
            }  
        </div>
        } 

        
        
        {currentItemSelected === "8"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>8</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '8'
              >$
              </div>
                {checkItems(7)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file8'>
                    <input style= {{display: 'none'}} type='file' id='file8' name='8' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[7]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "8"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '8' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[8]) === 0 ? "0.00" : price[8]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>8</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '8'
              >$
              </div>
                {checkItems(7)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file8'>
                    <input style= {{display: 'none'}} type='file' id='file8' name='8' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[7]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "8"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '8' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[8]) === 0 ? "0.00" : price[8]}</div>
            }  
        </div>
        } 

        

        {currentItemSelected === "9"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>9</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '9'
              >$
              </div>
                {checkItems(8)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file9'>
                    <input style= {{display: 'none'}} type='file' id='file9' name='9' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[8]}`}/>             
                } 
          </div>
            {changingPrice && updatingPriceNumber === "9"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '9' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[9]) === 0 ? "0.00" : price[9]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>9</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '9'
              >$
              </div>
                {checkItems(8)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file9'>
                    <input style= {{display: 'none'}} type='file' id='file9' name='9' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[8]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "9"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '9' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[9]) === 0 ? "0.00" : price[9]}</div>
            }  
        </div>
        }


        {currentItemSelected === "10"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>10</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '10'
              >$
              </div>
                {checkItems(9)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file10'>
                    <input style= {{display: 'none'}} type='file' id='file10' name='10' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[9]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "10"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '10' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[10]) === 0 ? "0.00" : price[10]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>10</div>
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '10'
              >$
              </div> 
                {checkItems(9)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file10'>
                    <input style= {{display: 'none'}} type='file' id='file10' name='10' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[9]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "10"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '10' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[10]) === 0 ? "0.00" : price[10]}</div>
            }  
        </div>
        } 

       
        {currentItemSelected === "11"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>11</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '11'
              >$
              </div>
                {checkItems(10)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file11'>
                    <input style= {{display: 'none'}} type='file' id='file11' name='11' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[10]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "11"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '11' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[11]) === 0 ? "0.00" : price[11]}</div>
            }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>11</div>
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '11'
              >$
              </div> 
                {checkItems(10)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file11'>
                    <input style= {{display: 'none'}} type='file' id='file11' name='11' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[10]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "11"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '11' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[11]) === 0 ? "0.00" : price[11]}</div>
            }  
        </div>
        } 

        {currentItemSelected === "12"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>12</div> 
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '12'
              >$
              </div>
                {checkItems(11)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file12'>
                    <input style= {{display: 'none'}} type='file' id='file12' name='12' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[11]}`}/>             
                }
          </div>
          {changingPrice && updatingPriceNumber === "12"
            ?
           
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '12' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>${parseInt(price[12]) === 0 ? "0.00" : price[12]}</div>
          }
                
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>12</div>
              <div 
              className={lightMode ? 'L-Update-Price' : 'Update-Price'}
              onClick={handleClick}
              id= '12'
              >$
              </div> 
                {checkItems(11)
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file12'>
                    <input style= {{display: 'none'}} type='file' id='file12' name='12' onChange={handleItemUpload}></input>
                    {isUserOwner ? "Upload Image" : "No Image"}
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[11]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "12"
            ?
            
            <CurrencyInput 
            className= {lightMode ? 'L-Price-Input' : 'Price-Input' } 
            onKeyDown={updatePrice} 
            name= '12' 
            onChange={handleChange}
            placeholder= "$0.00"
            autoComplete='off'
            prefix='$'
            disableGroupSeparators={true}
            >
            </CurrencyInput>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>${parseInt(price[12]) === 0 ? "0.00" : price[12]}</div>
            }  
        </div>
        }
    </div>
  )
}

export default Items
