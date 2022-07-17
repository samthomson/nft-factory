
export type NFTMetadataDraft = {
	attributes: {trait_type: string, value: string}[]
	description: string
	name: string
	localFilePath: string
	nftFileName: string
}
export type NFTMetadata = Omit<NFTMetadataDraft, 'localFilePath' | 'nftFileName'> & {
	image: string
}

export type ProspectiveCollection = {
	items: NFTMetadataDraft[]
}
