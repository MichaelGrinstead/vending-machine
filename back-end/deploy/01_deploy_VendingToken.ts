import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts, getChainId} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const [user] = await ethers.getSigners()

    await deploy("VendingToken", {
        from: deployer,
        log: true
    })

    const VendingToken : Contract = await ethers.getContract("VendingToken")

    await VendingToken.connect(user).mintVendingToken(1000)
    console.log(user.address)
 
}   
export default func

func.tags = ["VendingToken"]