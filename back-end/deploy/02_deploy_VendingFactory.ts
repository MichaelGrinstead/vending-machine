import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts, getChainId} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const [user] = await ethers.getSigners()

    const VendingToken : Contract = await ethers.getContract("VendingToken")

    await deploy("VendingFactory", {
        from: deployer,
        log: true
        
    })

    const VendingFactory = await ethers.getContract("VendingFactory")

 
}   
export default func

func.tags = ["VendingFactory"]