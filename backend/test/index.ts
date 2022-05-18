import { ethers } from 'hardhat';
import { expect } from 'chai';

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

describe('Ownable', () => {
  let contract: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const factory = await ethers.getContractFactory('KojoV1', owner);
    contract = await factory.deploy();
    await contract.deployed();
  });

  it('should create an owner on deploy.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await contract.owner();
    expect(valueAfterDeployment).not.to.be.empty;
    expect(valueAfterDeployment).to.equal(owner.address);
  });

  it('should allow the owner to update the owner.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await contract.owner();
    expect(valueAfterDeployment).not.to.be.empty;
    expect(valueAfterDeployment).to.equal(owner.address);

    // Test method execution.
    const method = contract.handleUpdateOwner(user.address);
    await expect(method).not.to.be.reverted;

    // Test new contract state after execution.
    const valueAfterExecution = await contract.owner();
    expect(valueAfterExecution).not.to.be.empty;
    expect(valueAfterExecution).to.equal(user.address);
  });

  it('should prohibit users to update the owner.', async () => {
    // Test contract state after deployment.
    const addressAfterDeployment = await contract.owner();
    expect(addressAfterDeployment).not.to.be.empty;
    expect(addressAfterDeployment).to.equal(owner.address);

    // Test method execution.
    const method = contract.connect(user).handleUpdateOwner(user.address);
    await expect(method).to.be.reverted;

    // Test new contract state after execution.
    const addressAfterExecution = await contract.owner();
    expect(addressAfterExecution).not.to.be.empty;
    expect(addressAfterExecution).to.equal(addressAfterDeployment);
  });
});

describe('Proxy', () => {
  let proxy: any;
  let contract: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const factory = await ethers.getContractFactory('KojoV1', owner);
    contract = await factory.deploy();

    const proxyFactory = await ethers.getContractFactory('KojoProxy', owner);
    proxy = await proxyFactory.deploy();

    await contract.deployed();
    await proxy.deployed();
  });

  it('should allow the owner to update the proxy address.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await proxy.current();
    expect(valueAfterDeployment).to.equal(EMPTY_ADDRESS);

    // Test method execution.
    const method = proxy.handleUpdateAddress(contract.address);
    await expect(method).not.to.be.reverted;

    // Test new contract state after execution.
    const valueAfterExecution = await proxy.current();
    expect(valueAfterExecution).not.to.be.empty;
    expect(valueAfterExecution).to.equal(contract.address);
  });
  it('should prohibit users to update the proxy address.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await proxy.current();
    expect(valueAfterDeployment).to.equal(EMPTY_ADDRESS);

    // Test method execution.
    const method = proxy.connect(user).handleUpdateAddress(contract.address);
    await expect(method).to.be.reverted;

    // Test new contract state after execution.
    const valueAfterExecution = await proxy.current();
    expect(valueAfterExecution).not.to.be.empty;
    expect(valueAfterExecution).to.equal(valueAfterDeployment);
  });
  it('should allow users to call functions via the proxy contract.', async () => {
    // ...
  });
  it('should revert payments to non-payable functions.', async () => {
    const method = owner.sendTransaction({ to: proxy.address, value: 1 });
    await expect(method).to.be.reverted;
  });
});

describe('ERC1155', () => {
  it('should mint a supply of fungible tokens on deploy.', async () => {
    // ...
  });

  describe('should allow the owner', () => {
    it('to mint fungible tokens.', async () => {
      // ...
    });
    it('to read a fungible token balance.', async () => {
      // ...
    });
    it('to transfer fungible tokens.', async () => {
      // ...
    });
    it('to burn fungible tokens.', async () => {
      // ...
    });
    it('to mint non-fungible tokens.', async () => {
      // ...
    });
    it('to read a non-fungible token balance.', async () => {
      // ...
    });
    it('to transfer non-fungible tokens.', async () => {
      // ...
    });
    it('to update the URI-address of non-fungible tokens.', async () => {
      // ...
    });
    it('to burn non-fungible tokens.', async () => {
      // ...
    });
  });

  describe('should allow users', () => {
    it('to read a fungible token balance.', async () => {
      // ...
    });
    it('to transfer fungible tokens.', async () => {
      // ...
    });
    it('to mint non-fungible tokens.', async () => {
      // ...
    });
    it('to read a non-fungible token balance.', async () => {
      // ...
    });
    it('to transfer non-fungible tokens.', async () => {
      // ...
    });
  });

  describe('should prohibit users', () => {
    it('to mint fungible tokens.', async () => {
      // ...
    });
    it('to burn fungible tokens.', async () => {
      // ...
    });
    it('to update the URI-address of non-fungible tokens.', async () => {
      // ...
    });
    it('to burn non-fungible tokens.', async () => {
      // ...
    });
  });
});

describe('Storage', () => {
  let contract: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const factory = await ethers.getContractFactory('KojoStorage', owner);
    contract = await factory.deploy();
    await contract.deployed();
  });

  it('should create a start capital on deploy.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await contract.startCapital();
    expect(valueAfterDeployment).not.to.be.empty;
    expect(valueAfterDeployment).not.to.equal(0);
  });
  it('should create a token sensitivity on deploy.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await contract.tokenSensitivity();
    expect(valueAfterDeployment).not.to.be.empty;
    expect(valueAfterDeployment).not.to.equal(0);
  });
  it('should create a watering cost on deploy.', async () => {
    // Test contract state after deployment.
    const valueAfterDeployment = await contract.wateringCost();
    expect(valueAfterDeployment).not.to.be.empty;
    expect(valueAfterDeployment).not.to.equal(0);
  });

  describe('should allow the owner', () => {
    it('to update the start capital.', async () => {
      // Test contract state after deployment.
      const valueAfterDeployment = await contract.startCapital();
      expect(valueAfterDeployment).not.to.be.empty;
      expect(valueAfterDeployment).not.to.equal(0);

      // Test method execution.
      const method = contract.handleUpdateStartCapital(32);
      await expect(method).not.to.be.reverted;

      // Test new contract state after execution.
      const valueAfterExecution = await contract.startCapital();
      expect(valueAfterExecution).not.to.be.empty;
      expect(valueAfterExecution).to.equal(32);
    });
    it('to update the token sensitivity.', async () => {
      // Test contract state after deployment.
      const valueAfterDeployment = await contract.tokenSensitivity();
      expect(valueAfterDeployment).not.to.be.empty;
      expect(valueAfterDeployment).not.to.equal(0);

      // Test method execution.
      const method = contract.handleUpdateTokenSensitivity(32);
      await expect(method).not.to.be.reverted;

      // Test new contract state after execution.
      const valueAfterExecution = await contract.tokenSensitivity();
      expect(valueAfterExecution).not.to.be.empty;
      expect(valueAfterExecution).to.equal(32);
    });
    it('to update the watering cost.', async () => {
      // Test contract state after deployment.
      const valueAfterDeployment = await contract.wateringCost();
      expect(valueAfterDeployment).not.to.be.empty;
      expect(valueAfterDeployment).not.to.equal(0);

      // Test method execution.
      const method = contract.handleUpdateWateringCost(32);
      await expect(method).not.to.be.reverted;

      // Test new contract state after execution.
      const valueAfterExecution = await contract.wateringCost();
      expect(valueAfterExecution).not.to.be.empty;
      expect(valueAfterExecution).to.equal(32);
    });
  });

  describe('should prohibit users', () => {
    it('to update the start capital.', async () => {
      // Test contract state after deployment.
      const valueAfterDeployment = await contract.startCapital();
      expect(valueAfterDeployment).not.to.be.empty;
      expect(valueAfterDeployment).not.to.equal(0);

      // Test method execution.
      const method = contract.connect(user).handleUpdateStartCapital(32);
      await expect(method).to.be.reverted;

      // Test new contract state after execution.
      const addressAfterExecution = await contract.startCapital();
      expect(addressAfterExecution).not.to.be.empty;
      expect(addressAfterExecution).to.equal(valueAfterDeployment);
    });
    it('to update the token sensitivity.', async () => {
      // Test contract state after deployment.
      const valueAfterDeployment = await contract.tokenSensitivity();
      expect(valueAfterDeployment).not.to.be.empty;
      expect(valueAfterDeployment).not.to.equal(0);

      // Test method execution.
      const method = contract.connect(user).handleUpdateTokenSensitivity(32);
      await expect(method).to.be.reverted;

      // Test new contract state after execution.
      const addressAfterExecution = await contract.tokenSensitivity();
      expect(addressAfterExecution).not.to.be.empty;
      expect(addressAfterExecution).to.equal(valueAfterDeployment);
    });
    it('to update the watering cost.', async () => {
      // Test contract state after deployment.
      const valueAfterDeployment = await contract.wateringCost();
      expect(valueAfterDeployment).not.to.be.empty;
      expect(valueAfterDeployment).not.to.equal(0);

      // Test method execution.
      const method = contract.connect(user).handleUpdateWateringCost(32);
      await expect(method).to.be.reverted;

      // Test new contract state after execution.
      const addressAfterExecution = await contract.wateringCost();
      expect(addressAfterExecution).not.to.be.empty;
      expect(addressAfterExecution).to.equal(valueAfterDeployment);
    });
  });
});

describe('Utils', () => {
  it('should allow users to calculate their monthly token reward.', async () => {
    // ...
  });
});

describe('Main', () => {
  it('should create a store on deploy.', async () => {
    // ...
  });
  it('should create utils on deploy.', async () => {
    // ...
  });
  it('should create a token on deploy.', async () => {
    // ...
  });
  it('should be able to kill plant tokens.', async () => {
    // ...
  });

  describe('should allow the owner', () => {
    it('to update the store address.', async () => {
      // ...
    });
    it('to update the utils address.', async () => {
      // ...
    });
    it('to update the token address.', async () => {
      // ...
    });
  });

  describe('should allow users', () => {
    it('to claim a start capital when new.', () => {
      // ...
    });
    it('to claim a monthly reward.', () => {
      // ...
    });
    it('to buy seeds/plants.', () => {
      // ...
    });
    it('to see their capital token balance.', () => {
      // ...
    });
    it('to transfer capital tokens.', () => {
      // ...
    });
    it('to see their bought plants.', () => {
      // ...
    });
    it('to buy plant health.', () => {
      // ...
    });
    it('to transfer a plant.', () => {
      // ...
    });
  });

  describe('should prohibit users', () => {
    it('to update the store address.', async () => {
      // ...
    });
    it('to update the utils address.', async () => {
      // ...
    });
    it('to update the token address.', async () => {
      // ...
    });
    it('to claim a start capital when not new.', () => {
      // ...
    });
    it('to claim a monthly reward when not rewarded.', () => {
      // ...
    });
  });
});
