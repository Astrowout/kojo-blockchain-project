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

  // We get the contracts to deploy
  const KojoStorage = await ethers.getContractFactory('KojoStorage');
  const KojoUtils = await ethers.getContractFactory('KojoUtils');
  const KojoAPIConsumer = await ethers.getContractFactory('KojoAPIConsumer');
  const KojoBurn = await ethers.getContractFactory('KojoBurn');
  const KojoV1 = await ethers.getContractFactory('KojoV1');

  // We deploy every upgradeable contract
  const store = await upgrades.deployProxy(KojoStorage);

  // We deploy every contract (not upgradeable)
  const utils = await KojoUtils.deploy();
  const api = await KojoAPIConsumer.deploy();
  const burn = await KojoBurn.deploy();

  // We wait for the nested contracts to be deployed
  await store.deployed();
  await utils.deployed();
  await api.deployed();
  await burn.deployed();

  // We deploy our main contract as upgradeable and set the addresses of the nested contracts
  const main = await upgrades.deployProxy(KojoV1, [store.address, utils.address, api.address, burn.address]);

  // We wait for the main contract to be deployed
  await main.deployed();

  // We transfer the ownership of the nested contracts to the main contract
  await store.transferOwnership(main.address);

  console.log({
    store: {
      address: store.address,
      owner: await store.owner(),
    },
    utils: {
      address: utils.address,
      owner: null, // This contract is not owned by anyone
    },
    api: {
      address: api.address,
      owner: await api.owner(),
    },
    burn: {
      address: burn.address,
      owner: await burn.owner(),
    },
    main: {
      address: main.address,
      owner: await main.owner(),
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
