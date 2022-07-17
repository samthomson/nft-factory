import dotenv from 'dotenv'
dotenv.config()
import * as Constants from './constants'

const { API_URL, PUBLIC_KEY, PRIVATE_KEY, MINTING_CONTRACT_ADDRESS, MINTING_CONTRACT_ADDRESS_POLYGON, NFT_METADATA_IPFS_ID } = process.env

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json')
const nftContract = new web3.eth.Contract(contract.abi, MINTING_CONTRACT_ADDRESS_POLYGON)

export const mintNFT = async (tokenURI: string): Promise<string | undefined> => {

	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

	//the transaction
	const tx = {
	  'from': PUBLIC_KEY,
	  'to': MINTING_CONTRACT_ADDRESS_POLYGON,
	  'nonce': nonce,
	  // todo: split this to gas price and gas limit?
	  'gas': Constants.GAS_NFT_MINT,
	  'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
	}

	try {
		const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
		
		const { transactionHash } = await web3.eth.sendSignedTransaction(
			signedTx.rawTransaction
		)
		return transactionHash
	}
	catch (err)  {
		console.error("failed to sign/mint tx/nft", err)
	}
}



const mintCollection = async () => {
	const nftMetadatas: string[] = (NFT_METADATA_IPFS_ID || '').split(',')

	for (let i = 0; i < nftMetadatas.length; i++) {
		const IPFSID = nftMetadatas[i]
		await mintNFT(`ipfs://${IPFSID}`)
	}
}

// mintCollection()
// mintNFT(`https://bafybeibls2mlspjlvff6smuqngxxgbf62j474eog5rck5at6ta4a6pid4m.ipfs.dweb.link/nft-metadata-asilah.json`)