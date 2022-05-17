// import { expect } from "chai";
// import { ethers } from "hardhat";

describe("Ownable", () => {
  it("should create an owner on deploy.", async () => {
    // ...
  });
  it("should enable the owner to update the owner.", async () => {
    // ...
  });
  it("should disabled users to update the owner.", async () => {
    // ...
  });
});

describe("Proxy", () => {
  it("should enable users to call functions on the proxy contract.", async () => {
    // ...
  });
  it("should enable the owner to update the proxy address.", async () => {
    // ...
  });
  it("should disable users to update the proxy address.", async () => {
    // ...
  });
  it("should revert payments to non-payable functions.", async () => {
    // ...
  });
});

describe("ERC1155", () => {
  it("should mint a supply of fungible tokens on deploy.", async () => {
    // ...
  });

  it("should enable the owner to mint fungible tokens.", async () => {
    // ...
  });
  it("should disable users to mint fungible tokens.", async () => {
    // ...
  });
  it("should enable the owner to burn fungible tokens.", async () => {
    // ...
  });
  it("should disable users to burn fungible tokens.", async () => {
    // ...
  });
  it("should enable users to read their fungible tokens balance.", async () => {
    // ...
  });
  it("should enable users to transfer fungible tokens.", async () => {
    // ...
  });

  it("should enable the owner to update the URI-address of non-fungible tokens.", async () => {
    // ...
  });
  it("should disable users to update the URI-address of non-fungible tokens.", async () => {
    // ...
  });
  it("should enable the owner to burn non-fungible tokens.", async () => {
    // ...
  });
  it("should disable users to burn non-fungible tokens.", async () => {
    // ...
  });  
  it("should enable users to mint non-fungible tokens.", async () => {
    // ...
  });
  it("should enable users to read their non-fungible tokens balance.", async () => {
    // ...
  });
  it("should enable users to transfer non-fungible tokens.", async () => {
    // ...
  });
});

describe("Storage", () => {
  it("should enable the owner to update the start capital.", async () => {
    // ...
  });
  it("should disable users to update the start capital.", async () => {
    // ...
  });
  it("should enable the owner to update the token sensitivity.", async () => {
    // ...
  });
  it("should disable users to update the token sensitivity.", async () => {
    // ...
  });
  it("should enable the owner to update the watering cost.", async () => {
    // ...
  });
  it("should disable users to update the watering cost.", async () => {
    // ...
  });
});

describe("Utils", () => {
  it("should enable users to calculate their monthly token reward.", async () => {
    // ...
  });
});

describe("Main", () => {
  it("should create a store on deploy.", async () => {
    // ...
  });
  it("should create utils on deploy.", async () => {
    // ...
  });
  it("should create a token on deploy.", async () => {
    // ...
  });

  it("should enable the owner to update the store address.", async () => {
    // ...
  });
  it("should disable users to update the store address.", async () => {
    // ...
  });
  it("should disable users to update the utils address.", async () => {
    // ...
  });
  it("should enable the owner to update the utils address.", async () => {
    // ...
  });
  it("should enable the owner to update the token address.", async () => {
    // ...
  });
  it("should disable users to update the token address.", async () => {
    // ...
  });
  // it("should enable the owner to update the start capital.", async () => {
  //   // ...
  // });
  // it("should disable users to update the start capital.", async () => {
  //   // ...
  // });
  // it("should enable the owner to update the token sensitivity.", async () => {
  //   // ...
  // });
  // it("should disable users to update the token sensitivity.", async () => {
  //   // ...
  // });
  // it("should enable the owner to update the watering cost.", async () => {
  //   // ...
  // });
  // it("should disable users to update the watering cost.", async () => {
  //   // ...
  // });

  it("should enable users to mint water tokens.", () => {
    // ...
  });
  it("should enable users to read a water token balance.", () => {
    // ...
  });
  it("should enable users to transfer water tokens.", () => {
    // ...
  });

  it("should enable users to mint plant tokens.", () => {
    // ...
  });
  it("should enable users to read a plant token balance.", () => {
    // ...
  });
  it("should enable users to transfer plant tokens.", () => {
    // ...
  });
  it("should enable the contract to kill plant tokens.", () => {
    // ...
  });
});
