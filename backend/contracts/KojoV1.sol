// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {KojoERC1155} from "./token/KojoERC1155.sol";

import {Structs} from "./utils/KojoLibrary.sol";
import {KojoStorage} from "./utils/KojoStorage.sol";
import {KojoUtils} from "./utils/KojoUtils.sol";
import {KojoAPIConsumer} from "./chainlink/KojoAPIConsumer.sol";

contract KojoV1 is KojoERC1155 {
  KojoStorage internal store;
  KojoUtils internal utils;
  KojoAPIConsumer internal api;

  address burnAddress;

  event TokensClaimed(Structs.Participant participant, uint256 amount);
  event PlantMinted(Structs.Participant participant, Structs.Plant plant);
  event PlantWatered(Structs.Participant participant, Structs.Plant plant);

  // Initialize contract.
  function initialize(
    address _store,
    address _utils,
    address _api,
    address _burn
  ) public initializer {
    __KojoERC1155_init();

    store = KojoStorage(_store);
    utils = KojoUtils(_utils);
    api = KojoAPIConsumer(_api);

    burnAddress = _burn;
  }

  // Prohibits external contracts to call certain functions.
  modifier onlyEOA() {
    require(tx.origin == msg.sender, "Not an EOA.");
    _;
  }

  // Allows the contract to update the storage after minting tokens.
  function _handleMintPlant()
    internal
    returns (
      Structs.Participant memory returnParticipant,
      Structs.Plant memory returnPlant
    )
  {
    _mint(msg.sender, nonFungibleTokenCount, 1, "");

    // Transfer tokens from participant to the vault in our main contract.
    safeTransferFrom(msg.sender, address(this), fungibleTokenId, store.plantPrice(), "");

    Structs.Participant memory _participant = store.handleAddTokenIdToParticipant(
      msg.sender,
      nonFungibleTokenCount
    );

    Structs.Plant memory _plant = store.handleCreatePlant(nonFungibleTokenCount);

    // Set initial URI of newly minted plant.
    string memory URI = utils.handleBuildURI(_plant);
    setTokenUri(nonFungibleTokenCount, URI);

    // Update state for next minting.
    handleIncrementTokenCount();
    store.handleUpdatePlantTypeId();

    return (_participant, _plant);
  }

  // Allows the owner to update the store.
  function handleUpdateContracts(
    address _store,
    address _utils,
    address _api,
    address _burn
  ) public onlyOwner {
    store = KojoStorage(_store);
    utils = KojoUtils(_utils);
    api = KojoAPIConsumer(_api);

    burnAddress = _burn;
  }

  // Allows EOA's to claim a free kojo supply when new.
  function handleClaimStartTokens()
    external
    payable
    onlyEOA
  {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );

    // Only allow new participants to claim their initial tokens.
    require(!participant.isPresent, "Participant already exists. You can only claim your intial kojos once.");

    Structs.Participant memory newParticipant = store.handleCreateParticpant(
      msg.sender
    );

    _mint(msg.sender, fungibleTokenId, store.initialTokenAllowance(), "");

    emit TokensClaimed(newParticipant, store.initialTokenAllowance());
  }

  // Allows EOA's to claim a monthly reward when gained.
  function handleClaimMonthlyReward() public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );

    require(participant.isPresent, "Participant does not exist.");
    require(
      participant.allowedTokenBalance > 0,
      "Participant doesn't have allowance to claim tokens."
    );

    // @TODO: Set fixed blocktime per month and check if passed.

    _mint(msg.sender, fungibleTokenId, participant.allowedTokenBalance, "");

    Structs.Participant memory _participant = participant;
    _participant.allowedTokenBalance = 0;

    store.handleUpdateParticipant(msg.sender, _participant);

    emit TokensClaimed(participant, participant.allowedTokenBalance);
  }

  // Allows EOA's to buy a seed/plant.
  function handleBuyPlant() external payable onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(msg.sender);

    // Check existence of participant who wants to mint a seed.
    require(participant.isPresent, "Participant does not exist.");

    // Check if participant has enough tokens to mint a seed.
    uint256 kojoBalance = balanceOf(msg.sender, fungibleTokenId);
    require(kojoBalance >= store.plantPrice(), "Not enough kojos. One plant costs 1 kojo.");

    (
      Structs.Participant memory _participant,
      Structs.Plant memory _plant
    ) = _handleMintPlant();

    emit PlantMinted(_participant, _plant);
  }

  // Allows EOA's to water their seed/plant.
  function handleWaterPlant(uint256 tokenId, uint256 amount) public payable onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(msg.sender);
    Structs.Plant memory plant = store.handleReadPlant(tokenId);

    // Check if the participant exists.
    require(participant.isPresent, "Participant does not exist.");

    // Check if plant exists.
    require(plant.isPresent, "Plant does not exist.");

    // Check if participant has enough kojos to water the plant.
    uint256 kojoBalance = balanceOf(msg.sender, fungibleTokenId);
    require(kojoBalance >= amount, "Not enough kojos to water your plant.");

    // Calculate values in data models
    Structs.Participant memory _participant = utils.handleAddXPToParticipant(participant, amount);
    Structs.Plant memory _plant = utils.handleAddXPToPlant(plant, amount);

    // Update values in data models
    store.handleUpdateParticipant(msg.sender, _participant);
    store.handleUpdatePlant(tokenId, _plant);

    string memory uri = utils.handleBuildURI(_plant);
    setTokenUri(tokenId, uri);

    // Transfer 2% of the tokens to the vault in our main contract.
    // Transfer 98% of the tokens to the burn contract.
    uint256 vaultAmount = amount * 2 / 100;
    uint256 burnAmount = amount * 98 / 100;
    safeTransferFrom(msg.sender, address(this), fungibleTokenId, vaultAmount, "");
    safeTransferFrom(msg.sender, burnAddress, fungibleTokenId, burnAmount, "");

    emit PlantWatered(_participant, _plant);
  }

  // Allows users to read participants from storage.
  function handleReadParticipant(address account)
    external
    view
    returns (Structs.Participant memory)
  {
    return store.handleReadParticipant(account);
  }

  // Allows users to read plants from storage.
  function handleReadPlant(uint256 tokenId)
    external
    view
    returns (Structs.Plant memory)
  {
    return store.handleReadPlant(tokenId);
  }

  // Allows client to read the initial allowance for users to withdraw.
  function handleReadInititalAllowance() external view returns (uint256) {
    return store.initialTokenAllowance();
  }

  // Allows client to read the address on position of index.
  function handleReadParticipantAddresses() external view returns (address[] memory) {
    return store.handleReadParticipantAddresses();
  }

  // Allows the owner of the main contract to withdraw the kojo tokens from the contract.
  function withdrawKojos() external payable onlyOwner {
    safeTransferFrom(address(this), owner(), fungibleTokenId, balanceOf(address(this), fungibleTokenId), "");
  }
}
