import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts, getChainId} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const GLToken : Contract = await ethers.getContract("GLToken")

    await deploy("Vending", {
        from: deployer,
        args: [GLToken.address],
        log: true
        
    })
 
}   
export default func

func.tags = ["Vending"]