/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")

module.exports = {
  solidity: "0.8.17",
  network: {
    hardhat: {
      chainId: 1337
    }
  }
};
