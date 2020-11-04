const { ethers, Contract, BigNumber } = require('ethers')
const TOKEN_ABI = require('./abi/token')

class Token {
    /**
     * @param {Signer} signer
     * @param {string} address
     */
    constructor(signer, address) {
        this.contract = new Contract(address, TOKEN_ABI, signer)

        this.address = address
    }

    /**
     * @returns {string}
     */
    getAddress() {
        return this.address
    }

    /**
     * Returns the total supply of the token.
     * @returns {Promise<BigNumber>}
     */
    async totalSupply() {
        return this.contract.totalSupply()
    }

    /**
     * Returns the balance of the given address.
     * @param {string} address
     * @returns {Promise<BigNumber>}
     */
    async balanceOf(address) {
        if (!ethers.utils.isAddress(address))
            throw new Error('Invalid address format.')

        return this.contract.balanceOf(address)
    }

    /**
     * Returns the allowance of the given owner to the given spender.
     * @param {string} owner
     * @param {string} spender
     * @returns {Promise<BigNumber>}
     */
    async allowance(owner, spender) {
        if (!ethers.utils.isAddress(owner) || !ethers.utils.isAddress(spender))
            throw new Error('Invalid address format.')

        return this.contract.allowance(owner, spender)
    }

    /**
     * Transfers the specified amount to the specified recipient
     * @param {string} recipient
     * @param {BigNumber|string} amount
     * @returns {Promise<void>}
     */
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

    /**
     * Approves the allowance to the given spender.
     * @param {string} spender
     * @param {BigNumber|string} amount
     * @returns {Promise<void>}
     */
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

    /**
     * Transfers from using allowance.
     * @param {string} sender
     * @param {string} recipient
     * @param {BigNumber|string} amount
     * @returns {Promise<void>}
     */
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
