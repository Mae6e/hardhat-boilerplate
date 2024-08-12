require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");


// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");





/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    bsc: {
      chainId: 97,
      url: `https://bsc-testnet.infura.io/v3/517e9678bcd54c86bd1285f8c9385e92`,
      accounts: ["3d16bfe1ced220d7bbe2cd3d679d34a79c9863e0dc8721f99ebb727e9a1c53e3"]
    },
    // etherscan: {
    //   // Your API key for BscScan
    //   // Get one at https://bscscan.com/myapikey
    //   chainId: 97,
    //   url: "https://api-testnet.bscscan.com/api",
    //   apiKey: "CD8GYF5YEY6RYYK715EQ6ZBFRXEKYFB67G",
    // },
  },
  etherscan: {
    url: "https://api-testnet.bscscan.com/api",
    apiKey: "CD8GYF5YEY6RYYK715EQ6ZBFRXEKYFB67G"
  },
  solidity: "0.8.17",
};
