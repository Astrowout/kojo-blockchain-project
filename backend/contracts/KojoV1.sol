// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./utils/KojoStorage.sol";
import "./utils/KojoUtils.sol";

import "./token/KojoERC1155.sol";

contract KojoV1 is KojoERC1155 {
  KojoStorage internal store;
  KojoUtils internal utils;

  uint256 public constant FUNGIBLE_TOKEN = 0;
  uint256 public constant NON_FUNGIBLE_TOKEN = 1;

  constructor() {
    store = new KojoStorage();
    store = new KojoStorage();

    _mint(msg.sender, FUNGIBLE_TOKEN, 10**18, "");
  }

  // Allows the owner to update the store.
  function handleUpdateStoreAddress(address location) public onlyOwner {
    store = KojoStorage(location);
  }

  // Allows the owner to update utils.
  function handleUpdateUtilsAddress(address location) public onlyOwner {
    utils = KojoUtils(location);
  }

  // Allows the owner to update the start capital given to users.
  function handleUpdateStartCapital(uint256 startCapital) public onlyOwner {
    store.handleUpdateStartCapital(startCapital);
  }

  // Allows the  owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 tokenSensitivity)
    public
    onlyOwner
  {
    store.handleUpdateTokenSensitivity(tokenSensitivity);
  }

  // Allows the  owner to update the cost of watering a seed/plant.
  function handleUpdateWateringCost(uint256 wateringCost) public onlyOwner {
    store.handleUpdateWateringCost(wateringCost);
  }

  // Allows users to claim a start capital when new.
  function handleClaimStartCapital(address to) public view {
    console.log(to);
  }

  // Allows users to claim a monthly reward when gained.
  function handleClaimMonthlyReward(address to) public view {
    console.log(to);
  }

  // Allows users to buy a seed/plant.
  function handleBuyPlant(address account) public {
    _mint(account, NON_FUNGIBLE_TOKEN, 1, "");
  }
}
