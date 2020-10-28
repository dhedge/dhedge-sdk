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


module.exports = ExchangeRates
