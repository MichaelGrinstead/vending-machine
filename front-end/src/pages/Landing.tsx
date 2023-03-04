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
        vendingAddress
    } = useContext(VendingContext)

/*****************************************************************************************************
 *****************************************State******************************************************* 
******************************************************************************************************/       

    const [enterLoading, setEnterLoading] = useState<boolean>(false)
    const [mintLoading, setMintLoading] = useState<boolean>(false)

    const [copyingTokenAddress, setCopyingTokenAddress] = useState<boolean>(false)
    const [copyingNFTAddress, setCopyingNFTAddress] = useState<boolean>(false)

    const [tokenAddressHovered, setTokenAddressHovered] = useState<boolean>(false)
    const [nftAddressHovered, setNftAddressHovered] = useState<boolean>(false)

    const[mintTokens, setMintTokens] = useState<boolean>(false)
    const[createNFT, setCreateNFT] = useState<boolean>(false)
    const[search, setSearch] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: "",
        symbol: ""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [e.target.name] : e.target.value
            }


        })
    }

    const enter = async () => {
        setEnterLoading(true)
        try{
            const create = await VendingFactoryContract.createVending(VendingTokenAddress, formData.name, formData.symbol)
            await create.wait()
            
        }catch(e){
            console.log(e)
        }finally{
            setEnterLoading(false)
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
                                    <h3 style={{marginBottom: "0", marginTop: "0"}}>Vending Token</h3>   
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
                                    <h3 style={{marginTop: "5px"}}>Enter the name and symbol for your vending items and click enter to launch an NFT contract and begin vending</h3>
                                    <input
                                    className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                                    name='name'
                                    onChange={handleChange}
                                    placeholder='name'
                                    autoComplete='off'
                                    ></input>
                                    <br></br>

                                    <input
                                    className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                                    name= 'symbol'
                                    onChange={handleChange}
                                    placeholder='symbol'
                                    autoComplete='off'
                                    ></input>

                                </div>
                                <br></br>
                                {enterLoading
                                ?
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
                                </button>
                                :
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                onClick={enter}
                                >ENTER
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
                                <h3 style={{marginTop: "5px"}}>Search for Collection by Token name</h3>
                                        
                                <input 
                                className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                                placeholder='name'
                                ></input>
                                
                                <br></br>
                                <br></br>
                                {enterLoading
                                ?
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
                                </button>
                                :
                                <button 
                                className={lightMode ? "L-Enter" : 'Enter'}
                                onClick={enter}
                                >SEARCH
                                </button>
                                }
                            </div>
                            :
                            <></>
                            }
                        </div>
                    </div>
                    
        }
        
        
        
        
    }

    const copyTokenAddress = () => {
        setTokenAddressHovered(false)
        setCopyingTokenAddress(true)
        navigator.clipboard.writeText(VendingTokenAddress)
        setTimeout(() => setCopyingTokenAddress(false), 1000)
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