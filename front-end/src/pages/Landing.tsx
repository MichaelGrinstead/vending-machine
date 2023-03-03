import {useState, useContext} from 'react'
import ConnectWallet from "../components/ConnectWallet"
import {VendingFactoryContract, VendingTokenContract, VendingTokenAddress } from "../ContractObjects"
import VendingContext from '../context/VendingContext'
import { useNavigate } from "react-router-dom"
import { connectionState } from '../context/VendingContext'


const Landing = () => {

    const navigate = useNavigate()

    const {
        connectionStatus,
        lightMode,
        setLightMode,
        vendingAddress
    } = useContext(VendingContext)

    const [enterLoading, setEnterLoading] = useState<boolean>(false)
    const [mintLoading, setMintLoading] = useState<boolean>(false)

    const [copyingTokenAddress, setCopyingTokenAddress] = useState<boolean>(false)
    const [copyingNFTAddress, setCopyingNFTAddress] = useState<boolean>(false)

    const [tokenAddressHovered, setTokenAddressHovered] = useState<boolean>(false)
    const [nftAddressHovered, setNftAddressHovered] = useState<boolean>(false)

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

    const create = async () => {
        try{
            const create = await VendingFactoryContract.createVending(VendingTokenAddress, formData.name, formData.symbol)
            await create.wait()
        }catch(e){
            console.log(e)
        }finally{
            enter()
        }
    }

    const enter = async () => {
        setEnterLoading(true)
        try{
            const mint = await VendingTokenContract.mintVendingToken(10000)
           
            await mint.wait()
            
        }catch(e){
            console.log(e)
            navigate('/')
        }finally{
            navigate("/Vending")
            setEnterLoading(false)
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
                    <div className={lightMode ? 'L-Landing-Inner-Container' : 'Landing-Inner-Container'}>
                        <h3 style={{marginTop: "5px"}}>Add the Vending Token Address to your Wallet and click Mint</h3>
                        <div className={lightMode ? 'L-Address-Container' : 'Address-Container'}>
                            <h3 style={{marginBottom: "0", marginTop: "0"}}>Vending Token</h3>   
                            <h1 
                            className={lightMode ? 'L-Address' : 'Address'} 
                            onClick={() => copyTokenAddress()}
                            onMouseOver={() => setTokenAddressHovered(true)}
                            onMouseOut={() => setTokenAddressHovered(false)}
                            >{VendingTokenAddress}
                            </h1>
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
                        onClick={enter}
                        ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
                        </button>
                        :
                        <button 
                        className={lightMode ? "L-Enter" : 'Enter'}
                        style={{marginTop: "10px"}}
                        onClick={create}
                        >MINT
                        </button>
                        }
                    </div>    
                        <br></br>

                    <div className={lightMode ? 'L-Landing-Inner-Container' : 'Landing-Inner-Container'}>    
                        <div>
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
                        {/* <div className={lightMode ? 'L-Address-Container' : 'Address-Container'}>
                            <h3 style={{marginBottom: "5px", marginTop: "5px"}}>Vending Item</h3>
                            <h1 
                            className={lightMode ? 'L-Address' : 'Address'}
                            onClick={() => copyNFTAddress()}
                            onMouseOver={() => setNftAddressHovered(true)}
                            onMouseOut={() => setNftAddressHovered(false)}
                            >{VendingAddress}
                            </h1>
                            {nftAddressHovered
                            ?  
                            <h5 
                            className={lightMode ? 'L-Copied-Alert' : 'Copied-Alert'}>Copy to clipboard</h5> 
                            :
                            copyingNFTAddress
                            ?
                            <h5 className={lightMode ? 'L-Copied-Alert' : 'Copied-Alert'} style={{width: "70px"}}>Copied!</h5> 
                            :
                            <h5 className= {lightMode ? 'L-Copied-Alert' : 'Copied-Alert'} style={{margin: 0}}></h5>
                            }
                        </div> */}
                        <br></br>
                        {enterLoading
                        ?
                        <button 
                        className={lightMode ? "L-Enter" : 'Enter'}
                        onClick={enter}
                        ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
                        </button>
                        :
                        <button 
                        className={lightMode ? "L-Enter" : 'Enter'}
                        onClick={create}
                        >ENTER
                        </button>
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

    const copyNFTAddress = () => {
        setNftAddressHovered(false)
        setCopyingNFTAddress(true)
        navigator.clipboard.writeText(vendingAddress)
        setTimeout(() => setCopyingNFTAddress(false), 1000)
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