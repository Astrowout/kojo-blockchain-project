// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../utils/KojoLibrary.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

contract KojoUtils {
  // Construct URI from Plant.
  function handleBuildURI(Structs.Plant memory plant)
    external
    pure
    returns (string memory _uri)
  {
    require(plant.isPresent, "Plant does not exist.");
    require(
      plant.level == 1
      || plant.level == 2
      || plant.level == 3
      || plant.level == 4
      || plant.level == 5,
      "Plant level does not exist."
    );
    require(
      plant.lifes == 1
      || plant.lifes == 2
      || plant.lifes == 3,
      "Plant lifes does not exist."
    );

    string memory base = "https://ipfs.io/ipfs/Qmayj2bo241oD2Xrkcpd8g76usfnK6sbLt9ZuvUJ4k6aXj/";
    string memory result = string(abi.encodePacked(
      base,
      StringsUpgradeable.toString(plant.typeId),
      "-",
      StringsUpgradeable.toString(plant.level),
      ".json"
    ));

    return result;
  }

  // Create new Participant without given tokenId.
  function handleRemoveTokenIdFromParticipant(
    Structs.Participant memory participant,
    uint256 tokenId
  ) external pure returns (Structs.Participant memory _participant) {
    uint256[] memory results = new uint256[](participant.plantIds.length - 1);

    for (uint256 i = 0; i < participant.plantIds.length; i++) {
      uint256 currentId = participant.plantIds[i];
      if (currentId != tokenId) {
        results[i] = currentId;
      }
    }

    participant.plantIds = results;

    return participant;
  }

  // Calculate allowed token balance for given Participant.
  function handleCalculateAllowedTokenBalanceFromParticipantLevel(
    Structs.Participant memory participant,
    uint256 amount
  ) external pure returns (uint256 _amount) {
    // Increase multiplier as participant level increases.
    return amount + ((amount * (participant.level - 1)) / 10);
  }

  // Add XP to given Participant.
  function handleAddXPToParticipant(
    Structs.Participant memory participant,
    uint256 amount,
    uint256 levelCost
  ) external pure returns (Structs.Participant memory _participant) {
    participant.experiencePoints += amount;

    uint256 newLevel = 1 + (participant.experiencePoints / levelCost);
    if (newLevel > 1) {
      participant.level = newLevel;
    }

    return participant;
  }

  // Calculate leven cost for a Participant.
  function calculateParticipantLevelCost(
    uint256 levelCost,
    uint256 level
  ) external pure returns (uint256) {
    // Increase level cost as participant level increases.
    uint256 participantLevelCost = levelCost + ((level - 1) * 10);

    return participantLevelCost;
  }

  // Add XP to given Plant.
  function handleAddXPToPlant(Structs.Plant memory plant, uint256 amount)
    external
    pure
    returns (Structs.Plant memory _plant)
  {
    plant.experiencePoints += amount;

    uint256 newLevel = 1 + (plant.experiencePoints / plant.levelCost);
    if (newLevel > 1 && newLevel <= 5) {
      plant.level = newLevel;
    } else if (newLevel > 5) {
      plant.level = 5;
    }

    return plant;
  }

  // Convert address to string.
  function toString(address x) external pure returns (string memory) {
      return StringsUpgradeable.toHexString(uint256(uint160(x)), 20);
  }
}
