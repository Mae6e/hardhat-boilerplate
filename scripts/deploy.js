// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const hardhat = require("hardhat");
const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await hardhat.ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await hardhat.ethers.getContractFactory("BEP20ERR");
  const token = await Token.deploy();
  await token.deployed();


  console.log("Token address:", token.address);


  //wait for 5 block transactions to ensure deployment before verifying
  await token.deployTransaction.wait(5);
  //https://testnet.bscscan.com/address/0x43C76427cc0315b4b67357f1F4950034450095c1#code

  //verify (source: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#using-programmatically)
  await hardhat.run("verify:verify", {
    address: token.address,
    contract: "contracts/Token.sol:BEP20ERR", //Filename.sol:ClassName
    // constructorArguments: [arg1, arg2, arg3],
  });



  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("BEP20ERR");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  });
}

// async function verify() {
//   // Delay for Verification
//   await sleep(45 * 1000);
//   console.log("Contract Verification Started...");
//   // hardhat.run("verify:verify", {
//   //   address: '0xB2894169C21EdA3b1541e97F9aAb1b9D10Ed4188'
//   // });


//   await hardhat.run("verify:verify", {
//     address: "0x0522b7c0E777cb6D1DCE5EB41058D1Eb1cC4adCa",
//     contract: "contracts/Token.sol:BEP20ERR" //Filename.sol:ClassName
//     //constructorArguments: [arg1, arg2, arg3],
//   });
// }

main()
  //verify()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
