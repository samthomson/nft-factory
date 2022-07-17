import { ethers , BigNumber as BigNumberEthers } from 'ethers'
import { BigNumber } from 'bignumber.js'
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import Web3 from 'web3'
import * as Constants from './constants'

import ERC20ABI from './abis/ERC20.json'
const { PUBLIC_KEY, MINTING_CONTRACT_ADDRESS_POLYGON } = process.env

const getBalanceForAToken = async (contract: string): Promise<BigNumber> => {

	// todo: why is this a websocket provider?
	const provider = new ethers.providers.WebSocketProvider((process.env.API_URL as string))

	const Matic = new ethers.Contract(Constants.MATIC_ADDRESS, ERC20ABI, provider);
	const balance: BigNumberEthers = await Matic.balanceOf(process.env.PUBLIC_KEY)

	console.log('balance retrieved: ', balance.toString())
	return new BigNumber(balance.toHexString());
}

export const getMaticBalance = async (): Promise<BigNumber> => {
	return await getBalanceForAToken(Constants.MATIC_ADDRESS)
}

export const currentGasPrice = async (): Promise<string> => {
	const provider = new Web3.providers.HttpProvider(process.env.API_URL as string)
	const web3 = new Web3(provider)
	const gasPrice = await web3.eth.getGasPrice()
	// todo: estimate with realistic tx data
	const gasEstimate = await web3.eth.estimateGas({
		from: PUBLIC_KEY,
		to: MINTING_CONTRACT_ADDRESS_POLYGON
	})
	console.log('gas', {gasPrice, gasEstimate})
	return ''
}
