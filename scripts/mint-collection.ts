// import { BigNumber, utils } from 'ethers'
import { BigNumber } from 'bignumber.js'
import dotenv from 'dotenv'

import * as Utils from './utils'
import * as Blockchain from './blockchain'
import * as Web3Storage from './webstorage'
import * as NFTMinter from './mint-nft'
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

const createNFT = async (draftNFT: Types.NFTMetadataDraft) => {
	// upload image 
	const uid = await Web3Storage.storeLocalFileToWeb3Storage(draftNFT.localFilePath)

	console.log('image uploaded with id:', uid)
	// create/upload metadata file
	const { attributes, description, name } = draftNFT
	const NFTMetadata = {
		attributes, description, name, image: uid
	}
	const nftMetadataID = await Web3Storage.storeNFTMetadataToWeb3Storage(NFTMetadata, draftNFT.nftFileName)

	console.log('nft metadata file uploaded with id:', nftMetadataID)

	// lastly, mint the NFT itself
	const nftMintTx = await NFTMinter.mintNFT(nftMetadataID)

	console.log(`nft ${nftMintTx ? `minted with tx: ${nftMintTx}` : 'failed to mint...'}`)
}

// mintCollection('whatever')
const drafts: Record<number, Types.NFTMetadataDraft> = {
	7: {
		attributes: [{trait_type: "Country", value: "Morocco"}],
		description: "A leather tannery in Fez, northern Morocco.",
		name: "Fez Tannery, Morocco.",
		localFilePath: "/home/sam/code/nft-factory/scripts/test-files/7_Fez.png",
		nftFileName: "nft-metadata-travel-7.json"
	},
	9: {
		attributes: [{trait_type: "Country", value: "Morocco"}],
		description: "Surf sunset, Morocco.",
		name: "Surf sunset, Morocco.",
		localFilePath: "/home/sam/code/nft-factory/scripts/test-files/9_surf_sunset.png",
		nftFileName: "nft-metadata-travel-9.json"
	}
}

createNFT(drafts[9])