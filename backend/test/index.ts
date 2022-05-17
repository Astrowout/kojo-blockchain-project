import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Ownable', () => {
  let contract: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const baseFactory = await ethers.getContractFactory('KojoV1', owner);
    contract = await baseFactory.deploy();
    await contract.deployed();
  });

  it('should create an owner on deploy.', async () => {
    const address = await contract.owner();
    expect(address).not.to.be.empty;
    expect(address).to.equal(owner.address);
  });

  it('should enable the owner to update the owner.', async () => {
    const address = await contract.owner();
    expect(address).not.to.be.empty;
    expect(address).to.equal(owner.address);
    await contract.handleUpdateOwner(user.address);
    const newAddress = await contract.owner();
    expect(newAddress).not.to.be.empty;
    expect(newAddress).to.equal(user.address);
  });

  it('should disable users to update the owner.', async () => {
    const address = await contract.owner();
    expect(address).not.to.be.empty;
    expect(address).to.equal(owner.address);
    await expect(
      contract.connect(user).handleUpdateOwner(user.address),
    ).to.be.revertedWith('Action not allowed.');
  });
});

describe('Proxy', () => {
  it('should enable the owner to update the proxy address.', async () => {
    // ...
  });
  it('should enable users to call functions on the proxy contract.', async () => {
    // ...
  });
  it('should disable users to update the proxy address.', async () => {
    // ...
  });
  it('should revert payments to non-payable functions.', async () => {
    // ...
  });
});

describe('ERC1155', () => {
  it('should mint a supply of fungible tokens on deploy.', async () => {
    // ...
  });

  describe('should enable the owner', () => {
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

  describe('should enable users', () => {
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

  describe('should disable users', () => {
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
  describe('should enable the owner', () => {
    it('to update the start capital.', async () => {
      // ...
    });
    it('to update the token sensitivity.', async () => {
      // ...
    });
    it('to update the watering cost.', async () => {
      // ...
    });
  });

  describe('should disable users', () => {
    it('to update the start capital.', async () => {
      // ...
    });
    it('to update the token sensitivity.', async () => {
      // ...
    });
    it('to update the watering cost.', async () => {
      // ...
    });
  });
});

describe('Utils', () => {
  it('should enable users to calculate their monthly token reward.', async () => {
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
  it('should be able to kill plant tokens.', () => {
    // ...
  });

  describe('should enable the owner', () => {
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

  describe('should enable users', () => {
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

  describe('should disable users', () => {
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
