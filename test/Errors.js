const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('Error Handling Demo', () => {

    let contract

    beforeEach(async () => {
        // Deploy contract with time settings
        const Contract = await ethers.getContractFactory('Errors1')
        contract = await Contract.deploy()
    })

    it('demonstrates require+emit (event) error handling', async () => {
        await expect(contract.example1(5)).to.be.reverted
        await expect(contract.example1(20)).to.be.fulfilled
    })

    it('demonstrates revert+emit (event) error handling', async () => {
        await expect(contract.example2(5)).to.be.reverted
        await expect(contract.example2(20)).to.be.fulfilled
    })
    
    it('demonstrates assert+emit (event) error handling', async () => {
        await expect(contract.example3(5)).to.be.reverted
        await expect(contract.example3(10)).to.be.fulfilled
    })

    it('demonstrates custom revert+emit (event) error handling', async () => {
        await expect(contract.example4(5)).to.be.reverted
        await expect(contract.example4(20)).to.be.fulfilled
    })
})
