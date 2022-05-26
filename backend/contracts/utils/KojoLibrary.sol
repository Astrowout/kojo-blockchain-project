// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

library Structs {
  struct Plant {
    uint256 experiencePoints;
    uint256 level;
    uint256 lifes;
    uint256 levelCost;
    bool isPresent;
  }

  struct Participant {
    uint256 experiencePoints;
    uint256 level;
    uint256[] plantIds;
    uint256 latestTokenAllowance;
    bool isPresent;
  }
}
