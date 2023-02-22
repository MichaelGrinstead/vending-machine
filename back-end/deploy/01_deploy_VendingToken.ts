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

    const GLToken : Contract = await ethers.getContract("VendingToken")

    await GLToken.connect(user).mintGL(1000)
    console.log(user.address)
 
}   
export default func

func.tags = ["VendingToken"]