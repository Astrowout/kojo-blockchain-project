import { ethers, upgrades } from 'hardhat';

const main = async () => {
  console.log("Deploying kojo contracts...");

  // We get the contracts to deploy
  const KojoStorage = await ethers.getContractFactory('KojoStorage');
  const KojoUtils = await ethers.getContractFactory('KojoUtils');
  const KojoAPIConsumer = await ethers.getContractFactory('KojoAPIConsumer');
  const KojoBurn = await ethers.getContractFactory('KojoBurn');
  const KojoV1 = await ethers.getContractFactory('KojoV1');

  // Deploy the utils contract
  const utils = await KojoUtils.deploy();
  await utils.deployed();

  // Deploy the burn contract
  const burn = await KojoBurn.deploy();
  await burn.deployed();

  // Deploy the API consumer contract
  const api = await KojoAPIConsumer.deploy();
  await api.deployed();

  // We deploy every upgradeable contract
  const store = await upgrades.deployProxy(KojoStorage, [api.address]);
  await store.deployed();

  // We deploy our main contract as upgradeable and set the addresses of the nested contracts
  const main = await upgrades.deployProxy(KojoV1, [store.address, utils.address, api.address, burn.address]);
  await main.deployed();

  // We transfer the ownership of the nested contracts to the main contract
  await store.transferOwnership(main.address);
  await api.setStorageContract(store.address);

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

  console.log("Deployment complete!");
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
