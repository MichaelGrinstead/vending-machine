import {useContext, useState, useEffect} from 'react'
import VendingContext from '../context/VendingContext'
import { Contract } from 'ethers'
import {signer } from '../ContractObjects'
import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import CurrencyInput from 'react-currency-input-field';
import Item from './Item'

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

    ////// using to enlarge image 

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

    const fetchPrice = async (address : string) => {
      const contract = createVendingContractInstance(address);
      const priceData : Prices = {};
      const promises = []

      for (let i =1; i <= 12; i++){
        promises.push(contract.itemNumberToPrice(i))
      }

      const prices = await Promise.all(promises);

      for (let i = 1; i <= 12; i++) {
        priceData[i] = (prices[i-1] / 100).toFixed(2);
      }
      setPrice(priceData);
      setUpdatingPriceNumber("")
      setChangingPrice(false)
    };

    

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
      const itemNumber = parseInt(e.target.id.split('-')[1])
      console.log(itemNumber)
      const contract = createVendingContractInstance(vendingAddress)
      console.log(item)
      try{
          const added = await client.add(item)
         
          const add = await contract.addCID(itemNumber, added.path)
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

  const item = () => {
    const itemsArray = []
    for(let i = 0; i < 12; i++){
      itemsArray.push(
          <Item
            handleClick={handleClick}
            handleChange={handleChange}
            updatePrice={updatePrice}
            handleItemUpload={handleItemUpload}
            checkItems={checkItems(i)}
            changingPrice={changingPrice}
            updatingPriceNumber={updatingPriceNumber}
            price={price}
            setClickedItem={setClickedItem}
            itemNumber={i + 1}
            />
      )
    }
    console.log(itemsArray)
    return itemsArray
  }

  console.log(price)
  
  console.log(CIDS)

  ///useEffect

  useEffect(() => {
    fetchItems()
    fetchPrice(vendingAddress)
  }, [vendingAddress])

  useEffect(() => {
    getIsUserOwner()
  }, [vendingAddress])

  ///currentItemSelected, handleClick, checkItems(), itemNumber

  console.log(item)

  return (
        <div className={lightMode ? 'L-Vending-Items' : 'Vending-Items'}>
          {item()}

    </div>
  )
}

export default Items
