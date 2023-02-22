import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts, getChainId} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const [user] = await ethers.getSigners()

    const GLToken : Contract = await ethers.getContract("VendingToken")

    await deploy("Vending", {
        from: deployer,
        args: [GLToken.address],
        log: true
        
    })

    const Vending = await ethers.getContract("Vending")

    await GLToken.approve(Vending.address, 1000)
    console.log(Vending.address)
 
}   
export default func

func.tags = ["Vending"]