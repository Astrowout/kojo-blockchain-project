// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../utils/KojoLibrary.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

contract KojoUtils {
  function handleBuildURI(Structs.Plant memory plant)
    external
    pure
    returns (string memory _uri)
  {
    // Perform some checks
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

    string memory base = "https://cloudflare-ipfs.com/ipfs/QmZVcWmtRiCNnSUSHvdooDBjZ3vqtiAipZ6uwp5PzHjQZA/";
    string memory result = string(abi.encodePacked(
      base,
      StringsUpgradeable.toString(plant.typeId),
      "-",
      StringsUpgradeable.toString(plant.level),
      "-",
      StringsUpgradeable.toString(plant.lifes),
      ".json"
    ));

    return result;
  }

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

  function handleCalculateAllowedTokenBalanceFromParticipantLevel(
    Structs.Participant memory participant,
    uint256 amount
  ) external pure returns (uint256 _amount) {
    // Increase multiplier as participant level increases.
    return amount + ((amount * (participant.level - 1)) / 10);
  }

  function handleAddXPToParticipant(
    Structs.Participant memory participant,
    uint256 amount
  ) external pure returns (Structs.Participant memory _participant) {
    // Increase level cost as participant level increases. This changes to 1000 tokens for mainnet.
    uint256 levelCost = 180 * (participant.level + (participant.level) / 5);

    if (participant.experiencePoints + amount < levelCost) {
      participant.experiencePoints = participant.experiencePoints + amount;
    }

    if (participant.experiencePoints + amount > levelCost) {
      participant.level += 1;
      participant.experiencePoints =
        (participant.experiencePoints + amount) -
        levelCost;
    }

    return participant;
  }

  function handleAddXPToPlant(Structs.Plant memory plant, uint256 amount)
    external
    pure
    returns (Structs.Plant memory _plant)
  {
    if (plant.experiencePoints + amount < plant.levelCost) {
      plant.experiencePoints = plant.experiencePoints + amount;
    }

    if (plant.experiencePoints + amount > plant.levelCost) {
      plant.level += 1;
      plant.experiencePoints =
        (plant.experiencePoints + amount) -
        plant.levelCost;
    }

    return plant;
  }
}
