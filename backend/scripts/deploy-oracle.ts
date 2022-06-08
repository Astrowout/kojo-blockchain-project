import { ethers } from 'hardhat';

const MUMBAI_TESTNET_LINK_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const NODE_ADDRESS = "0xc540Bed709e1b5D503cf04E10d200253613a3373";

const main = async () => {
  // We get the contract to deploy
  const KojoOperator = await ethers.getContractFactory('Operator');

  // We deploy the contract (not upgradeable)
  const operator = await KojoOperator.deploy(MUMBAI_TESTNET_LINK_ADDRESS, process.env.OWNER_ADDRESS!);

  // We wait for the KojoOperator contract to be deployed
  await operator.deployed();

  // We transfer the ownership of the nested contracts to the main contract
  await operator.setAuthorizedSenders([NODE_ADDRESS]);

  console.log({
    oracle: {
      address: operator.address,
      owner: await operator.owner(),
    },
  });
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
