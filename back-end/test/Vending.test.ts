import {ethers}  from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers"
import { expect } from "chai";



describe("Using the vending machine", () => {

    let GLToken : Contract
    let Vending : Contract

    let buyer : SignerWithAddress

    beforeEach(async () => {

        [buyer] = await ethers.getSigners()

        const GLTokenFactory = await ethers.getContractFactory("GLToken")
        const VendingFactory = await ethers.getContractFactory("Vending")

        GLToken = await GLTokenFactory.deploy()
        Vending = await VendingFactory.deploy(GLToken.address)

        await GLToken.mintGL(1000)
        await GLToken.approve(Vending.address, 1000)
    })

    it("buyer should have 1000 tokens", async () => {
        const balance = await GLToken.balanceOf(buyer.address)
        expect(balance).to.equal(1000)
    })

    it("should deduct 1 from the itemTierOneAmount if between 1 and 4", async () => {
        await Vending.purchase(buyer.address, 3, 200) 
        expect(await Vending.itemTierOneAmount()).to.equal(19)
    })

    it("should deduct 1 from the itemTierTwoAmount if between 5 and 8", async () => {
        await Vending.purchase(buyer.address, 6, 400) 
        expect(await Vending.itemTierTwoAmount()).to.equal(19)
    })

    it("should deduct 1 from the itemTierThreeAmount if between 9 and 12", async () => {
        await Vending.purchase(buyer.address, 10, 600) 
        expect(await Vending.itemTierThreeAmount()).to.equal(19)
    })

    it("buyer should become the owner of an NFT", async () => {
        await Vending.purchase(buyer.address, 10, 600)
        expect(await Vending.ownerOf(1)).to.equal(buyer.address)
    })



})
