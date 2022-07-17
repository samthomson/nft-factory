// import { BigNumber, utils } from 'ethers'
import { BigNumber } from 'bignumber.js'
import dotenv from 'dotenv'

import * as Utils from './utils'
import * as Blockchain from './blockchain'
import * as Types from './types'
import * as Constants from './constants'

dotenv.config()


const mintCollection = async (collectionFilePath: string): Promise<void> => {
	// check for all env vars
	Utils.ensureEnvVarsAreNotEmpty(['API_URL', 'PRIVATE_KEY', 'PUBLIC_KEY', 'MINTING_CONTRACT_ADDRESS_POLYGON', 'WEB3STORAGE_API_KEY'])
	// validate collection
	// check balance is enough
	await checkBalanceEnoughToMintCollection({items: []})
	// mint each NFT
}

const checkBalanceEnoughToMintCollection = async (prospectiveCollection: Types.ProspectiveCollection): Promise<void> => {
	// wei, 10^18
	const currentBalance = await Blockchain.getMaticBalance()

	// create big number of gas with 10^9 (gwei) places
	const weiRequired = 
	new BigNumber(Constants.GAS_NFT_MINT).dividedBy(	
		new BigNumber(10).pow(9)
	)
	
	// const requiredMinimum = weiRequired.multipliedBy(prospectiveCollection.items.length)
	const requiredMinimum = weiRequired.multipliedBy(8)

	console.log({
		weiRequired, 
		currentBalance, 
		requiredMinimum,
		weiRequiredS: weiRequired.toString(), 
		currentBalanceS: currentBalance.toString(), 
		requiredMinimumS: requiredMinimum.toString()
	})

	// todo: this uses gas limit which is kind of irrelevant. better would be gas price * gas limit (hard coded to what we expect ~174k rounded up to 200.)


	if (currentBalance.lt(requiredMinimum)) {
		throw new Error(`Balance won't cover minting the collection. Required: ${requiredMinimum.toString()}, Balance: ${currentBalance.toString()}`)
	}
}

mintCollection('whatever')
