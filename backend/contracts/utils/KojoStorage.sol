// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "../utils/KojoLibrary.sol";

contract KojoStorage is OwnableUpgradeable {
  uint256 public plantPrice;
  uint256 public tokenSensitivity;
  uint256 public initialTokenAllowance;

  mapping(address => Structs.Participant) public participants;
  event CreateParticipant(Structs.Participant participant);
  event UpdateParticipant(Structs.Participant participant);
  event DeleteParticipant(Structs.Participant participant);

  mapping(uint256 => Structs.Plant) public plants;
  event CreatePlant(Structs.Plant plant);
  event UpdatePlant(Structs.Plant plant);
  event DeletePlant(Structs.Plant plant);

  function initialize() public initializer {
    init();
    __Ownable_init_unchained();
  }

  // Allows the contract to be initialized.
  function init() internal {
    plantPrice = 1000;
    tokenSensitivity = 1000;
    initialTokenAllowance = 100;
  }

  // Allows owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 _tokenSensitivity)
    public
    onlyOwner
  {
    tokenSensitivity = _tokenSensitivity;
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
    participant.isPresent = true;
    participants[account] = participant;

    emit CreateParticipant(participant);

    return participant;
  }

  // Allows users to read participants.
  function handleReadParticipant(address account)
    external
    view
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

    participant = _participant;
    participants[account] = participant;

    emit UpdateParticipant(participant);

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
    returns (Structs.Plant memory value)
  {
    Structs.Plant memory _plant = plants[tokenId];
    require(!_plant.isPresent, "Plant already exists.");

    Structs.Plant memory plant;
    plant.level = 0;
    plant.experiencePoints = 0;
    plant.lifes = 3;
    plant.levelCost = 100;

    plants[tokenId] = plant;

    emit CreatePlant(plant);

    return plant;
  }

  // Allows users to read plants.
  function handleReadPlant(uint256 tokenId)
    external
    view
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
}
