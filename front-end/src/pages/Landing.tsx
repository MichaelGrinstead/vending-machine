import {useState, useContext} from 'react'
import ConnectWallet from "../components/ConnectWallet"
import { GLTokenContract, GLTokenAddress, VendingAddress } from "../ContractObjects"
import VendingContext from '../context/VendingContext'
import { useNavigate } from "react-router-dom"
import { connectionState } from '../context/VendingContext'


const Landing = () => {

    const navigate = useNavigate()

    const {connectionStatus} = useContext(VendingContext)

    const [enterLoading, setEnterLoading] = useState<boolean>(false)

    const enter = async () => {
        setEnterLoading(true)
        try{
            const mint = await GLTokenContract.mintGL(10000)
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

    console.log(connectionStatus)

  return (
    <div style={{height: "100%", width: "100%"}}>
        <div className='Landing-Inner'>
            <h1 className='Heading-Text'>Welcome to the Go Logic NFT Vending Machine</h1>
            <h1 className='Heading-Text'>Please connect your wallet</h1>
            <br></br>
            {connected()}
            <br></br>
            <br></br>
            <h1 className='Heading-Text'>Once Connected import GL Token with this address</h1>
            <br></br>
            <h1 className='Heading-Text'>{GLTokenAddress}</h1>
            <br></br>
            <h1 className='Heading-Text'>And GL NFT with this Address</h1>
            <br></br>
            <h1 className='Heading-Text'>{VendingAddress}</h1>
            <br></br>
            <h1 className="Heading-Text">And finally click Enter to mint some GL Token and use the Vending Machine</h1>
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