// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../access/KojoOwnable.sol";

contract KojoStorage is KojoOwnable {
  uint256 private startCapital;
  uint256 private tokenSensitivity;
  uint256 private wateringCost;

  constructor() {
    startCapital = 100;
    tokenSensitivity = 1;
    wateringCost = 1;
  }

  // Allows owner to update the start capital given to users.
  function handleUpdateStartCapital(uint256 _startCapital) public isOwner {
    startCapital = _startCapital;
  }

  // Allows owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 _tokenSensitivity)
    public
    isOwner
  {
    tokenSensitivity = _tokenSensitivity;
  }

  // Allows owner to update the cost of watering a seed/plant.
  function handleUpdateWateringCost(uint256 _wateringCost) public isOwner {
    wateringCost = _wateringCost;
  }
}
