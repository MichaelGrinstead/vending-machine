import {useContext, useState, useEffect} from 'react'
import VendingContext from '../context/VendingContext'
import { Contract } from 'ethers'
import { VendingFactoryContract, signer } from '../ContractObjects'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'

const ID = process.env.REACT_APP_INFURA_PROJECT_ID
const SECRET = process.env.REACT_APP_INFURA_PROJECT_SECRET

const Items = () => {

    const {currentItemSelected,
       setCurrentItemSelected,
        lightMode,
        vendingAddress,
        createVendingContractInstance,
        images
      } = useContext(VendingContext)

    const [CIDS, setCIDS] = useState<any[]>([])
    const [changingPrice, setChangingPrice] = useState<boolean>(false)
    const [updatingPriceNumber, setUpdatingPriceNumber] = useState<string | null>("")
    const [isUserOwner, setIsUserOwner] = useState<boolean>(false)

    const [price, setPrice] = useState({
      1: "",
      2: ""

    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setPrice(prevPrice => {
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

      const target = e.target as HTMLElement
      const itemNumber = target.getAttribute('name')

      if(e.key === 'Enter'){
        console.log(`enter clicked for item${itemNumber}`)
        console.log(price[1])

        const contract = createVendingContractInstance(vendingAddress)
        const number = parseInt("0" + itemNumber)
        console.log(number)
        try{
          const set = await contract.setPrice(parseInt( "0" + itemNumber), 1)
          await set.wait()
        }catch(e) {
          console.log(e)
        }finally{
          console.log(`price is now ${await contract.itemNumberToPrice(1)}`)
        }

      }
      
    }

    console.log(updatingPriceNumber)

    
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
  

  console.log(CIDS)

  const getIsUserOwner = async () => {
    const contract : Contract = createVendingContractInstance(vendingAddress)
    const owner = await contract.owner()
    const user = await signer.getAddress()
    if(owner === user){
      setIsUserOwner(true)
    } 
  }

  console.log(isUserOwner)

  ///useEffect

  useEffect(() => {
    fetchItems()
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
            
                {(CIDS[0] === "") 
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                    <input style= {{display: 'none'}} type='file' id='file1' name='1' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[0]}`}/>             
                }
            

            </div>
            {changingPrice && updatingPriceNumber === "1"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '1' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[0] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file1'>
                    <input style= {{display: 'none'}} type='file' id='file1' name='1' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[0]}`}/>             
                }
            </div>
            {changingPrice && updatingPriceNumber === "1"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '1' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[1] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file2'>
                    <input style= {{display: 'none'}} type='file' id='file2' name='2' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[1]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "2"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '2' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[1] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file2'>
                    <input style= {{display: 'none'}} type='file' id='file2' name='2' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[1]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "2"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '2' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[2] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file3'>
                    <input style= {{display: 'none'}} type='file' id='file3' name='3' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[2]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "3"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '3' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[2] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file3'>
                    <input style= {{display: 'none'}} type='file' id='file3' name='3' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[2]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "3"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '3' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
              {CIDS[3] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file4'>
                    <input style= {{display: 'none'}} type='file' id='file4' name='4' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[3]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "4"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '4' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
              {CIDS[3] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file4'>
                    <input style= {{display: 'none'}} type='file' id='file4' name='4' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[3]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "4"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '4' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
              {CIDS[4] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file5'>
                    <input style= {{display: 'none'}} type='file' id='file5' name='5' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[4]}`}/>             
                }
          </div>          
            {changingPrice && updatingPriceNumber === "5"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '5' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
              {CIDS[4] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file5'>
                    <input style= {{display: 'none'}} type='file' id='file5' name='5' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[4]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "5"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '5' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
              {CIDS[5] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file6'>
                    <input style= {{display: 'none'}} type='file' id='file6' name='6' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[5]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "6"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '6' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
             {CIDS[5] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file6'>
                    <input style= {{display: 'none'}} type='file' id='file6' name='6' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[5]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "6"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '6' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[6] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file7'>
                    <input style= {{display: 'none'}} type='file' id='file7' name='7' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[6]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "7"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '7' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[6] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file7'>
                    <input style= {{display: 'none'}} type='file' id='file7' name='7' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[6]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "7"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '7' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[7] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file8'>
                    <input style= {{display: 'none'}} type='file' id='file8' name='8' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[7]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "8"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '8' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[7] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file8'>
                    <input style= {{display: 'none'}} type='file' id='file8' name='8' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[7]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "8"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '8' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[8] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file9'>
                    <input style= {{display: 'none'}} type='file' id='file9' name='9' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[8]}`}/>             
                } 
          </div>
            {changingPrice && updatingPriceNumber === "9"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '9' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[8] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file9'>
                    <input style= {{display: 'none'}} type='file' id='file9' name='9' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[8]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "9"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '9' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[9] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file10'>
                    <input style= {{display: 'none'}} type='file' id='file10' name='10' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[9]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "10"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '10' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[9] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file10'>
                    <input style= {{display: 'none'}} type='file' id='file10' name='10' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[9]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "10"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '10' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[10] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file11'>
                    <input style= {{display: 'none'}} type='file' id='file11' name='11' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[10]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "11"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '11' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[10] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file11'>
                    <input style= {{display: 'none'}} type='file' id='file11' name='11' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[10]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "11"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '11' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
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
                {CIDS[11] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file12'>
                    <input style= {{display: 'none'}} type='file' id='file12' name='12' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[11]}`}/>             
                }
          </div>
          {changingPrice && updatingPriceNumber === "12"
            ?
           
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '12' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$$</div>
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
                {CIDS[11] === ""
                ?
                  <label className={lightMode ? 'L-Item-Upload-Label' : 'Item-Upload-Label'} htmlFor='file12'>
                    <input style= {{display: 'none'}} type='file' id='file12' name='12' onChange={handleItemUpload}></input>
                    Upload Image
                  </label>
                :
                <img className= 'Item' src = {`https://personal-project-storage.infura-ipfs.io/ipfs/${CIDS[11]}`}/>             
                }
          </div>
            {changingPrice && updatingPriceNumber === "12"
            ?
            
            <input className= {lightMode ? 'L-Price-Input' : 'Price-Input' } onKeyDown={updatePrice} name= '12' onChange={handleChange}></input>
            
            :
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$$</div>
            }  
        </div>
        }
    </div>
  )
}

export default Items
