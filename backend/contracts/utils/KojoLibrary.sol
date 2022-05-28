// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

library Structs {
  struct Plant {
    // Grow phase.
    uint256 level;
    // Amount of fungible tokens spent on plant.
    uint256 experiencePoints;
    // Amount of hydration.
    uint256 lifes;
    // Amount of tokens needed to grow to a new phase.
    uint256 levelCost;
    // Internal selector.
    bool isPresent;
  }

  struct Participant {
    // Amount of multiplyer.
    uint256 level;
    // Amount of tokens  spent on any plant.
    uint256 experiencePoints;
    // ID's of plants the participant owns.
    uint256[] plantIds;
    // currentTokenAllowance; amount of fungible tokens the participant is allowed to claim.
    uint256 allowedTokenBalance;
    // Internal selector.
    bool isPresent;
  }
}
