const { ethers, Contract, BigNumber } = require('ethers')

const POOL_ABI = require('./abi/pool')
const TOKEN_ABI = require('./abi/token')

const Token = require('./token')

class Pool {
    /**
     * @param {Signer} signer
     * @param {string} poolAddress
     */
    constructor(signer, poolAddress) {
        this.signer = signer

        this.contract = new Contract(poolAddress, POOL_ABI, this.signer)
        this.token = new Contract(poolAddress, TOKEN_ABI, this.signer)

        this.address = poolAddress
    }

    /**
     * Returns the pool token instance.
     *
     * @returns {Token}
     */
    token() {
        return new Token(this.signer, this.address)
    }

    /**
     * Returns the pool address.
     *
     * @returns {string}
     */
    getAddress() {
        return this.address
    }

    // Read - Managed

    /**
     * Returns the pool manager address.
     *
     * @returns {Promise<string>}
     */
    async getManager() {
        return this.contract.manager()
    }

    /**
     * Returns the pool manager name.
     *
     * @returns {Promise<string>}
     */
    async getManagerName() {
        return this.contract.managerName()
    }

    /**
     * Returns if the supplied address is a pool member.
     *
     * @param {string} address
     * @returns {Promise<boolean>}
     */
    async isMember(address) {
        return this.contract.isMemberAllowed(address)
    }

    /**
     * Returns all pool member addresses.
     * @returns {Promise<string[]>}
     */
    async getMembers() {
        return this.contract.getMembers()
    }

    /**
     * Returns the member count.
     *
     * @param raw
     * @returns {Promise<number|BigNumber>}
     */
    async getMemberCount(raw = false) {
        let result = await this.contract.numberOfMembers()

        if (raw) return result

        return result.toNumber()
    }

    // Write - Managed

    /**
     * Transfers the manager role to the supplied address with and changes the manager name.
     *
     * @param {string} address
     * @param {string} name
     * @returns {Promise<void>}
     */
    async changeManager(address, name) {
        let receipt = await this.contract.changeManager(address, name)

        receipt = await receipt.wait(1)

        let changeEvent = receipt.events.find(
            item => item.event === 'ManagerUpdated'
        )

        if (!changeEvent) throw new Error('Manager not updated')
    }

    /**
     * Batch add members.
     *
     * @param {string[]} members
     * @returns {Promise<void>}
     */
    async addMembers(members) {
        let receipt = await this.contract.addMembers(members)

        receipt = await receipt.wait(1)
    }

    /**
     * Batch remove members.
     *
     * @param {string[]} members
     * @returns {Promise<void>}
     */
    async removeMembers(members) {
        let receipt = await this.contract.removeMembers(members)

        receipt = await receipt.wait(1)
    }

    /**
     * Add a member.
     *
     * @param {string} member
     * @returns {Promise<void>}
     */
    async addMember(member) {
        this.addMembers([member])
    }

    /**
     * Remove a member.
     *
     * @param {string} member
     * @returns {Promise<void>}
     */
    async removeMember(member) {
        this.removeMembers([member])
    }

    // Read - Pool

    /**
     * Returns if a pool is private
     *
     * @returns {Promise<boolean>}
     */
    async isPrivate() {
        return this.contract.privatePool()
    }

    /**
     * Returns the address of the pool creator.
     *
     * @returns {Promise<string>}
     */
    async getCreator() {
        return this.contract.creator()
    }

    /**
     * Returns the pool creation time.
     *
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getCreationTime(raw = false) {
        let result = await this.contract.creationTime()

        if (raw) return result

        return result.toNumber()
    }

    /**
     * Returns the factory address.
     *
     * @returns {Promise<string>}
     */
    async getFactory() {
        return this.contract.factory()
    }

    /**
     * Returns all pool assets.
     *
     * @returns {Promise<string[]>}
     */
    async getAssets() {
        return (await this.contract.getSupportedAssets()).map(item =>
            ethers.utils.parseBytes32String(item)
        )
    }

    /**
     * Returns the last token price at which the manager fee was minted.
     *
     * @returns {Promise<BigNumber>}
     */
    async getTokenPriceAtLastFeeMint() {
        return this.contract.tokenPriceAtLastFeeMint()
    }

    /**
     * Returns the timestamp of the last deposit of the supplied address.
     *
     * @param {string} address
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getLastDepositByAddress(address, raw = false) {
        let result = await this.contract.lastDeposit(address)

        if (raw) return result

        return result.toNumber()
    }

    /**
     * Returns the manager fee.
     *
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getManagerFee(raw = false) {
        let result = await this.contract.getManagerFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    /**
     * Returns the exit fee.
     *
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getExitFee(raw = false) {
        let result = await this.contract.getExitFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    /**
     * Returns the asset count.
     *
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getAssetCount(raw = false) {
        let result = await this.contract.numberOfSupportedAssets()

        if (raw) return result

        return result.toNumber()
    }

    /**
     * Returns true if the asset is supported.
     *
     * @param {string} key
     * @param {boolean} convert
     * @returns {Promise<boolean>}
     */
    async isAssetSupported(key, convert = false) {
        if (convert) key = ethers.utils.formatBytes32String(key)

        return this.contract.isAssetSupported(key)
    }

    /**
     * Returns the Token instance of the supplied asset.
     *
     * @param {string} key
     * @returns {Promise<Token>}
     */
    async getAsset(key) {
        key = ethers.utils.formatBytes32String(key)

        if (!(await this.isAssetSupported(key, false)))
            throw new Error('Asset not supported')

        let proxy = await this.contract.getAssetProxy(key)

        return new Token(this.signer, proxy)
    }

    /**
     * Returns the pool value.
     *
     * @returns {Promise<BigNumber>}
     */
    async getPoolValue() {
        return this.contract.totalFundValue()
    }

    /**
     * Returns the asset value of the given asset.
     *
     * @param {string} key
     * @returns {Promise<BigNumber>}
     */
    async assetValue(key) {
        key = ethers.utils.formatBytes32String(key)

        if (!(await this.isAssetSupported(key, false)))
            throw new Error('Asset not supported')

        return this.contract.assetValue(key)
    }

    /**
     * Returns the fund summary
     *
     * @returns {Promise<{exitFee: number, managerFee: number, private: boolean, managerAddress: string, creationTime: number, totalSupply: BigNumber, name: string, managerName: string, totalPoolValue: BigNumber}>}
     */
    async getSummary() {
        let summary = await this.contract.getFundSummary()

        return {
            name: summary[0],
            totalSupply: summary[1],
            totalPoolValue: summary[2],
            managerAddress: summary[3],
            managerName: summary[4],
            creationTime: summary[5].toNumber(),
            private: summary[6],
            managerFee: summary[7].toNumber() / summary[8].toNumber(),
            exitFee: summary[9].toNumber() / summary[10].toNumber(),
        }
    }

    /**
     * Returns the fund composition.
     *
     * @returns {Promise<any>}
     */
    async getComposition() {
        let result = await this.contract.getFundComposition()

        let composition = {}

        result[0].map((item, index) => {
            composition[ethers.utils.parseBytes32String(item)] = {
                balance: result[1][index],
                rate: result[2][index],
            }
        })

        return composition
    }

    /**
     * Returns waiting periods for all assets.
     *
     * @returns {Promise<Object>}
     */
    async getWaitingPeriods() {
        let result = await this.contract.getWaitingPeriods()

        let periods = {}

        result[0].map((item, index) => {
            periods[ethers.utils.parseBytes32String(item)] = result[1][
                index
            ].toNumber()
        })

        return periods
    }

    /**
     * Get a map of suspended assets.
     *
     * @returns {Promise<Object>}
     */
    async getSuspendedAssets() {
        let result = await this.contract.getSuspendedAssets()

        let assets = {}

        result[0].map((item, index) => {
            assets[ethers.utils.parseBytes32String(item)] = result[1][index]
        })

        return assets
    }

    // Pool - Write

    /**
     * Add a supported asset.
     *
     * @param {string} key
     * @returns {Promise<void>}
     */
    async addAsset(key) {
        key = ethers.utils.formatBytes32String(key)

        if (await this.isAssetSupported(key, false)) {
            throw new Error('Asset already supported')
        }

        let tx = await this.contract.addToSupportedAssets(key)

        await tx.wait(1)
    }

    /**
     * Remove a supported asset.
     *
     * @param {string} key
     * @returns {Promise<void>}
     */
    async removeAsset(key) {
        key = ethers.utils.formatBytes32String(key)

        if (!(await this.isAssetSupported(key, false))) {
            throw new Error('Asset not supported')
        }

        let tx = await this.contract.removeFromSupportedAssets(key)

        await tx.wait(1)
    }

    /**
     * Deposit
     *
     * @param {string|BigNumber} amount
     * @returns {Promise<void>}
     */
    async deposit(amount) {
        if (!BigNumber.isBigNumber(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx = await this.contract.deposit(amount)

        await tx.wait(1)
    }

    /**
     * Withdraw
     *
     * @param {string|BigNumber} amount
     * @param {boolean} forfeit
     * @returns {Promise<void>}
     */
    async withdraw(amount, forfeit = false) {
        if (!BigNumber.isBigNumber(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx

        if (forfeit)
            tx = await this.contract.forfeitSuspendedSynthsAndWithdraw(amount)
        else tx = await this.contract.withdraw(amount)

        await tx.wait(1)
    }

    /**
     * Exchange
     *
     * @param {string} sourceKey
     * @param {string|BigNumber} sourceAmount
     * @param {string} destinationKey
     * @returns {Promise<void>}
     */
    async exchange(sourceKey, sourceAmount, destinationKey) {
        sourceKey = ethers.utils.formatBytes32String(sourceKey)
        destinationKey = ethers.utils.formatBytes32String(destinationKey)

        if (
            !BigNumber.isBigNumber(sourceAmount) &&
            typeof sourceAmount !== 'string'
        ) {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        sourceAmount = ethers.BigNumber.from(sourceAmount)

        if (!(await this.isAssetSupported(sourceKey, false))) {
            throw new Error('Source asset not supported')
        }

        if (!(await this.isAssetSupported(destinationKey, false))) {
            throw new Error('Destination asset not supported')
        }

        let tx = await this.contract.exchange(
            sourceKey,
            sourceAmount,
            destinationKey
        )

        await tx.wait(1)
    }
}

module.exports = Pool
