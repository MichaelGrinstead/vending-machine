import {useState, useContext} from 'react'
import ConnectWallet from "../components/ConnectWallet"
import CopiedAlert from '../components/CopiedAlert'
import {VendingTokenContract, VendingTokenAddress, VendingAddress } from "../ContractObjects"
import VendingContext from '../context/VendingContext'
import { useNavigate } from "react-router-dom"
import { connectionState } from '../context/VendingContext'


const Landing = () => {

    const navigate = useNavigate()

    const {connectionStatus} = useContext(VendingContext)

    const [enterLoading, setEnterLoading] = useState<boolean>(false)

    const [copyingTokenAddress, setCopyingTokenAddress] = useState<boolean>(false)

    const [copyingNFTAddress, setCopyingNFTAddress] = useState<boolean>(false)

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
                    className="Connect"
                    >Please Install Metamask
                    </button>
        }else if(connectionStatus === connectionState.CONNECTED){
            return  <button 
                    className="Connect"
                    >YOU ARE CONNECTED
                    </button>
        }
    }

    const copyTokenAddress = () => {
        setCopyingTokenAddress(true)
        navigator.clipboard.writeText(VendingTokenAddress)
        setTimeout(() => setCopyingTokenAddress(true), 1000)
    }

    const copyNFTAddress = () => {
        setCopyingNFTAddress(true)
        navigator.clipboard.writeText(VendingAddress)
        setTimeout(() => setCopyingNFTAddress(false), 1000)
    }

    console.log(connectionStatus)

  return (
    <div style={{height: "100%", width: "100%"}}>
        <div className='Landing-Inner'>
            <h1 className='Heading-Text'>Welcome to my Vending Machine</h1>
            <h1 className='Heading-Text'>Please connect your wallet</h1>
            {connected()}
            <br></br>
            <br></br>
            <h1 className='Heading-Text'>Once Connected import some Vending tokens with this address</h1>
            <br></br>
            <div className='Address-Container'>
                <h1 className='Heading-Text'>{VendingTokenAddress}</h1>
                {!copyingTokenAddress
                ?
                    <button className= 'Copy-Button' onClick={() => copyTokenAddress()}>copy</button>
                :    
                    <CopiedAlert/>
                }
                
            </div>
            <br></br>
            <h1 className='Heading-Text'>And Vending Items with this Address</h1>
            <br></br>
            <div className='Address-Container'>
                <h1 className='Heading-Text'>{VendingAddress}</h1>
                {!copyingNFTAddress
                ?
                    <button className= 'Copy-Button' onClick={() => copyNFTAddress()}>copy</button>
                :    
                    <CopiedAlert/>
                }
                
            </div>
            <br></br>
            <h1 className="Heading-Text">Click Enter to mint some Vending Tokens and start using the Vending Machine</h1>
            <br></br>
            {enterLoading
            ?
            <button 
            className="Enter"
            onClick={enter}
            ><div className="Loader" style={{marginLeft: "auto", marginRight: "auto"}}></div>
            </button>
            :
            <button 
            className="Enter"
            onClick={enter}
            >ENTER
            </button>
            }
            

            
            
        </div>
        
    </div>
  )
}

export default Landing