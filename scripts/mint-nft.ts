require("dotenv").config()

const { API_URL, PUBLIC_KEY, PRIVATE_KEY, MINTING_CONTRACT_ADDRESS, NFT_METADATA_IPFS_ID } = process.env

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json')
const nftContract = new web3.eth.Contract(contract.abi, MINTING_CONTRACT_ADDRESS)

const mintNFT = async (tokenURI: string) => {

	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

	//the transaction
	const tx = {
	  'from': PUBLIC_KEY,
	  'to': MINTING_CONTRACT_ADDRESS,
	  'nonce': nonce,
	  'gas': 500000,
	  'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
	}

	try {
		const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
		
		web3.eth.sendSignedTransaction(
			signedTx.rawTransaction,
			function (err: Error, hash: string) {
				if (!err) {
					console.log(`The hash of your transaction is: ${hash}`)
				} else {
					console.log('Something went wrong when submitting your transaction', err)
				}
			}
		)
	}
	catch (err)  {
		console.error("failed to sign/mint tx/nft", err)
	}

}


mintNFT(`ipfs://${NFT_METADATA_IPFS_ID}`)
