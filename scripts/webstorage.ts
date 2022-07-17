import { Web3Storage, File, getFilesFromPath, CIDString } from 'web3.storage'
// require("dotenv").config()
// require('dotenv').config({path: __dirname + '../.env'})


/**
 * 
 * path structure
 * 
 * root: /dapps/nft-factory/
 * images: ./images
 * nfts: ./nfts/${collection}/
 * 
 * - query and retrieve all nfts metadatas files
 * - store an image in ipfs
 * - store an nft metadata file
 * 
 */
const makeStorageClient = () => {
	const token = (process.env.WEB3STORAGE_API_KEY as string)
	// @ts-ignore
	return new Web3Storage({ token })
}

const getFiles = async (path: string) => {
	const files = await getFilesFromPath(path)
	console.log(`read ${files.length} file(s) from ${path}`)
	return files
}

const storeFiles = async (files: File[]) => {
	const client = makeStorageClient()
	const cid = await client.put(files)
	console.log('stored files with cid:', cid)
	return cid
}

const testStoreSomeLocalFiles = async () => {
	const path = './test-files/test'
	const files = await getFiles(path)

	console.log('files', files)

	const client = makeStorageClient()
	const cid = await client.put(files)
	console.log('stored files with cid:', cid)
	return cid
}

const testStoreSingleLocalFile = async () => {
	const path = './test-files/Screenshot from 2022-07-16 20-45-40.png'
	const files = await getFiles(path)

	console.log('files', files)


	const client = makeStorageClient()
	const cid = await client.put(files)
	console.log('stored files with cid:', cid)
	return cid
}

const storeWeb3StorageFile = async (file: File): Promise<CIDString> => {

	const client = makeStorageClient()
	const cid = await client.put([file])
	console.log('stored files with cid:', cid)
	return cid
}


type NFTMetadataDraft = {
	attributes: {trait_type: string, value: string}[]
	description: string
	name: string
	localFilePath: string
}
type NFTMetadata = Omit<NFTMetadataDraft, 'localFilePath'> & {
	image: string
}

const testStoreNFTMetaData = async () => {
	// draft NFT data
	const NFTMetadataJson: NFTMetadata = JSON.parse(`{
		"attributes": [
			{
			  "trait_type": "Country",
			  "value": "Morocco"
			}
		  ],
		  "description": "Spirit sitting outside Sundesk, Taghazout Morocco.",
		  "image": "https://bafybeiay6tqzf3qyhq5l72asvlognazom6unlq74idclbwdmcdva3p45je.ipfs.dweb.link/Screenshot%20from%202022-07-16%2020-50-53.png",
		  "name": "Spirit, Taghazout."
	}`)

	// create nft metadata file
	const NFTMetadataFile = Buffer.from(JSON.stringify(NFTMetadataJson))

	const cid = await storeWeb3StorageFile(
		new File ([NFTMetadataFile], 'nft-metadata-spirit.json')
	)
	console.log('stored files with cid:', cid)
	return cid

}


// testStoreSomeLocalFiles()
// testStoreSingleLocalFile()
testStoreNFTMetaData()