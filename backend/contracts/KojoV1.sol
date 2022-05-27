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

  event PlantClaimed(
    address account,
    Structs.Participant participant,
    Structs.Plant plant
  );
  event TokensClaimed(
    address account,
    Structs.Participant participant,
    uint256 amount
  );
  event PlantBought(
    address account,
    Structs.Participant participant,
    Structs.Plant plant
  );
  event PlantWatered(
    address account,
    Structs.Participant participant,
    Structs.Plant plant,
    uint256 amount
  );

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

    // ...

    isInitialized = true;
  }

  // Allows the contract to update the storage after transfering tokens.
  function _afterTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual override {
    Structs.Participant memory fromParticipant = store.handleReadParticipant(
      from
    );
    Structs.Participant memory toParticipant = store.handleReadParticipant(to);

    uint256 tokenId = ids[0];

    if (tokenId != FUNGIBLE_TOKEN) {
      if (fromParticipant.isPresent) {
        Structs.Participant memory _fromParticipant = utils
          .handleRemoveTokenIdFromParticipant(fromParticipant, tokenId);
        store.handleUpdateParticipant(from, _fromParticipant);
      }

      if (toParticipant.isPresent) {
        Structs.Participant memory _toParticipant = utils
          .handleAddTokenIdToParticipant(toParticipant, tokenId);
        store.handleUpdateParticipant(to, _toParticipant);
      }

      // @TODO: Provide fallback for when participant dont exist.
    }

    super._afterTokenTransfer(operator, from, to, ids, amounts, data);
  }

  // Allows the contract to update the storage after minting tokens.
  function _handleMintPlant(Structs.Participant memory participant, bool isNew)
    internal
    returns (
      Structs.Participant memory returnParticipant,
      Structs.Plant memory returnPlant
    )
  {
    _mint(msg.sender, nonFungibleTokenCount, 1, "");

    Structs.Participant memory _participant = utils
      .handleAddTokenIdToParticipant(participant, nonFungibleTokenCount);
    Structs.Plant memory _plant = store.handleCreatePlant(
      nonFungibleTokenCount
    );

    if (isNew) {
      _participant.hasClaimedStartSeed = true;
    }

    store.handleUpdateParticipant(msg.sender, _participant);

    nonFungibleTokenCount += 1;

    return (_participant, _plant);
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

  // Allows the  owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 tokenSensitivity)
    public
    onlyOwner
  {
    store.handleUpdateTokenSensitivity(tokenSensitivity);
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
  function handleClaimStartSeed() public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    require(participant.isPresent, "Participant does not exist.");
    require(!participant.hasClaimedStartSeed, "Already claimed.");

    (
      Structs.Participant memory _participant,
      Structs.Plant memory _plant
    ) = _handleMintPlant(participant, true);

    emit PlantClaimed(msg.sender, _participant, _plant);
  }

  // Allows EOA's to claim a monthly reward when gained.
  function handleClaimMonthlyReward() public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );

    require(participant.isPresent, "Participant does not exist.");
    require(
      participant.allowedTokenBalance != 0,
      "Participant is not allowed."
    );

    // @TODO: Set fixed blocktime per month and check if passed.

    _mint(msg.sender, FUNGIBLE_TOKEN, participant.allowedTokenBalance, "");

    Structs.Participant memory _participant = participant;
    _participant.allowedTokenBalance = 0;

    store.handleUpdateParticipant(msg.sender, _participant);

    emit TokensClaimed(
      msg.sender,
      participant,
      participant.allowedTokenBalance
    );
  }

  // Allows EOA's to buy a seed/plant.
  function handleBuyPlant() public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    require(participant.isPresent, "Participant does not exist.");

    // @TODO: Make payable and check for payment.

    (
      Structs.Participant memory _participant,
      Structs.Plant memory _plant
    ) = _handleMintPlant(participant, false);

    emit PlantBought(msg.sender, _participant, _plant);
  }

  // Allows EOA's to water their seed/plant.
  function handleWaterPlant(uint256 tokenId, uint256 amount) public onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    Structs.Plant memory plant = store.handleReadPlant(tokenId);

    require(participant.isPresent, "Participant does not exist.");
    require(plant.isPresent, "Plant does not exist.");

    Structs.Participant memory _participant = participant;
    _participant.experiencePoints = participant.experiencePoints + amount;

    Structs.Plant memory _plant = plant;
    _plant.experiencePoints = plant.experiencePoints + amount;

    store.handleUpdateParticipant(msg.sender, _participant);
    store.handleUpdatePlant(tokenId, _plant);

    // @TODO: Calculate participant level and plant level before updating.
    // @TODO: Calculate multiplier based on participant level.
    // @TODO: Burn tokens.
    // @TODO: Update NFT metadata uri. (!)

    emit PlantWatered(msg.sender, _participant, _plant, amount);
  }

  // Allows chainlink keeper to check if upkeep is needed.
  function checkUpkeep() external view {
    console.log("");

    // @TODO: Set latest sync block and check if month is passed.
  }

  // Allows chainlink keeper te perform upkeep.
  function performUpkeep() external view {
    console.log("");

    // @TODO: Sync NFTS. (?)
    // @TODO: Update latest sync block to now.
  }
}
