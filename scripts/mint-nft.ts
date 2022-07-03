require("dotenv").config()

const { API_URL, PUBLIC_KEY, PRIVATE_KEY, MINTING_CONTRACT_ADDRESS, MINTING_CONTRACT_ADDRESS_POLYGON, NFT_METADATA_IPFS_ID } = process.env

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json')
const nftContract = new web3.eth.Contract(contract.abi, MINTING_CONTRACT_ADDRESS_POLYGON)

const mintNFT = async (tokenURI: string) => {

	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

	//the transaction
	const tx = {
	  'from': PUBLIC_KEY,
	  'to': MINTING_CONTRACT_ADDRESS_POLYGON,
	  'nonce': nonce,
	  'gas': 500000,
	  'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
	}

	try {
		const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
		
		const { transactionHash } = await web3.eth.sendSignedTransaction(
			signedTx.rawTransaction
		)
		console.log(`The hash of your transaction is: ${transactionHash}`)
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

mintCollection()
// mintNFT(`ipfs://${NFT_METADATA_IPFS_ID}`)