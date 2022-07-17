import * as Utils from './utils'


const mintCollection = async (collectionFilePath: string): Promise<void> => {
	// check for all env vars
	Utils.ensureEnvVarsAreNotEmpty(['API_URL', 'PRIVATE_KEY', 'PUBLIC_KEY', 'MINTING_CONTRACT_ADDRESS_POLYGON', 'WEB3STORAGE_API_KEY'])
	// validate collection
	// check balance is enough
	// mint each NFT
}

mintCollection()
