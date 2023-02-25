import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts, getChainId} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const [user] = await ethers.getSigners()

    // const VendingToken : Contract = await ethers.getContract("VendingToken")

    await deploy("Vending", {
        from: deployer,
        args: ['0x961c835b6D4713F390a01B0358059C84c9b5773F'],
        log: true
        
    })

    // const Vending = await ethers.getContract("Vending")

    // await VendingToken.approve(Vending.address, 1000)
    // console.log(Vending.address)
 
}   
export default func

func.tags = ["Vending"]