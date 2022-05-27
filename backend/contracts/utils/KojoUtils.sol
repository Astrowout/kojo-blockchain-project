// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "../utils/KojoLibrary.sol";

contract KojoUtils {
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

  function handleAddTokenIdToParticipant(
    Structs.Participant memory participant,
    uint256 tokenId
  ) external pure returns (Structs.Participant memory _participant) {
    uint256[] memory results = new uint256[](participant.plantIds.length + 1);

    for (uint256 i = 0; i < participant.plantIds.length; i++) {
      uint256 currentId = participant.plantIds[i];
      results[i] = currentId;
    }

    results[results.length + 1] = tokenId;

    participant.plantIds = results;

    return participant;
  }
}
