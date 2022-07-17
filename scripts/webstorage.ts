import { Web3Storage, File, getFilesFromPath } from 'web3.storage'
require("dotenv").config()
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

testStoreSomeLocalFiles()