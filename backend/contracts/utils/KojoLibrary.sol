// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

library Structs {
  struct Plant {
    uint256 id;
    address owner;
    uint256 growthLevel;
    uint256 hydrationDegree;
    uint256 healthDegree;
    bool isPresent;
  }

  struct Participant {
    uint256 id;
    address account;
    uint256 parcipationDegree;
    uint256 loyaltyLevel;
    uint256 experienceLevel;
    bool isPresent;
  }
}
