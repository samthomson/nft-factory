# nft minting

based on https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft

- install deps in package.json
- set api url and wallet private key into .env
- change both constructor args in `contracts/MyNFT.sol` to set the NFT collection name
- set network name (in two places) in config: `hardhat.config.js`
- compile `npx hardhat compile`
- deploy contract `yarn run deploy`
	- take the outputted contract address and store in `MINTING_CONTRACT_ADDRESS`
- making NFTS:
	- [upload a file to IPFS](https://app.pinata.cloud/)
	- copy/rename `nft-seed-data/nft-metadata-sample.json` and fill in with your uploaded file's IPFS id, and other metadata.
	- upload that metadata file to IPFS, then store it's IPFS id as `NFT_METADATA_IPFS_ID` in `env`
	- run mint contract `node scripts/mint-nft.js`