const { Factory } = require('../index')

;(async () => {
    const factory = Factory.initialize()

    let pool = await factory.createPool(
        false,
        'Test Manager Name 2',
        'Test Pool Name 2'
    )

    console.log('Pool Address', pool.getAddress())

    // Pool test
    console.log('Is pool private', await pool.isPrivate())
    console.log('Creator', await pool.getCreator())
    console.log('Creation time', await pool.getCreationTime())
    console.log('Factory address', await pool.getFactory())
    console.log('Assets', await pool.getAssets())
    console.log(
        'Token price at last fee mint',
        await pool.getTokenPriceAtLastFeeMint()
    )

    console.log('Manager', await pool.getManager())
    console.log('Manager name', await pool.getManagerName())
    console.log('Pool members', await pool.getMembers())
    console.log('Pool member count', await pool.getMemberCount())

    console.log('Summary', await pool.getSummary())
    console.log('Composition', await pool.getComposition())
    console.log('Waiting periods', await pool.getWaitingPeriods())
    console.log('Suspended assets', await pool.getSuspendedAssets())
})()
