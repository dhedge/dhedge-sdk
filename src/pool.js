const { ethers, Contract } = require('ethers')

const POOL_ABI = require('./abi/pool')
const TOKEN_ABI = require('./abi/token')

const BN = require('bn.js')
const Token = require('./token')

class Pool {
    constructor(signer, poolAddress) {
        this.signer = signer

        this.contract = new Contract(poolAddress, POOL_ABI, this.signer)
        this.token = new Contract(poolAddress, TOKEN_ABI, this.signer)

        this.address = poolAddress
    }

    token() {
        return this.token
    }

    getAddress() {
        return this.address
    }

    // Read - Managed

    async getManager() {
        return this.contract.manager()
    }

    async getManagerName() {
        return this.contract.managerName()
    }

    async isMember(address) {
        return this.contract.isMemberAllowed(address)
    }

    async getMembers() {
        return this.contract.getMembers()
    }

    async getMemberCount(raw = false) {
        let result = await this.contract.numberOfMembers()

        if (raw) return result

        return result.toNumber()
    }

    // Write - Managed

    async changeManager(address, name) {
        let receipt = await this.contract.changeManager(address, name)

        receipt = await receipt.wait(1)

        let changeEvent = receipt.events.find(
            item => item.event === 'ManagerUpdated'
        )

        if (!changeEvent) throw new Error('Manager not updated')
    }

    async addMembers(members) {
        let receipt = await this.contract.addMembers(members)

        receipt = await receipt.wait(1)
    }

    async removeMembers(members) {
        let receipt = await this.contract.removeMembers(members)

        receipt = await receipt.wait(1)
    }

    async addMember(member) {
        this.addMembers([member])
    }

    async removeMember(member) {
        this.removeMembers([member])
    }

    // Read - Pool

    async isPrivate() {
        return this.contract.privatePool()
    }

    async getCreator() {
        return this.contract.creator()
    }

    async getCreationTime(raw = false) {
        let result = await this.contract.creationTime()

        if (raw) return result

        return result.toNumber()
    }

    async getFactory() {
        return this.contract.factory()
    }

    async getAssets() {
        return (await this.contract.getSupportedAssets()).map(item =>
            ethers.utils.parseBytes32String(item)
        )
    }

    async getTokenPriceAtLastFeeMint() {
        return this.contract.tokenPriceAtLastFeeMint()
    }

    async getLastDepositByAddress(address, raw = false) {
        let result = await this.contract.lastDeposit(address)

        if (raw) return result

        return result.toNumber()
    }

    async getManagerFee(raw = false) {
        let result = await this.contract.getManagerFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    async getManagerFee(raw = false) {
        let result = await this.contract.getExitFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    async getAssetCount(raw = false) {
        let result = await this.contract.numberOfSupportedAssets()

        if (raw) return result

        return result.toNumber()
    }

    async isAssetSupported(key, convert = false) {
        if (convert) key = ethers.utils.formatBytes32String(key)

        return this.contract.isAssetSupported(key)
    }

    async getAsset(key) {
        key = ethers.utils.formatBytes32String(key)

        if (!(await this.isAssetSupported(key, false)))
            throw new Error('Asset not supported')

        let proxy = await this.contract.getAssetProxy(key)

        return new Token(this.signer, proxy)
    }

    async getPoolValue() {
        return this.contract.totalFundValue()
    }

    async assetValue(key) {
        key = ethers.utils.formatBytes32String(key)

        if (!(await this.isAssetSupported(key, false)))
            throw new Error('Asset not supported')

        return this.contract.assetValue(key)
    }

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

    async getSuspendedAssets() {
        let result = await this.contract.getSuspendedAssets()

        let assets = {}

        result[0].map((item, index) => {
            assets[ethers.utils.parseBytes32String(item)] = result[1][index]
        })

        return assets
    }

    // Pool - Write

    async addAsset(key) {
        key = ethers.utils.formatBytes32String(key)

        if (await this.isAssetSupported(key, false)) {
            throw new Error('Asset already supported')
        }

        return this.contract.addToSupportedAssets(key)
    }

    async removeAsset(key) {
        key = ethers.utils.formatBytes32String(key)

        if (!(await this.isAssetSupported(key, false))) {
            throw new Error('Asset not supported')
        }

        return this.contract.removeFromSupportedAssets(key)
    }

    async deposit(amount) {
        if (!BN.isBN(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BN objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx = await this.contract.deposit(amount)

        await tx.wait(1)
    }

    async withdraw(amount, forfeit = false) {
        if (!BN.isBN(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BN objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        let tx

        if (forfeit)
            tx = await this.contract.forfeitSuspendedSynthsAndWithdraw(amount)
        else tx = await this.contract.withdraw(amount)

        await tx.wait(1)
    }

    async exchange(sourceKey, sourceAmount, destinationKey) {
        sourceKey = ethers.utils.formatBytes32String(sourceKey)
        destinationKey = ethers.utils.formatBytes32String(destinationKey)

        if (!BN.isBN(sourceAmount) && typeof sourceAmount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BN objects to avoid precision errors.'
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
