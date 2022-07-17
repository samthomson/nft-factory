import { ethers } from 'ethers'

import * as Constants from './constants'

import ERC20ABI from './abis/ERC20.json'


const getBalanceForAToken = async (contract: string): Promise<number> => {

	const provider = new ethers.providers.WebSocketProvider((process.env.API_URL as string))

	const Matic = new ethers.Contract(Constants.MATIC_ADDRESS, ERC20ABI, provider);
	const balance = await Matic.balanceOf(process.env.PUBLIC_KEY);

	console.log('balance retrieved: ', balance)
	return balance;
}

export const getMaticBalance = async (): Promise<number> => {
	return await getBalanceForAToken(Constants.MATIC_ADDRESS)
}