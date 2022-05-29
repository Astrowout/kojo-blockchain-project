// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from 'hardhat';

const main = async () => {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const KojoERC1155 = await ethers.getContractFactory('KojoERC1155');
  // const KojoLibrary = await ethers.getContractFactory('KojoLibrary');
  // const KojoStorage = await ethers.getContractFactory('KojoStorage');
  // const KojoUtils = await ethers.getContractFactory('KojoUtils');
  // const KojoAPIConsumer = await ethers.getContractFactory('KojoAPIConsumer');
  const KojoV1 = await ethers.getContractFactory('KojoV1');

  const token = await upgrades.deployProxy(KojoERC1155);
  const main = await KojoV1.deploy();

  await token.deployed();
  await main.deployed();

  console.log({
    token: token.address,
    main: main.address,
  });
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
