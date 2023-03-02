import {useState, useContext} from 'react'
import ConnectWallet from "../components/ConnectWallet"
import {VendingTokenContract, VendingTokenAddress, VendingAddress } from "../ContractObjects"
import VendingContext from '../context/VendingContext'
import { useNavigate } from "react-router-dom"
import { connectionState } from '../context/VendingContext'


const Landing = () => {

    const navigate = useNavigate()

    const {
        connectionStatus,
        lightMode,
        setLightMode
    } = useContext(VendingContext)

    const [enterLoading, setEnterLoading] = useState<boolean>(false)

    const [copyingTokenAddress, setCopyingTokenAddress] = useState<boolean>(false)
    const [copyingNFTAddress, setCopyingNFTAddress] = useState<boolean>(false)

    const [tokenAddressHovered, setTokenAddressHovered] = useState<boolean>(false)
    const [nftAddressHovered, setNftAddressHovered] = useState<boolean>(false)

    const enter = async () => {
        setEnterLoading(true)
        try{
            const mint = await VendingTokenContract.mintGL(10000)
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

            return   <div className={lightMode ? 'L-Landing-Inner' : 'Landing-Inner'}>
                        <h3 style={{marginTop: 0}}>Add these addressess in your wallet and click enter to mint some tokens and use the vending machine</h3>
                        <div className={lightMode ? 'L-Address-Container' : 'Address-Container'}>
                            <h3 style={{marginBottom: "5px", marginTop: "5px"}}>Vending Token</h3>   
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
                        <br></br>
                        <div>
                            <h3>Enter the name and symbol for your vending items</h3>
                            <input
                            className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                            name='name'
                            placeholder='name'
                            ></input>
                            <br></br>
                            <input
                            className={lightMode ? 'L-Landing-Page-Input' : 'Landing-Page-Input'}
                            name= 'symbol'
                            placeholder='symbol'
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
                        onClick={enter}
                        >ENTER
                        </button>
                        }
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
        navigator.clipboard.writeText(VendingAddress)
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


            <h1 className='L-Landing-Display-Text'>Welcome to my Vending machine</h1>
        </div>
        :
        <div className={connectionStatus === connectionState.UNCONNECTED || connectionStatus === connectionState.NO_WALLET
            ?   
            'Landing-Display-First'
            :
            'Landing-Display-Second'
            }>


            <h1 className='Landing-Display-Text'>Welcome to my Vending machine</h1>
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