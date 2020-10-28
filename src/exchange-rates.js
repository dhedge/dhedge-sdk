const { Contract, Wallet, ethers, BigNumber } = require('ethers')
const EXCHANGE_RATES_ABI = require('./abi/exchange-rates')

class ExchangeRates {
    constructor(signer, exchangeRatesAddress) {
        this.signer = signer

        this.contract = new Contract(
            exchangeRatesAddress,
            EXCHANGE_RATES_ABI,
            signer
        )

        this.address = exchangeRatesAddress
    }

    async rateForCurrency(key) {
        key = ethers.utils.formatBytes32String(key)

        return this.contract.rateForCurrency(key)
    }

    async getEffectiveValue(source, amount, destination) {
        source = ethers.utils.formatBytes32String(source)
        destination = ethers.utils.formatBytes32String(destination)

        if (!BigNumber.isBigNumber(amount) && typeof amount !== 'string') {
            throw new Error(
                'Please pass numbers as strings or BigNumber objects to avoid precision errors.'
            )
        }

        amount = ethers.BigNumber.from(amount)

        return this.contract.effectiveValue(source, amount, destination)
    }
}

module.exports = ExchangeRates
