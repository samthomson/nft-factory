
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
import "@nomiclabs/hardhat-ethers";
const { API_URL, PRIVATE_KEY, POLYGON_API_URL } = process.env;
module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      polygon: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
