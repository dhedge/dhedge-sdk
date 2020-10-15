const { Factory } = require('../index')


;(async () => {

    const factory = Factory.initialize()

    let pool = await factory.createPool(false, 'Manager Name', 'Pool Name')
    
    //let pool = await factory.loadPool('0x24f4D2423073D8Def2D0c2870D44efD2fEDd09F9')

    console.log('Pool Address', pool.getAddress())

    // Factory  Test
    console.log('isPool', pool.getAddress(), await factory.isPool(pool.getAddress()))
    console.log('isPool', '0xb12DC0644f505028388Da4A919eD72d422175dA8', await factory.isPool('0xb12DC0644f505028388Da4A919eD72d422175dA8'))
    console.log('Pool manager fee', await factory.getManagerFee(pool.getAddress()))
    console.log('Dao fee', await factory.getDaoFee())
    console.log('Dao address', await factory.getDaoAddress())
    console.log('Exit fee', await factory.getExitFee())
    console.log('Maximum manager fee', await factory.getMaximumManagerFee())
    console.log('Exit fee cooldown', await factory.getExitFeeCooldown())
    console.log('Max assets', await factory.getMaximumAssetCount())
    console.log('Total pools', await factory.getPoolCount())

    // Pool test
    console.log('Is pool private', await pool.isPrivate())
    console.log('Creator', await pool.getCreator())
    console.log('Creation time', await pool.getCreationTime())
    console.log('Factory address', await pool.getFactory())
    console.log('Assets', await pool.getAssets())
    console.log('Token price at last fee mint', await pool.getTokenPriceAtLastFeeMint())

    console.log('Manager', await pool.getManager())
    console.log('Manager name', await pool.getManagerName())
    console.log('Pool members', await pool.getMembers())
    console.log('Pool member count', await pool.getMemberCount())

    let sUSD = await pool.getAsset('sUSD')

    let balance = await sUSD.balanceOf(await factory.signer.getAddress())
    console.log('sUSD balance', balance.toString())

    await sUSD.approve(pool.getAddress(), '1000000000000000000')
    await pool.deposit('1000000000000000000')

    console.log('Pool Value', (await pool.getPoolValue()).toString())

    await pool.exchange('sUSD', '500000000000000000', 'sETH')

    console.log('Pool Value', (await pool.getPoolValue()).toString())

    console.log('sUSD value', (await pool.assetValue('sUSD')).toString())
    console.log('sETH value', (await pool.assetValue('sETH')).toString())


    console.log('Summary', await pool.getSummary())
    console.log('Composition', await pool.getComposition())
    console.log('Waiting periods', await pool.getWaitingPeriods())
    console.log('Suspended assets', await pool.getSuspendedAssets())

})()

