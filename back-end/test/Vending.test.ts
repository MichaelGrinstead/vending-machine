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

    it("should refund the correct amount if tokenId is between 1 and 4", async () => {
        await Vending.purchase(buyer.address, 2, 250)
        expect(await GLToken.balanceOf(Vending.address)).to.equal(200)
        expect(await GLToken.balanceOf(buyer.address)).to.equal(800)
    })

    it("should refund the correct amount if tokenId is between 5 and 8", async () => {
        await Vending.purchase(buyer.address, 7, 450)
        expect(await GLToken.balanceOf(Vending.address)).to.equal(400)
        expect(await GLToken.balanceOf(buyer.address)).to.equal(600)
    })

    it("should refund the correct amount if tokenId is between 9 and 12", async () => {
        await Vending.purchase(buyer.address, 11, 650)
        expect(await GLToken.balanceOf(Vending.address)).to.equal(600)
        expect(await GLToken.balanceOf(buyer.address)).to.equal(400)
    })



})
