const { Factory } = require('../index')


;(async () => {

    const factory = Factory.initialize()
    
    let pool = await factory.createPool(false, 'Manager Name', 'Pool Name', ['sETH'])

    console.log('Summary', await pool.getSummary())

    let sUSD = await pool.getAsset('sUSD')

    await sUSD.approve(pool.getAddress(), '100000000000000000000') // Approve 100sUSD

    await pool.deposit('100000000000000000000')

    console.log('Composition', await pool.getComposition())
    
    await pool.exchange('sUSD', '50000000000000000000', 'sETH')

    console.log('Composition', await pool.getComposition())
    
})()