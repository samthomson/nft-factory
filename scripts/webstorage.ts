import { Web3Storage, File, getFilesFromPath, CIDString } from 'web3.storage'

import * as Types from './types'
import dotenv from 'dotenv'
dotenv.config()


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
	return files
}

const storeFiles = async (files: File[]) => {
	const client = makeStorageClient()
	const cid = await client.put(files)
	return cid
}

/*
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
*/
const storeWeb3StorageFile = async (file: File): Promise<CIDString> => {
	const client = makeStorageClient()
	const cid = await client.put([file])
	return cid
}

/*
const testStoreNFTMetaData = async () => {
	// draft NFT data
	const NFTMetadataJson: Types.NFTMetadata = JSON.parse(`{
		"attributes": [
			{
			  "trait_type": "Country",
			  "value": "Morocco"
			}
		  ],
		  "description": "Asilah sunset, Morocco.",
		  "image": "https://bafybeih53pbfq4wkhaxfapxgkdmblssjndhdofoeu6eyf75t3x3r6p5sr4.ipfs.dweb.link/Screenshot%20from%202022-07-16%2020-45-40.png",
		  "name": "Asilah sunset, Morocco."
	}`)

	// create nft metadata file	
	await storeNFTMetadataToWeb3Storage(NFTMetadataJson, 'nft-metadata-asilah.json')
}
*/

export const storeLocalFileToWeb3Storage = async (localPath: string): Promise<string> => {
	const files = await getFiles(localPath)
	const client = makeStorageClient()
	const cid = await client.put(files)
	return cid.toString()
}

export const storeNFTMetadataToWeb3Storage = async (NFTMetadata: Types.NFTMetadata, newFileName: string): Promise<string> => {
	const NFTMetadataFile = Buffer.from(JSON.stringify(NFTMetadata))

	const cid = await storeWeb3StorageFile(
		new File ([NFTMetadataFile], newFileName)
	)
	return cid.toString() 
}
