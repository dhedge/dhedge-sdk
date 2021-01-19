const { Contract, Wallet, BigNumber, ethers } = require('ethers')
const Provider = require('./provider')
const Pool = require('./pool')

const FACTORY_ABI = require('./abi/factory')
const ADDRESS_RESOLVER_ABI = require('./abi/address-resolver')
const ExchangeRates = require('./exchange-rates')

class Factory {
    /**
     * @param {Signer} signer
     * @param {string} factoryAddress
     */
    constructor(signer, factoryAddress) {
        this.signer = signer

        this.factory = new Contract(factoryAddress, FACTORY_ABI, signer)

        this.address = factoryAddress
    }

    /**
     * Initializes a Factory instance based on the .env file.
     * 
     * @returns {Factory}
     */
    static initialize() {
        const config = require('./config')

        const provider = new Provider(config.provider)

        let signer
        if (config.privateKey) {
            signer = new Wallet(config.privateKey, provider)
        }
        else {
            signer = Wallet.fromMnemonic(
                config.mnemonic,
                "m/44'/60'/0'/0/" + config.accountId
            ).connect(provider)
        }

        return new Factory(signer, config.factoryAddress)
    }

    /**
     * Returns the address resolver of the factory.
     * 
     * @returns {Promise<string>}
     */
    getAddressResolver() {
        return this.factory.addressResolver()
    }

    /**
     * Returns an ExchangeRates instance.
     * 
     * @returns {Promise<ExchangeRates>}
     */
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

    /**
     * Returns the address of the factory contract.
     * 
     * @returns {string}
     */
    getAddress() {
        return this.address
    }

    /**
     * Loads a pool based on the supplied address. Fails if pool doesn't belong to the given factory.
     * 
     * @param {string} address
     * @returns {Promise<Pool>}
     */
    async loadPool(address) {
        await this.validatePool(address)

        let pool = new Pool(this.signer, address)

        return pool
    }

    /**
     * Returns if supplied address is a pool.
     * 
     * @param {string} address
     * @returns {Promise<boolean>}
     */
    async isPool(address) {
        return this.factory.isPool(address)
    }

    /**
     * @param {string} address
     * @returns {Promise<void>}
     */
    async validatePool(address) {
        let isPool = await this.isPool(address)

        if (!isPool) throw new Error('Given address not a pool')
    }

    /**
     * Returns the number of pools in the given factory.
     * 
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getPoolCount(raw = false) {
        let result = await this.factory.deployedFundsLength()

        if (raw) return result

        return result.toNumber()
    }

    /**
     * Returns the DAO address.
     * 
     * @returns {Promise<string>}
     */
    async getDaoAddress() {
        return this.factory.getDaoAddress()
    }

    /**
     * Returns tha manager fee of the given pool.
     * 
     * @param {string} address
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber[]>}
     */
    async getManagerFee(address, raw = false) {
        await this.validatePool(address)

        let result = await this.factory.getPoolManagerFee(address)

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    /**
     * Returns the maximal manager fee in the current factory.
     * 
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber[]>}
     */
    async getMaximumManagerFee(raw = false) {
        let result = await this.factory.getMaximumManagerFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    /**
     * Returns the exit fee.
     * 
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber[]>}
     */
    async getExitFee(raw = false) {
        let result = await this.factory.getExitFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    /**
     * Returns the DAO fee.
     * 
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber[]>}
     */
    async getDaoFee(raw = false) {
        let result = await this.factory.getDaoFee()

        if (raw) return result

        result = result.map(item => item.toNumber())
        result = result[0] / result[1]

        return result
    }

    /**
     * Returns the exit fee cooldown.
     * 
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getExitFeeCooldown(raw = false) {
        let result = await this.factory.getExitFeeCooldown()

        if (raw) return result

        return result.toNumber()
    }

    /**
     * Returns the maximum number of assets that a pool can support.
     * 
     * @param {boolean} raw
     * @returns {Promise<number|BigNumber>}
     */
    async getMaximumAssetCount(raw = false) {
        let result = await this.factory.getMaximumSupportedAssetCount()

        if (raw) return result

        return result.toNumber()
    }

    // Write

    /**
     * Creates a pool.
     * 
     * @param {boolean} privatePool
     * @param {string} managerName
     * @param {string} poolName
     * @param {string[]} assets
     * @param {number|BigNumber} managerFeeNumerator
     * @returns {Promise<Pool>}
     */
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
