// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "../utils/KojoLibrary.sol";

contract KojoStorage is OwnableUpgradeable {
  bool internal isInitialized = false;

  uint256 public startCapital;
  uint256 public tokenSensitivity;
  uint256 public wateringCost;

  mapping(address => Structs.Participant) public participants;
  // address[] public accountAddresses[];

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
    Structs.Participant memory _participant = this.handleReadParticipant(
      account
    );
    require(!_participant.isPresent, "Participant already exists.");

    Structs.Participant memory participant;
    // participant.account = account;
    participant.isPresent = true;

    participants[account] = participant;
    // particpantsLength += 1;

    emit CreateParticipant(participant);
  }

  // Allows users to read participants.
  function handleReadParticipant(address account)
    external
    view
    returns (Structs.Participant memory participant)
  {
    return participants[account];
  }

  // Allows the owner to update participants.
  function handleUpdateParticipant(
    address account,
    Structs.Participant calldata _participant
  ) external onlyOwner {
    Structs.Participant memory participant = participants[account];

    participant = _participant;
    participants[account] = participant;

    emit UpdateParticipant(participant);
  }

  // Allows the owner to delete participants.
  function handleDeleteParticipant(address account) external onlyOwner {
    Structs.Participant memory participant = participants[account];

    delete participants[account];

    emit DeleteParticipant(participant);
  }

  // // Allows users to read participant id's.
  // function handleReadParticipantIndices()
  //   external
  //   view
  //   returns (uint256[] memory _participantIndices)
  // {
  //   return participantIndices;
  // }

  // Allows owner to create a new plant.
  function handleCreatePlant(uint256 tokenId) external onlyOwner {
    Structs.Plant memory plant;
    plant.level = 0;
    plant.experiencePoints = 0;
    plant.lifes = 3;

    plants[tokenId] = plant;

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
