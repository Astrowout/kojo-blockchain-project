// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./access/KojoOwnable.sol";
import "./utils/KojoStorage.sol";
import "./utils/KojoUtils.sol";

import "./token/KojoERC1155.sol";

contract KojoV1 is KojoERC1155 {
  KojoStorage private store;
  KojoUtils private utils;

  uint256 public constant FUNGIBLE_TOKEN = 0;
  uint256 public constant NON_FUNGIBLE_TOKEN = 1;

  constructor() {
    store = new KojoStorage();
    store = new KojoStorage();

    _mint(msg.sender, FUNGIBLE_TOKEN, 10**18, "");
  }

  // Enables the owner to update the store.
  function handleUpdateStoreAddress(address location) public onlyOwner {
    store = KojoStorage(location);
  }

  // Enables the owner to update utils.
  function handleUpdateUtilsAddress(address location) public onlyOwner {
    utils = KojoUtils(location);
  }

  // Enables the owner to update the start capital given to users.
  function handleUpdateStartCapital(uint256 startCapital) public onlyOwner {
    store.handleUpdateStartCapital(startCapital);
  }

  // Enables the  owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 tokenSensitivity)
    public
    onlyOwner
  {
    store.handleUpdateTokenSensitivity(tokenSensitivity);
  }

  // Enables the  owner to update the cost of watering a seed/plant.
  function handleUpdateWateringCost(uint256 wateringCost) public onlyOwner {
    store.handleUpdateWateringCost(wateringCost);
  }

  // Enables users to claim a start capital when new.
  function handleClaimStartCapital(address to) public view {
    console.log(to);
  }

  // Enables users to claim a monthly reward when gained.
  function handleClaimMonthlyReward(address to) public view {
    console.log(to);
  }

  // Enables users to buy a seed/plant.
  function handleBuyPlant(address account) public {
    _mint(account, NON_FUNGIBLE_TOKEN, 1, "");
  }

  // function handleCheckTokenBalance(address account)
  //   public
  //   view
  //   returns (uint256)
  // {
  //   uint256[2] memory ids;
  //   address[2] memory accounts;

  //   return balanceOfBatch(accounts, ids);
  // }

  // @TODO: Remove functio as it is automatically inherited from KojoERC1155.
  // Enables users to check their capital token balance.
  function handleCheckFungibleTokenBalance(address account)
    public
    view
    returns (uint256)
  {
    return balanceOf(account, FUNGIBLE_TOKEN);
  }

  // @TODO: Remove functio as it is automatically inherited from KojoERC1155.
  // Enables users to transfer capital tokens.
  function handleCheckNonFungibeTokenBalance(address account)
    public
    view
    returns (uint256)
  {
    return balanceOf(account, NON_FUNGIBLE_TOKEN);
  }
}
