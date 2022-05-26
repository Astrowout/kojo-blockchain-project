// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

import "./token/KojoERC1155.sol";

import "./utils/KojoStorage.sol";
import "./utils/KojoUtils.sol";
import "./utils/KojoAPIConsumer.sol";

abstract contract KojoV1 is KojoERC1155, KeeperCompatibleInterface {
  bool internal isInitialized = false;

  KojoStorage internal store;
  KojoUtils internal utils;
  KojoAPIConsumer internal api;

  uint256 public constant FUNGIBLE_TOKEN = 0;
  uint256 public nonFungibleTokenCount = 1;

  constructor() {
    store = new KojoStorage();
    utils = new KojoUtils();
    api = new KojoAPIConsumer();

    init();
  }

  // Prohibits contracts to call certain functions.
  modifier onlyEOA() {
    require(tx.origin == msg.sender, "Not an EOA.");
    _;
  }

  // Allows the contract to be initialized.
  function init() internal {
    require(!isInitialized, "Contract already initialized.");

    _mint(msg.sender, FUNGIBLE_TOKEN, 10**18, "");

    isInitialized = true;
  }

  // Allows the owner to update the store.
  function handleUpdateStoreAddress(address location) public onlyOwner {
    store = KojoStorage(location);
  }

  // Allows the owner to update utils.
  function handleUpdateUtilsAddress(address location) public onlyOwner {
    utils = KojoUtils(location);
  }

  // Allows the owner to update api consumer.
  function handleUpdateAPIConsumerAddress(address location) public onlyOwner {
    api = KojoAPIConsumer(location);
  }

  // Allows the owner to update the start capital given to users.
  function handleUpdateStartCapital(uint256 startCapital) public onlyOwner {
    store.handleUpdateStartCapital(startCapital);
  }

  // Allows the  owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 tokenSensitivity)
    public
    onlyOwner
  {
    store.handleUpdateTokenSensitivity(tokenSensitivity);
  }

  // Allows the  owner to update the cost of watering a seed/plant.
  function handleUpdateWateringCost(uint256 wateringCost) public onlyOwner {
    store.handleUpdateWateringCost(wateringCost);
  }

  // Allows the  owner to configure the chainlink api consumer.
  function handleConfigureAPIConsumer(
    bytes32 _jobId,
    uint256 _fee,
    string calldata _endpoint,
    string calldata _path,
    address _tokenAddress,
    address _oracleAddress
  ) public onlyOwner {
    api.handleConfigureAPI(
      _jobId,
      _fee,
      _endpoint,
      _path,
      _tokenAddress,
      _oracleAddress
    );
  }

  // Allows EOA's to claim a free seed when new.
  function handleClaimStartToken() public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    require(!participant.isPresent, "Participant already exists.");

    store.handleCreateParticpant(msg.sender);
    // store.handleCreatePlant(msg.sender);

    _mint(msg.sender, nonFungibleTokenCount, 1, "");
  }

  // Allows EOA's to claim a monthly reward when gained.
  function handleClaimMonthlyReward(address to) public view onlyEOA {
    console.log(to);

    // @TODO: Check claim rights.
    // 1) check blocktime
    // 1) check usage

    // @TODO: Mint tokens to user.
  }

  // Allows EOA's to buy a seed/plant.
  function handleBuyPlant() public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    require(participant.isPresent, "Participant does not exist.");

    store.handleCreatePlant(nonFungibleTokenCount);
    // safe id to participant

    _mint(msg.sender, nonFungibleTokenCount, 1, "");

    nonFungibleTokenCount += 1;
  }

  function handleWaterPlant() public view {
    console.log("");
    //@TODO: Burn tokens.
    //@TODO: Update experiencePoints on Plant struct.
    //@TODO: If experiencePoints is greater than levelCost:
    // level + 1;
    // experiencePoints = 0;
    // @TODO: Update NFT metadata.
  }

  // Allows to contract to update NFT's when storage data updates.
  function syncTokensWithStorage() internal view {
    console.log("");
  }

  // Allows chainlink keeper to check if upkeep is needed.
  function checkUpkeep() external view {
    console.log("");
  }

  // Allows chainlink keeper te perform upkeep.
  function performUpkeep() external view {
    syncTokensWithStorage();
  }

  function _afterTokenTransfer(
    address,
    address,
    address,
    uint256[] memory,
    uint256[] memory,
    bytes memory
  ) internal virtual override {
    console.log("");
    // @TODO: Delete plantId from participant.plantIds
    // @TODO: Add plantId to participant.plantIds
  }

  function handleGetDaysUntilNextCalc() external view {
    console.log("");
  }
}
