import {useContext, useState, useEffect} from 'react'
import VendingContext from '../context/VendingContext'
import { VendingContract } from '../ContractObjects'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'

const ID = process.env.REACT_APP_INFURA_PROJECT_ID
const SECRET = process.env.REACT_APP_INFURA_PROJECT_SECRET

const Items = () => {

    const {currentItemSelected, setCurrentItemSelected, lightMode} = useContext(VendingContext)

    const [CIDS, setCIDS] = useState<any[]>([])

    
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
         
          const add = await VendingContract.addCID(parseInt(itemNumber), added.path)
          await add.wait()

      }catch(error){
          console.log(error)
      }finally{
        window.location.reload();
      }
  }

  const fetchItems = async () => {
    const _CIDS = []
    for(let i = 1; i <= 12; i++){
      const CID = await VendingContract.itemNumberToCID(i)
    _CIDS.push(CID)
    }
    setCIDS(_CIDS)
    
  }

  ///useEffect

  useEffect(() => {
    fetchItems()
  }, [])

  

  return (
        <div className={lightMode ? 'L-Vending-Items' : 'Vending-Items'}>
        

          {currentItemSelected === "1"
          ?
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
              <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>1</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
          </div>
          :
          <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
            <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
              <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>1</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
          </div>
          }  
          
        

        {currentItemSelected === "2"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
        <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
          <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>2</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>2</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
          </div>
        }  

        {currentItemSelected === "3"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>3</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>3</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
        </div>
        }

        {currentItemSelected === "4"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>4</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$2.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>4</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$2.00</div>  
        </div>
        } 


        {currentItemSelected === "5"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>5</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>5</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        {currentItemSelected === "6"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>6</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>6</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        
        {currentItemSelected === "7"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>7</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>7</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        
        
        {currentItemSelected === "8"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>8</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$4.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>8</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$4.00</div>  
        </div>
        } 

        

        {currentItemSelected === "9"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>9</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>9</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        }


        {currentItemSelected === "10"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>10</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>10</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        } 

       
        {currentItemSelected === "11"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>11</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>11</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        } 

        {currentItemSelected === "12"
        ?
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-ItemSelected-Container' : 'ItemSelected-Container'}>
            <div className={lightMode ? 'L-ItemSelected-Number' : 'ItemSelected-Number'}>12</div> 
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
            <div className={lightMode ? 'L-ItemSelected-Price' : 'ItemSelected-Price'}>$6.00</div>
        </div>
        :
        <div className={lightMode ? 'L-Item-Box' : 'Item-Box'}>
          <div className={lightMode ? 'L-Item-Container' : 'Item-Container'}>
            <div className={lightMode ? 'L-Item-Number' : 'Item-Number'}>12</div> 
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
            <div className={lightMode ? 'L-Item-Price' : 'Item-Price'}>$6.00</div>  
        </div>
        }
    </div>
  )
}

export default Items
