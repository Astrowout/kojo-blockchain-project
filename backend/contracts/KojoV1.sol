// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./access/KojoOwnable.sol";
import "./utils/KojoStorage.sol";
import "./utils/KojoUtils.sol";

import "./token/KojoERC1155.sol";

contract KojoV1 is KojoOwnable {
  KojoStorage private store;
  KojoUtils private utils;
  KojoERC1155 private token;

  constructor() {
    store = new KojoStorage();
    utils = new KojoUtils();
    token = new KojoERC1155();
  }

  // Enables the owner to update the store.
  function handleUpdateStoreAddress(address location) public isOwner {
    store = KojoStorage(location);
  }

  // Enables the owner to update utils.
  function handleUpdateUtilsAddress(address location) public isOwner {
    utils = KojoUtils(location);
  }

  // Enables the owner to update the token.
  function handleUpdateTokenAddress(address location) public isOwner {
    token = KojoERC1155(location);
  }

  // Enables the owner to update the start capital given to users.
  function handleUpdateStartCapital(uint256 startCapital) public isOwner {
    store.handleUpdateStartCapital(startCapital);
  }

  // Enables the  owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 tokenSensitivity)
    public
    isOwner
  {
    store.handleUpdateTokenSensitivity(tokenSensitivity);
  }

  // Enables the  owner to update the cost of watering a seed/plant.
  function handleUpdateWateringCost(uint256 wateringCost) public isOwner {
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
  function handleBuyPlant(address to) public view {
    console.log(to);
  }

  // Enables users to check their capital token balance.
  function handleCheckCapitalTokenBalance(address to) public view {
    console.log(to);
  }

  // Enables users to transfer capital tokens.
  function handleCheckCapitalTokenBalance(
    address from,
    address to,
    uint256 amount
  ) public view {
    console.log(from, to, amount);
  }
}
