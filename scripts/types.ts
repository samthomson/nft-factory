
type NFTMetadataDraft = {
	attributes: {trait_type: string, value: string}[]
	description: string
	name: string
	localFilePath: string
}
export type NFTMetadata = Omit<NFTMetadataDraft, 'localFilePath'> & {
	image: string
}

export type ProspectiveCollection = {
	items: NFTMetadataDraft[]
}
