const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Events', () => {

  describe('Example 1', () => {
    let user1, user2
    let Contract, contract

    beforeEach(async () => {
      let accounts = await ethers.getSigners()
      user1 = accounts[0]
      user2 = accounts[1]
      Contract = await ethers.getContractFactory('Events1')
      contract = await Contract.deploy()
    })

    it('demonstrates subscribing to an event', async () => {
      // Call it once, check the event log in real time
      let transaction = await contract.updateMessage('Hey!')
      await transaction.wait()
      await expect(transaction).to.emit(contract, 'MessageUpdated')
        .withArgs(user1.address, 'Hey!')
    })

    it('demonstrates working with event histories', async () => {
      // Call it a few more times to get event history
      transaction = await contract.updateMessage('Hey!')
      await transaction.wait()

      transaction = await contract.updateMessage('Ho!')
      await transaction.wait()

      transaction = await contract.updateMessage('Ha!')
      await transaction.wait()

      // demonstrate accessing the event history
      // https://docs.ethers.io/v5/getting-started/#getting-started--history
      let eventStream = await contract.queryFilter('MessageUpdated')
    //   console.log(eventStream)
      expect(eventStream.length).to.equal(3)


      // Check first event in the stream
      let firstEvent = eventStream[0]
      expect(firstEvent.args[1]).to.equal('Hey!')
    })

    it('demonstrates triggering events', async () => {
      // Trigger event from user 2
      transaction = await contract.connect(user2).updateMessage('Huh!')
      await transaction.wait()

      // Filter only events created by user2
      let user2Filter = contract.filters.MessageUpdated(user2.address, null)
      eventStream = await contract.queryFilter(user2Filter)
      expect(eventStream.length).to.equal(1)

      // Make sure it's user 2's message
      firstEvent = eventStream[0]
      expect(firstEvent.args[1]).to.equal('Huh!')
    })
  })

})
