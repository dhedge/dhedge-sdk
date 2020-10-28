const { Contract, Wallet, ethers } = require('ethers')
const Pool = require('./pool')

const FACTORY_ABI = require('./abi/factory')
const ADDRESS_RESOLVER_ABI = require('./abi/address-resolver')
const ExchangeRates = require('./exchange-rates')

class Factory {
    constructor(signer, factoryAddress) {
        this.signer = signer

        this.factory = new Contract(factoryAddress, FACTORY_ABI, signer)

        this.address = factoryAddress
    }

    static initialize() {
        const config = require('./config')

        const provider = new ethers.providers.JsonRpcProvider(config.provider)

        const signer = Wallet.fromMnemonic(
            config.mnemonic,
            "m/44'/60'/0'/0/" + config.accountId
        ).connect(provider)

        return new Factory(signer, config.factoryAddress)
    }

    getAddressResolver() {
        return this.factory.addressResolver()
    }

    async getExchangeRates() {
        const resolverAddress = await this.getAddressResolver()

        const resolver = new Contract(
            resolverAddress,
            ADDRESS_RESOLVER_ABI,
            this.signer
        )

        const exchangeRatesAddress = await resolver.getAddress(
            ethers.utils.formatBytes32String('ExchangeRates')
        )

        return new ExchangeRates(this.signer, exchangeRatesAddress)
    }

    // Read

    getAddress() {
        return this.address
    }

    async loadPool(address) {
        await this.validatePool(address)

        let pool = new Pool(this.signer, address)

        return pool
    }

    async isPool(address) {
        return this.factory.isPool(address)
    }

    async validatePool(address) {
        let isPool = await this.isPool(address)

        if (!isPool) throw new Error('Given address not a pool')
    }

    async getPoolCount(raw = false) {
        let result = await this.factory.deployedFundsLength()

        if (raw) return result

        return result.toNumber()
    }

    async getDaoAddress() {
        return this.factory.getDaoAddress()
    }

    async getManagerFee(address, raw = false) {
        await this.validatePool(address)

        let result = await this.factory.getPoolManagerFee(address)

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    async getMaximumManagerFee(raw = false) {
        let result = await this.factory.getMaximumManagerFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    async getExitFee(raw = false) {
        let result = await this.factory.getExitFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    async getDaoFee(raw = false) {
        let result = await this.factory.getDaoFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    async getExitFeeCooldown(raw = false) {
        let result = await this.factory.getExitFeeCooldown()

        if (raw) return result

        return result.toNumber()
    }

    async getMaximumAssetCount(raw = false) {
        let result = await this.factory.getMaximumSupportedAssetCount()

        if (raw) return result

        return result.toNumber()
    }

    // Write

    async createPool(
        privatePool,
        managerName,
        poolName,
        assets = ['sETH'],
        managerFeeNumerator = 100
    ) {
        assets = assets.map(asset => {
            return ethers.utils.formatBytes32String(asset)
        })

        let pool = await this.factory.createFund(
            privatePool,
            this.signer.getAddress(),
            managerName,
            poolName,
            managerFeeNumerator,
            assets
        )

        let receipt = await pool.wait(1)

        let creationEvent = receipt.events.find(
            item => item.event === 'FundCreated'
        )

        if (!creationEvent) throw new Error('Fund not created')

        let poolAddress = creationEvent.args.fundAddress

        return new Pool(this.signer, poolAddress)
    }
}

module.exports = Factory
