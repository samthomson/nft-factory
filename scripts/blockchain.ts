import { ethers , BigNumber as BigNumberEthers } from 'ethers'
import { BigNumber } from 'bignumber.js'

import * as Constants from './constants'

import ERC20ABI from './abis/ERC20.json'


const getBalanceForAToken = async (contract: string): Promise<BigNumber> => {

	const provider = new ethers.providers.WebSocketProvider((process.env.API_URL as string))

	const Matic = new ethers.Contract(Constants.MATIC_ADDRESS, ERC20ABI, provider);
	const balance: BigNumberEthers = await Matic.balanceOf(process.env.PUBLIC_KEY)

	console.log('balance retrieved: ', balance.toString())
	return new BigNumber(balance.toHexString());
}

export const getMaticBalance = async (): Promise<BigNumber> => {
	return await getBalanceForAToken(Constants.MATIC_ADDRESS)
}