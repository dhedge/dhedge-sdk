const { ethers } = require('ethers')

const config = require('./config')


class EthereumProvider extends ethers.providers.JsonRpcProvider {

    async estimateGas(transaction) {
        const gasEstimate = await super.estimateGas(transaction)

        return gasEstimate.mul(100 + config.gasEstimatePadding).div(100)
    }

}

module.exports = EthereumProvider