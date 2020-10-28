const { ethers, Contract, BigNumber } = require('ethers')
const TOKEN_ABI = require('./abi/token')

class Token {
    constructor(signer, address) {
        this.contract = new Contract(address, TOKEN_ABI, signer)

        this.address = address
    }

    getAddress() {
        return this.address
    }

    // Read

    async totalSupply() {
        return this.contract.totalSupply()
    }

    async balanceOf(address) {
        if (!ethers.utils.isAddress(address))
            throw new Error('Invalid address format.')

        return this.contract.balanceOf(address)
    }

    async allowance(owner, spender) {
        if (!ethers.utils.isAddress(owner) || !ethers.utils.isAddress(spender))
            throw new Error('Invalid address format.')

        return this.contract.allowance(owner, spender)
    }

    // Write

    async transfer(recipient, amount) {
        if (!ethers.utils.isAddress(recipient))
            throw new Error('Invalid address format.')

        if (!BigNumber.isBigNumber(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx = await this.contract.transfer(recipient, amount)

        await tx.wait(1)
    }

    async approve(spender, amount) {
        if (!ethers.utils.isAddress(spender))
            throw new Error('Invalid address format.')

        if (!BigNumber.isBigNumber(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx = await this.contract.approve(spender, amount)

        await tx.wait(1)
    }

    async transferFrom(sender, recipient, amount) {
        if (
            !ethers.utils.isAddress(sender) ||
            !ethers.utils.isAddress(recipient)
        )
            throw new Error('Invalid address format.')

        if (!BigNumber.isBigNumber(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx = this.contract.transferFrom(sender, recipient, amount)

        await tx.wait(1)
    }
}

module.exports = Token
