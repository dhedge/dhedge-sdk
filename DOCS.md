## Classes

<dl>
<dt><a href="#ExchangeRates">ExchangeRates</a></dt>
<dd></dd>
<dt><a href="#Factory">Factory</a></dt>
<dd></dd>
<dt><a href="#Pool">Pool</a></dt>
<dd></dd>
<dt><a href="#Token">Token</a></dt>
<dd></dd>
</dl>

<a name="ExchangeRates"></a>

## ExchangeRates
**Kind**: global class  

* [ExchangeRates](#ExchangeRates)
    * [new ExchangeRates(signer, exchangeRatesAddress)](#new_ExchangeRates_new)
    * [.rateForCurrency(key)](#ExchangeRates+rateForCurrency) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.getEffectiveValue(source, amount, destination)](#ExchangeRates+getEffectiveValue) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<a name="new_ExchangeRates_new"></a>

### new ExchangeRates(signer, exchangeRatesAddress)

| Param | Type |
| --- | --- |
| signer | <code>Signer</code> | 
| exchangeRatesAddress | <code>string</code> | 

<a name="ExchangeRates+rateForCurrency"></a>

### exchangeRates.rateForCurrency(key) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the rate for supplied currency.

**Kind**: instance method of [<code>ExchangeRates</code>](#ExchangeRates)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="ExchangeRates+getEffectiveValue"></a>

### exchangeRates.getEffectiveValue(source, amount, destination) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the effective value for source currency amount to the destination currency.

**Kind**: instance method of [<code>ExchangeRates</code>](#ExchangeRates)  

| Param | Type |
| --- | --- |
| source | <code>string</code> | 
| amount | <code>BigNumber</code> \| <code>string</code> | 
| destination | <code>string</code> | 

<a name="Factory"></a>

## Factory
**Kind**: global class  

* [Factory](#Factory)
    * [new Factory(signer, factoryAddress)](#new_Factory_new)
    * _instance_
        * [.getAddressResolver()](#Factory+getAddressResolver) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.getExchangeRates()](#Factory+getExchangeRates) ⇒ [<code>Promise.&lt;ExchangeRates&gt;</code>](#ExchangeRates)
        * [.getAddress()](#Factory+getAddress) ⇒ <code>string</code>
        * [.loadPool(address)](#Factory+loadPool) ⇒ [<code>Promise.&lt;Pool&gt;</code>](#Pool)
        * [.isPool(address)](#Factory+isPool) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.validatePool(address)](#Factory+validatePool) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.getPoolCount(raw)](#Factory+getPoolCount) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
        * [.getDaoAddress()](#Factory+getDaoAddress) ⇒ <code>Promise.&lt;string&gt;</code>
        * [.getManagerFee(address, raw)](#Factory+getManagerFee) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
        * [.getMaximumManagerFee(raw)](#Factory+getMaximumManagerFee) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
        * [.getExitFee(raw)](#Factory+getExitFee) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
        * [.getDaoFee(raw)](#Factory+getDaoFee) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
        * [.getExitFeeCooldown(raw)](#Factory+getExitFeeCooldown) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
        * [.getMaximumAssetCount(raw)](#Factory+getMaximumAssetCount) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
        * [.createPool(privatePool, managerName, poolName, assets, managerFeeNumerator)](#Factory+createPool) ⇒ [<code>Promise.&lt;Pool&gt;</code>](#Pool)
    * _static_
        * [.initialize()](#Factory.initialize) ⇒ [<code>Factory</code>](#Factory)

<a name="new_Factory_new"></a>

### new Factory(signer, factoryAddress)

| Param | Type |
| --- | --- |
| signer | <code>Signer</code> | 
| factoryAddress | <code>string</code> | 

<a name="Factory+getAddressResolver"></a>

### factory.getAddressResolver() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the address resolver of the factory.

**Kind**: instance method of [<code>Factory</code>](#Factory)  
<a name="Factory+getExchangeRates"></a>

### factory.getExchangeRates() ⇒ [<code>Promise.&lt;ExchangeRates&gt;</code>](#ExchangeRates)
Returns an ExchangeRates instance.

**Kind**: instance method of [<code>Factory</code>](#Factory)  
<a name="Factory+getAddress"></a>

### factory.getAddress() ⇒ <code>string</code>
Returns the address of the factory contract.

**Kind**: instance method of [<code>Factory</code>](#Factory)  
<a name="Factory+loadPool"></a>

### factory.loadPool(address) ⇒ [<code>Promise.&lt;Pool&gt;</code>](#Pool)
Loads a pool based on the supplied address. Fails if pool doesn't belong to the given factory.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="Factory+isPool"></a>

### factory.isPool(address) ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns if supplied address is a pool.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="Factory+validatePool"></a>

### factory.validatePool(address) ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="Factory+getPoolCount"></a>

### factory.getPoolCount(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the number of pools in the given factory.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+getDaoAddress"></a>

### factory.getDaoAddress() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the DAO address.

**Kind**: instance method of [<code>Factory</code>](#Factory)  
<a name="Factory+getManagerFee"></a>

### factory.getManagerFee(address, raw) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
Returns tha manager fee of the given pool.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  | 
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+getMaximumManagerFee"></a>

### factory.getMaximumManagerFee(raw) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
Returns the maximal manager fee in the current factory.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+getExitFee"></a>

### factory.getExitFee(raw) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
Returns the exit fee.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+getDaoFee"></a>

### factory.getDaoFee(raw) ⇒ <code>Promise.&lt;(number\|Array.&lt;BigNumber&gt;)&gt;</code>
Returns the DAO fee.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+getExitFeeCooldown"></a>

### factory.getExitFeeCooldown(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the exit fee cooldown.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+getMaximumAssetCount"></a>

### factory.getMaximumAssetCount(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the maximum number of assets that a pool can support.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Factory+createPool"></a>

### factory.createPool(privatePool, managerName, poolName, assets, managerFeeNumerator) ⇒ [<code>Promise.&lt;Pool&gt;</code>](#Pool)
Creates a pool.

**Kind**: instance method of [<code>Factory</code>](#Factory)  

| Param | Type | Default |
| --- | --- | --- |
| privatePool | <code>boolean</code> |  | 
| managerName | <code>string</code> |  | 
| poolName | <code>string</code> |  | 
| assets | <code>Array.&lt;string&gt;</code> |  | 
| managerFeeNumerator | <code>number</code> \| <code>BigNumber</code> | <code>100</code> | 

<a name="Factory.initialize"></a>

### Factory.initialize() ⇒ [<code>Factory</code>](#Factory)
Initializes a Factory instance based on the .env file.

**Kind**: static method of [<code>Factory</code>](#Factory)  
<a name="Pool"></a>

## Pool
**Kind**: global class  

* [Pool](#Pool)
    * [new Pool(signer, poolAddress)](#new_Pool_new)
    * [.token()](#Pool+token) ⇒ [<code>Token</code>](#Token)
    * [.getAddress()](#Pool+getAddress) ⇒ <code>string</code>
    * [.getManager()](#Pool+getManager) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getManagerName()](#Pool+getManagerName) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.isMember(address)](#Pool+isMember) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getMembers()](#Pool+getMembers) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getMemberCount(raw)](#Pool+getMemberCount) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
    * [.changeManager(address, name)](#Pool+changeManager) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.addMembers(members)](#Pool+addMembers) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeMembers(members)](#Pool+removeMembers) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.addMember(member)](#Pool+addMember) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeMember(member)](#Pool+removeMember) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.isPrivate()](#Pool+isPrivate) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getCreator()](#Pool+getCreator) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCreationTime(raw)](#Pool+getCreationTime) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
    * [.getFactory()](#Pool+getFactory) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getAssets()](#Pool+getAssets) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getTokenPriceAtLastFeeMint()](#Pool+getTokenPriceAtLastFeeMint) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.getLastDepositByAddress(address, raw)](#Pool+getLastDepositByAddress) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
    * [.getManagerFee(raw)](#Pool+getManagerFee) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
    * [.getExitFee(raw)](#Pool+getExitFee) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
    * [.getAssetCount(raw)](#Pool+getAssetCount) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
    * [.isAssetSupported(key, convert)](#Pool+isAssetSupported) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getAsset(key)](#Pool+getAsset) ⇒ [<code>Promise.&lt;Token&gt;</code>](#Token)
    * [.getPoolValue()](#Pool+getPoolValue) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.assetValue(key)](#Pool+assetValue) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.getSummary()](#Pool+getSummary) ⇒ <code>Promise.&lt;{exitFee: number, managerFee: number, private: boolean, managerAddress: string, creationTime: number, totalSupply: BigNumber, name: string, managerName: string, totalPoolValue: BigNumber}&gt;</code>
    * [.getComposition()](#Pool+getComposition) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.getWaitingPeriods()](#Pool+getWaitingPeriods) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getSuspendedAssets()](#Pool+getSuspendedAssets) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.addAsset(key)](#Pool+addAsset) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeAsset(key)](#Pool+removeAsset) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.deposit(amount)](#Pool+deposit) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.withdraw(amount, forfeit)](#Pool+withdraw) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.exchange(sourceKey, sourceAmount, destinationKey)](#Pool+exchange) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_Pool_new"></a>

### new Pool(signer, poolAddress)

| Param | Type |
| --- | --- |
| signer | <code>Signer</code> | 
| poolAddress | <code>string</code> | 

<a name="Pool+token"></a>

### pool.token() ⇒ [<code>Token</code>](#Token)
Returns the pool token instance.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getAddress"></a>

### pool.getAddress() ⇒ <code>string</code>
Returns the pool address.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getManager"></a>

### pool.getManager() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the pool manager address.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getManagerName"></a>

### pool.getManagerName() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the pool manager name.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+isMember"></a>

### pool.isMember(address) ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns if the supplied address is a pool member.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="Pool+getMembers"></a>

### pool.getMembers() ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Returns all pool member addresses.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getMemberCount"></a>

### pool.getMemberCount(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the member count.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Default |
| --- | --- |
| raw | <code>false</code> | 

<a name="Pool+changeManager"></a>

### pool.changeManager(address, name) ⇒ <code>Promise.&lt;void&gt;</code>
Transfers the manager role to the supplied address with and changes the manager name.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| name | <code>string</code> | 

<a name="Pool+addMembers"></a>

### pool.addMembers(members) ⇒ <code>Promise.&lt;void&gt;</code>
Batch add members.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| members | <code>Array.&lt;string&gt;</code> | 

<a name="Pool+removeMembers"></a>

### pool.removeMembers(members) ⇒ <code>Promise.&lt;void&gt;</code>
Batch remove members.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| members | <code>Array.&lt;string&gt;</code> | 

<a name="Pool+addMember"></a>

### pool.addMember(member) ⇒ <code>Promise.&lt;void&gt;</code>
Add a member.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| member | <code>string</code> | 

<a name="Pool+removeMember"></a>

### pool.removeMember(member) ⇒ <code>Promise.&lt;void&gt;</code>
Remove a member.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| member | <code>string</code> | 

<a name="Pool+isPrivate"></a>

### pool.isPrivate() ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns if a pool is private

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getCreator"></a>

### pool.getCreator() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the address of the pool creator.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getCreationTime"></a>

### pool.getCreationTime(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the pool creation time.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Pool+getFactory"></a>

### pool.getFactory() ⇒ <code>Promise.&lt;string&gt;</code>
Returns the factory address.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getAssets"></a>

### pool.getAssets() ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Returns all pool assets.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getTokenPriceAtLastFeeMint"></a>

### pool.getTokenPriceAtLastFeeMint() ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the last token price at which the manager fee was minted.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getLastDepositByAddress"></a>

### pool.getLastDepositByAddress(address, raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the timestamp of the last deposit of the supplied address.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| address | <code>string</code> |  | 
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Pool+getManagerFee"></a>

### pool.getManagerFee(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the manager fee.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Pool+getExitFee"></a>

### pool.getExitFee(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the exit fee.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Pool+getAssetCount"></a>

### pool.getAssetCount(raw) ⇒ <code>Promise.&lt;(number\|BigNumber)&gt;</code>
Returns the asset count.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| raw | <code>boolean</code> | <code>false</code> | 

<a name="Pool+isAssetSupported"></a>

### pool.isAssetSupported(key, convert) ⇒ <code>Promise.&lt;boolean&gt;</code>
Returns true if the asset is supported.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| key | <code>string</code> |  | 
| convert | <code>boolean</code> | <code>false</code> | 

<a name="Pool+getAsset"></a>

### pool.getAsset(key) ⇒ [<code>Promise.&lt;Token&gt;</code>](#Token)
Returns the Token instance of the supplied asset.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Pool+getPoolValue"></a>

### pool.getPoolValue() ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the pool value.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+assetValue"></a>

### pool.assetValue(key) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the asset value of the given asset.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Pool+getSummary"></a>

### pool.getSummary() ⇒ <code>Promise.&lt;{exitFee: number, managerFee: number, private: boolean, managerAddress: string, creationTime: number, totalSupply: BigNumber, name: string, managerName: string, totalPoolValue: BigNumber}&gt;</code>
Returns the fund summary

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getComposition"></a>

### pool.getComposition() ⇒ <code>Promise.&lt;any&gt;</code>
Returns the fund composition.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getWaitingPeriods"></a>

### pool.getWaitingPeriods() ⇒ <code>Promise.&lt;Object&gt;</code>
Returns waiting periods for all assets.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+getSuspendedAssets"></a>

### pool.getSuspendedAssets() ⇒ <code>Promise.&lt;Object&gt;</code>
Get a map of suspended assets.

**Kind**: instance method of [<code>Pool</code>](#Pool)  
<a name="Pool+addAsset"></a>

### pool.addAsset(key) ⇒ <code>Promise.&lt;void&gt;</code>
Add a supported asset.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Pool+removeAsset"></a>

### pool.removeAsset(key) ⇒ <code>Promise.&lt;void&gt;</code>
Remove a supported asset.

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Pool+deposit"></a>

### pool.deposit(amount) ⇒ <code>Promise.&lt;void&gt;</code>
Deposit

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| amount | <code>string</code> \| <code>BigNumber</code> | 

<a name="Pool+withdraw"></a>

### pool.withdraw(amount, forfeit) ⇒ <code>Promise.&lt;void&gt;</code>
Withdraw

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type | Default |
| --- | --- | --- |
| amount | <code>string</code> \| <code>BigNumber</code> |  | 
| forfeit | <code>boolean</code> | <code>false</code> | 

<a name="Pool+exchange"></a>

### pool.exchange(sourceKey, sourceAmount, destinationKey) ⇒ <code>Promise.&lt;void&gt;</code>
Exchange

**Kind**: instance method of [<code>Pool</code>](#Pool)  

| Param | Type |
| --- | --- |
| sourceKey | <code>string</code> | 
| sourceAmount | <code>string</code> \| <code>BigNumber</code> | 
| destinationKey | <code>string</code> | 

<a name="Token"></a>

## Token
**Kind**: global class  

* [Token](#Token)
    * [new Token(signer, address)](#new_Token_new)
    * [.getAddress()](#Token+getAddress) ⇒ <code>string</code>
    * [.totalSupply()](#Token+totalSupply) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.balanceOf(address)](#Token+balanceOf) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.allowance(owner, spender)](#Token+allowance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    * [.transfer(recipient, amount)](#Token+transfer) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.approve(spender, amount)](#Token+approve) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.transferFrom(sender, recipient, amount)](#Token+transferFrom) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_Token_new"></a>

### new Token(signer, address)

| Param | Type |
| --- | --- |
| signer | <code>Signer</code> | 
| address | <code>string</code> | 

<a name="Token+getAddress"></a>

### token.getAddress() ⇒ <code>string</code>
**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+totalSupply"></a>

### token.totalSupply() ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the total supply of the token.

**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+balanceOf"></a>

### token.balanceOf(address) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the balance of the given address.

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="Token+allowance"></a>

### token.allowance(owner, spender) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
Returns the allowance of the given owner to the given spender.

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| owner | <code>string</code> | 
| spender | <code>string</code> | 

<a name="Token+transfer"></a>

### token.transfer(recipient, amount) ⇒ <code>Promise.&lt;void&gt;</code>
Transfers the specified amount to the specified recipient

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| recipient | <code>string</code> | 
| amount | <code>BigNumber</code> \| <code>string</code> | 

<a name="Token+approve"></a>

### token.approve(spender, amount) ⇒ <code>Promise.&lt;void&gt;</code>
Approves the allowance to the given spender.

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| spender | <code>string</code> | 
| amount | <code>BigNumber</code> \| <code>string</code> | 

<a name="Token+transferFrom"></a>

### token.transferFrom(sender, recipient, amount) ⇒ <code>Promise.&lt;void&gt;</code>
Transfers from using allowance.

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| sender | <code>string</code> | 
| recipient | <code>string</code> | 
| amount | <code>BigNumber</code> \| <code>string</code> | 

