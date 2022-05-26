// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "../utils/KojoLibrary.sol";

contract KojoStorage is OwnableUpgradeable {
  bool internal isInitialized = false;

  uint256 public startCapital;
  uint256 public tokenSensitivity;
  uint256 public wateringCost;

  mapping(uint256 => Structs.Participant) public participants;
  uint256[] public participantIndices;

  event CreateParticipant(Structs.Participant participant);
  event UpdateParticipant(Structs.Participant participant);
  event DeleteParticipant(Structs.Participant participant);

  mapping(uint256 => Structs.Plant) public plants;
  uint256[] public plantIndices;

  event CreatePlant(Structs.Plant plant);
  event UpdatePlant(Structs.Plant plant);
  event DeletePlant(Structs.Plant plant);

  constructor() {
    init();
  }

  // Allows the contract to be initialized.
  function init() internal {
    require(!isInitialized, "Contract already initialized.");

    startCapital = 100;
    tokenSensitivity = 1;
    wateringCost = 1;

    isInitialized = true;
  }

  // Allows owner to update the start capital given to users.
  function handleUpdateStartCapital(uint256 _startCapital) public onlyOwner {
    startCapital = _startCapital;
  }

  // Allows owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 _tokenSensitivity)
    public
    onlyOwner
  {
    tokenSensitivity = _tokenSensitivity;
  }

  // Allows owner to update the cost of watering a seed/plant.
  function handleUpdateWateringCost(uint256 _wateringCost) public onlyOwner {
    wateringCost = _wateringCost;
  }

  // Allows owner to create a new participant.
  function handleCreateParticpant(address account) external onlyOwner {
    uint256 index = participantIndices.length + 1;

    Structs.Participant memory participant;
    participant.id = index;
    participant.account = account;
    participant.isPresent = true;

    participants[index] = participant;
    participantIndices.push(index);

    emit CreateParticipant(participant);
  }

  // Allows users to read participants.
  function handleReadParticipant(uint256 id)
    external
    view
    returns (Structs.Participant memory participant)
  {
    return participants[id];
  }

  // Allows the owner to update participants.
  function handleUpdateParticipant(
    uint256 id,
    Structs.Participant calldata _participant
  ) external onlyOwner {
    Structs.Participant memory participant = participants[id];

    participant = _participant;
    participants[id] = participant;

    emit UpdateParticipant(participant);
  }

  // Allows the owner to delete participants.
  function handleDeleteParticipant(uint256 id) external onlyOwner {
    Structs.Participant memory participant = participants[id];

    delete participants[id];

    emit DeleteParticipant(participant);
  }

  // Allows users to read participant id's.
  function handleReadParticipantIndices()
    external
    view
    returns (uint256[] memory _participantIndices)
  {
    return participantIndices;
  }

  // Allows owner to create a new plant.
  function handleCreatePlant(address account) external onlyOwner {
    uint256 index = plantIndices.length + 1;

    Structs.Plant memory plant;
    plant.id = index;
    plant.owner = account;
    plant.growthLevel = 0;
    plant.hydrationDegree = 5;
    plant.healthDegree = 10;

    plants[index] = plant;
    plantIndices.push(index);

    emit CreatePlant(plant);
  }

  // Allows users to read plants.
  function handleReadPlant(uint256 id)
    external
    view
    returns (Structs.Plant memory plant)
  {
    return plants[id];
  }

  // Allows the owner to update plants.
  function handleUpdatePlant(uint256 id, Structs.Plant calldata _plant)
    external
    onlyOwner
  {
    Structs.Plant memory plant = plants[id];

    plant = _plant;
    plants[id] = plant;

    emit UpdatePlant(plant);
  }

  // Allows the owner to delete plants.
  function handleDeletePlant(uint256 id) external onlyOwner {
    Structs.Plant memory plant = plants[id];

    delete plants[id];

    emit DeletePlant(plant);
  }

  // Allows users to read plant id's.
  function handleReadPlantIndices()
    external
    view
    returns (uint256[] memory _plantIndices)
  {
    return plantIndices;
  }
}
