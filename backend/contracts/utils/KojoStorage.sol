// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "../utils/KojoLibrary.sol";

contract KojoStorage is OwnableUpgradeable {
  uint256 public plantPrice;
  uint256 public initialTokenAllowance;
  uint256 public plantTypeId;

  mapping(address => Structs.Participant) public participants;
  address[] public participantAddresses;
  event UpdateParticipant(Structs.Participant participant);
  event DeleteParticipant(Structs.Participant participant);

  mapping(uint256 => Structs.Plant) public plants;
  event UpdatePlant(Structs.Plant plant);
  event DeletePlant(Structs.Plant plant);

  function initialize() public initializer {
    plantPrice = 1;
    initialTokenAllowance = 100;
    plantTypeId = 1;

    __Ownable_init_unchained();
  }

  // Allows owner to create a new participant.
  function handleCreateParticpant(address account)
    external
    onlyOwner
    returns (Structs.Participant memory value)
  {
    Structs.Participant memory _participant = participants[account];
    require(!_participant.isPresent, "Participant already exists.");

    Structs.Participant memory participant;
    participant.level = 0;
    participant.experiencePoints = 0;
    participant.allowedTokenBalance = 0;
    participant.plantIds = new uint256[](0);
    participant.isPresent = true;

    // Set new state of participant.
    participants[account] = participant;
    participantAddresses.push(account);

    return participant;
  }

  // Allows users to read participants.
  function handleReadParticipant(address account)
    external
    view
    onlyOwner
    returns (Structs.Participant memory _participant)
  {
    Structs.Participant memory participant = participants[account];

    return participant;
  }

  // Allows the owner to update participants.
  function handleUpdateParticipant(
    address account,
    Structs.Participant calldata _participant
  ) external onlyOwner returns (Structs.Participant memory value) {
    Structs.Participant memory participant = participants[account];
    require(participant.isPresent, "Participant does not exist.");

    participants[account] = _participant;

    emit UpdateParticipant(participant);

    return participant;
  }

  function handleAddTokenIdToParticipant(
    address account,
    uint256 tokenId
  ) external onlyOwner returns (Structs.Participant memory _participant) {
    Structs.Participant storage participant = participants[account];
    require(participant.isPresent, "Participant does not exist.");
    require((tokenId > 0), "Token ID must be greater than 0 in order to be an NFT token id.");

    participant.plantIds.push(tokenId);

    return participant;
  }

  // Allows the owner to delete participants.
  function handleDeleteParticipant(address account)
    external
    onlyOwner
    returns (Structs.Participant memory value)
  {
    Structs.Participant memory participant = participants[account];
    require(participant.isPresent, "Participant does not exist.");

    delete participant;

    emit DeleteParticipant(participant);

    return participant;
  }

  // Allows owner to create a new plant.
  function handleCreatePlant(uint256 tokenId)
    external
    onlyOwner
    returns (Structs.Plant memory)
  {
    Structs.Plant memory _plant = plants[tokenId];
    require(!_plant.isPresent, "Plant already exists.");

    Structs.Plant memory plant;
    plant.typeId = plantTypeId;
    plant.level = 1;
    plant.experiencePoints = 0;
    plant.lifes = 3;
    plant.levelCost = 100;
    plant.isPresent = true;

    plants[tokenId] = plant;

    return plant;
  }

  // Allows users to read plants.
  function handleReadPlant(uint256 tokenId)
    external
    view
    onlyOwner
    returns (Structs.Plant memory _plant)
  {
    Structs.Plant memory plant = plants[tokenId];
    require(plant.isPresent, "Plant does not exist.");

    return plants[tokenId];
  }

  // Allows the owner to update plants.
  function handleUpdatePlant(uint256 tokenId, Structs.Plant calldata _plant)
    external
    onlyOwner
    returns (Structs.Plant memory value)
  {
    Structs.Plant memory plant = plants[tokenId];
    require(plant.isPresent, "Plant does not exist.");

    plant = _plant;
    plants[tokenId] = plant;

    emit UpdatePlant(plant);

    return plant;
  }

  // Allows the owner to delete plants.
  function handleDeletePlant(uint256 tokenId)
    external
    onlyOwner
    returns (Structs.Plant memory value)
  {
    Structs.Plant memory plant = plants[tokenId];
    require(plant.isPresent, "Plant does not exist.");

    delete plant;

    emit DeletePlant(plant);

    return plant;
  }

  // Allows owner to update how many tokens are distributed for a given percentage point.
  function handleUpdatePlantTypeId()
    external
    onlyOwner
  {
    if (plantTypeId == 3) {
      plantTypeId = 1;
    } else {
      plantTypeId += 1;
    }
  }

  // Allows owner to update how many tokens are distributed for a given percentage point.
  function handleReadParticipantAddresses()
    external
    view
    onlyOwner
    returns (address[] memory)
  {
    return participantAddresses;
  }
}
