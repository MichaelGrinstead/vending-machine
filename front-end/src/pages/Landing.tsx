import {useState, useContext} from 'react'
import ConnectWallet from "../components/ConnectWallet"
import {VendingFactoryContract, VendingTokenContract, VendingTokenAddress } from "../ContractObjects"
import VendingContext from '../context/VendingContext'
import { useNavigate } from "react-router-dom"
import { connectionState } from '../context/VendingContext'


const Landing = () => {

    const navigate = useNavigate()

/*****************************************************************************************************
 ****************************************Context****************************************************** 
******************************************************************************************************/    

    const {
        connectionStatus,
        lightMode,
        setLightMode,
        setVendingAddress,
        vendingAddress,
        getNewVendingContractAddress
    } = useContext(VendingContext)

/*****************************************************************************************************
 *****************************************State******************************************************* 
******************************************************************************************************/       

    const [createLoading, setCreateLoading] = useState<boolean>(false)
    const [mintLoading, setMintLoading] = useState<boolean>(false)

    const [copyingTokenAddress, setCopyingTokenAddress] = useState<boolean>(false)
    const [tokenAddressHovered, setTokenAddressHovered] = useState<boolean>(false)
   
    const[mintTokens, setMintTokens] = useState<boolean>(false)
    const[createNFT, setCreateNFT] = useState<boolean>(false)
    const[search, setSearch] = useState<boolean>(false)

    const [createData, setCreateData] = useState({
        name: "",
        symbol: ""
    })

    const [searchData, setSearchData] = useState("")



    

    console.log(createData)

/*****************************************************************************************************
*****************************************Event Handlers*************************************************
******************************************************************************************************/ 

    const handleCreateInput= (e : React.ChangeEvent<HTMLInputElement>) => {
        setCreateData(prevCreateData => {
            return{
                ...prevCreateData,
                [e.target.name] : e.target.value
            }
        })
    }

    
    const handleSearchInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value)
    }

    const copyTokenAddress = () => {
        setTokenAddressHovered(false)
        setCopyingTokenAddress(true)
        navigator.clipboard.writeText(VendingTokenAddress)
        setTimeout(() => setCopyingTokenAddress(false), 1000)
    }

/*****************************************************************************************************
*****************************************User Actions*************************************************
******************************************************************************************************/ 

    const create = async () => {
        setCreateLoading(true)
        try{
            const create = await VendingFactoryContract.createVending(VendingTokenAddress, createData.name, createData.symbol)
            await create.wait()
            
        }catch(e){
            console.log(e)
        }finally{
            setCreateLoading(false)
            getNewVendingContractAddress()
            navigate("/Vending")
        }
    }

    const mint = async () => {
        setMintLoading(true)
        try{
            const mint = await VendingTokenContract.mintVendingToken(10000)
           
            await mint.wait()
            
        }catch(e){
            console.log(e)
            navigate('/')
        }finally{
            setMintLoading(false)
            
        }
    }

    console.log(searchData)

    const searchName = async () => {
        const address = await VendingFactoryContract.nameToVendingAddress(searchData)
        console.log(address)
        const registered : boolean = await VendingFactoryContract.nameToRegistered(searchData)
        console.log(registered)
        if(registered === true){
            console.log('working')
            console.log(address)
            setVendingAddress(address) 
            navigate("/Vending") 
        }else{
            console.log("address already exists")
            ///link to error component
        }
    }

    console.log(vendingAddress)

/*****************************************************************************************************
 *****************************************Conditional HTML********************************************
******************************************************************************************************/ 

    const connected = () => {
        if(connectionStatus === connectionState.UNCONNECTED){
            return  <ConnectWallet/>
        }else if(connectionStatus === connectionState.NO_WALLET){
            return  <button 
                    className={lightMode ? "L-Connect" : 'Connect'}
                    onClick={() => { window.location.href =' https://metamask.io/download/'}} 
                    >Please Install Metamask
                    </button>
        }else if(connectionStatus === connectionState.INCORRECT_NETWORK){

            return   <div className={lightMode ? 'L-Landing-Inner' : 'Landing-Inner'}>
                        <h2 className='HeaderText'>Please switch to the Mumbai Network</h2>
                        <h3 className='HeaderText'>Network Name: Mumbai Testnet</h3>
                        <h3 className='HeaderText'>RPC URL: https://rpc-mumbai.maticvigil.com/</h3>
                        <h3 className='HeaderText'>Chain Id: 80001</h3>
                        <h3 className='HeaderText'>Currency Symbol: MATIC</h3>
                    </div>

        
        }else if(connectionStatus === connectionState.CONNECTED){

            return  <div className={lightMode ? 'L-Landing-Inner' : 'Landing-Inner'}>
                        <div style={{width: "30%"}}>
                            {mintTokens
                            ?
                            <></>
                            :
                            <button 
                            className={lightMode ? "L-Mint-Tokens" : 'Mint-Tokens'}
                            onClick= {() => setMintTokens(!mintTokens)}
                            >Mint $Tokens
                            </button>
                            }
                            {mintTokens 
                            ?
                                <div className={lightMode ? 'L-Landing-Inner-Container-Left' : 'Landing-Inner-Container-Left'}>
                                <h3 className='Exit-X' onClick={() => setMintTokens(!mintTokens)}>X</h3>
                                <h3 style={{marginTop: "5px"}}>Add the Vending Token Address to your Wallet and click Mint</h3>
                                <div className={lightMode ? 'L-Address-Container' : 'Address-Container'}>
                                    <h3 style={{marginBottom: "10px", marginTop: "0"}}>Address</h3>   
                                    <h3 
                                    className={lightMode ? 'L-Address' : 'Address'} 
                                    onClick={() => copyTokenAddress()}
                                    style={{fontSize: "15px", width: "90%"}}
                                    onMouseOver={() => setTokenAddressHovered(true)}
                                    onMouseOut={() => setTokenAddressHovered(false)}
                                    >{VendingTokenAddress}
                                    </h3>
                                    {tokenAddressHovered
                                    ?  
                                    <h5 className={lightMode ? 'L-Copied-Alert' : 'Copied-Alert'}>Copy to clipboard</h5> 
                                    :
                                    copyingTokenAddress
                                    ?
                                    <h5 className={lightMode ? 'L-Copied-Alert' : 'Copied-Alert'} style={{width: "70px"}}>Copied!</h5> 
                                    :
                                    <h5 className= {lightMode ? 'L-Copied-Alert' : 'Copied-Alert'} style={{margin: 0}}></h5>
                                    }      
                                </div>
                                <br></br>
                                {mintLoading
                                ?
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                style={{marginTop: "10px"}}
                                ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
                                </button>
                                :
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                style={{marginTop: "10px"}}
                                onClick={mint}
                                >MINT
                                </button>
                                }
                            </div>
                            :
                            <></>
                            }    
                        </div>

                        <div style={{width: "30%"}}>
                            {createNFT
                            ?
                            <></>
                            :
                            <button 
                            className={lightMode ? "L-Create-NFT" : 'Create-NFT'}
                            onClick= {() => setCreateNFT(!createNFT)}
                            >Create NFT Contract
                            </button>
                            }   
                            {createNFT
                            ?
                            <div className={lightMode ? 'L-Landing-Inner-Container-Middle' : 'Landing-Inner-Container-Middle'}>    
                                <div>
                                    <h3 className='Exit-X' onClick={() => setCreateNFT(!createNFT)}>X</h3>
                                    <h3 style={{marginTop: "5px", marginBottom: "25px"}}>Enter the name and symbol for your vending items and click create</h3>
                                    <input
                                    className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                                    name='name'
                                    onChange={handleCreateInput}
                                    placeholder='name'
                                    autoComplete='off'
                                    ></input>
                                    <br></br>
                                
                                    <input
                                    className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                                    style={{marginTop: "10px", marginBottom: "30px"}}
                                    name= 'symbol'
                                    onChange={handleCreateInput}
                                    placeholder='symbol'
                                    autoComplete='off'
                                    ></input>

                                </div>
                                
                                {createLoading
                                ?
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
                                </button>
                                :
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                onClick={create}
                                >CREATE
                                </button>
                                }
                            </div>
                            :
                            <></>
                            }
                        </div>

                        <div style={{width: "30%"}}>
                            {search
                            ?
                            <></>
                            :
                            <button 
                            className={lightMode ? "L-Search-Collection" : 'Search-Collection'}
                            onClick= {() => setSearch(!search)}
                            >Search Collection
                            </button>
                            }
                            {search
                            ?
                            <div className={lightMode ? 'L-Landing-Inner-Container-Right' : 'Landing-Inner-Container-Right'}>    
                              
                                <h3 className='Exit-X' onClick={() => setSearch(!search)}>X</h3>
                                <h3 style={{marginBottom: "0"}}>Search for Collection by</h3>
                                <h3 style={{marginTop: "0", marginBottom: "45px"}}>Token Name</h3>        
                                <input 
                                className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                                onChange={handleSearchInput}
                                style={{marginBottom: "28px"}}
                                placeholder='name'
                                ></input>                               
                                <br></br>
                                <br></br>

                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                onClick={searchName}
                                >SEARCH
                                </button>
                                
                            </div>
                            :
                            <></>
                            }
                        </div>
                    </div>
                    
        }
    }

    

    console.log(connectionStatus)


  return (
    <div className={lightMode ? 'L-Landing' : 'Landing'}>
        {lightMode
        ?
        <div className={connectionStatus === connectionState.UNCONNECTED || connectionStatus === connectionState.NO_WALLET
            ?   
            'L-Landing-Display-First'
            :
            'L-Landing-Display-Second'
            }>


            <h1 className='L-Landing-Display-Text'>Welcome to the NFT Vending machine</h1>
        </div>
        :
        <div className={connectionStatus === connectionState.UNCONNECTED || connectionStatus === connectionState.NO_WALLET
            ?   
            'Landing-Display-First'
            :
            'Landing-Display-Second'
            }>


            <h1 className='Landing-Display-Text'>Welcome to the NFT Vending machine</h1>
        </div>
        }
        
        
        
        {connected()}

        {lightMode
        ?
        <button className='L-Switch-Theme' onClick={() => {setLightMode(false)}} >Dark</button>
        :
        <button className='Switch-Theme' onClick={() => {setLightMode(true)}}>Light</button>
        }

    </div>
  )
}

export default Landing