const dotenv = require('dotenv')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()

if (!envFound) {
    throw new Error("Couldn't find .env file.")
}

module.exports = {
    privateKey: process.env.PRIVATE_KEY || '',
    mnemonic: process.env.MNEMONIC || '',
    accountId: process.env.ACCOUNT_ID || '0',
    provider: process.env.PROVIDER || 'http://localhost:8545',
    factoryAddress: process.env.FACTORY_ADDRESS || '0x0',
    gasEstimatePadding: parseInt(process.env.GAS_ESTIMATE_PADDING) || 20,
}
