const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Loops', () => {

  describe('Example 1', () => {

    it('demonstrates a for loop', async () => {
      const Contract = await ethers.getContractFactory('Loops1')
      let contract = await Contract.deploy()
      expect(await contract.countEvenNumbers()).to.equal(5)
    })
  })

  describe('Example 2', () => {

    let contract
    let fnLogNumbers
    let fnReverseLog

    beforeEach(async () => {
      const Contract = await ethers.getContractFactory('Loops2')
      contract = await Contract.deploy()
      fnLogNumbers = await contract.logNumbers()
      fnReverseLog = await contract.reverseLog()
      let result = await fnLogNumbers.wait()
    })

    it('demonstrates while loop w event', async () => {
      await expect(fnLogNumbers).to.emit(contract, 'LogNumber')
        .withArgs('1')
      await expect(fnLogNumbers).to.emit(contract, 'LogNumber')
        .withArgs('2')
      await expect(fnLogNumbers).to.emit(contract, 'LogNumber')
        .withArgs('3')
      await expect(fnLogNumbers).to.emit(contract, 'LogNumber')
        .withArgs('4')
    })

    it('demonstrates descending for loop w event', async () => {
      await expect(fnReverseLog).to.emit(contract, 'LogNumber')
        .withArgs('5')
      await expect(fnReverseLog).to.emit(contract, 'LogNumber')
        .withArgs('4')
      await expect(fnReverseLog).to.emit(contract, 'LogNumber')
        .withArgs('3')
      await expect(fnReverseLog).to.emit(contract, 'LogNumber')
        .withArgs('2')
        await expect(fnReverseLog).to.emit(contract, 'LogNumber')
        .withArgs('1')
    })

  })

})
