// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./token/KojoERC1155.sol";

import {Structs} from "./utils/KojoLibrary.sol";

import {KojoStorage} from "./utils/KojoStorage.sol";
import {KojoUtils} from "./utils/KojoUtils.sol";
import {KojoAPIConsumer} from "./utils/KojoAPIConsumer.sol";

contract KojoV1 is KojoERC1155 {
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

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();

    store = new KojoStorage();
    utils = new KojoUtils();
    api = new KojoAPIConsumer();
  }

  //   function initialize() initializer public {
  //     __ERC1155_init("");
  //     __Ownable_init();
  //     __ERC1155Burnable_init();
  //     __ERC1155Supply_init();
  // }

  // Prohibits external contracts to call certain functions.
  modifier onlyEOA() {
    require(tx.origin == msg.sender, "Not an EOA.");
    _;
  }

  // Allows the contract to be initialized.
  // function init() internal {
  //   require(!isInitialized, "Contract already initialized.");

  //   // ...

  //   isInitialized = true;
  // }

  // Allows the contract to update the storage after transfering tokens.
  function _afterTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual override {
    super._afterTokenTransfer(operator, from, to, ids, amounts, data);

    uint256 tokenId = ids[0];

    if (tokenId != FUNGIBLE_TOKEN) {
      Structs.Participant memory fromParticipant = store.handleReadParticipant(
        from
      );
      Structs.Participant memory toParticipant = store.handleReadParticipant(
        to
      );

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
  }

  // Allows the contract to update the storage after minting tokens.
  function _handleMintPlant(Structs.Participant memory participant)
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

  // Allows EOA's to become participants.
  // function handleCreateParticipant() internal onlyEOA {
  //   Structs.Participant memory participant = store.handleReadParticipant(
  //     msg.sender
  //   );
  //   require(!participant.isPresent, "Participant already exists.");

  //   store.handleCreateParticpant(msg.sender);
  // }

  // Allows EOA's to claim a free kojo supply when new.
  function handleClaimStartTokens()
    public
    payable
    onlyEOA
    returns (Structs.Participant memory value)
  {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    require(!participant.isPresent, "Participant already exists.");

    Structs.Participant memory newParticipant = store.handleCreateParticpant(
      msg.sender
    );

    _mint(msg.sender, FUNGIBLE_TOKEN, store.initialTokenAllowance(), "");

    emit TokensClaimed(msg.sender, participant, store.initialTokenAllowance());

    return newParticipant;
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
  function handleBuyPlant() public payable onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );

    require(participant.isPresent, "Participant does not exist.");
    require(msg.value > store.plantPrice(), "Not enough MATIC.");

    // @TODO: Check for KOJO instead of MATIC?

    (
      Structs.Participant memory _participant,
      Structs.Plant memory _plant
    ) = _handleMintPlant(participant);

    emit PlantBought(msg.sender, _participant, _plant);
  }

  // Allows EOA's to water their seed/plant.
  function handleWaterPlant(uint256 tokenId) public payable onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );
    Structs.Plant memory plant = store.handleReadPlant(tokenId);

    require(participant.isPresent, "Participant does not exist.");
    require(plant.isPresent, "Plant does not exist.");
    require(msg.value > 0, "No MATIC provided.");

    // @TODO: Check for KOJO instead of MATIC?

    Structs.Participant memory _participant = utils.handleAddXPToParticipant(
      participant,
      msg.value
    );
    Structs.Plant memory _plant = utils.handleAddXPToPlant(plant, msg.value);

    store.handleUpdateParticipant(msg.sender, _participant);
    store.handleUpdatePlant(tokenId, _plant);

    string memory uri = utils.handleBuildURI(_plant, tokenId);
    setTokenUri(tokenId, uri);

    // @TODO: Burn tokens. Send to burn address?

    emit PlantWatered(msg.sender, _participant, _plant, msg.value);
  }

  // Allows chainlink keeper to check if upkeep is needed.
  function checkUpkeep() external view {
    console.log("");

    // @TODO: Set latest sync block and check if month is passed. (LINK?)
  }

  // Allows chainlink keeper te perform upkeep.
  function performUpkeep() external view {
    console.log("");

    // @TODO: Sync NFTS. (?)
    // @TODO: Update latest sync block to now.
  }

  // Allows users to read participants from storage.
  function handleReadParticipant(address account)
    external
    view
    returns (Structs.Participant memory _participant)
  {
    return store.handleReadParticipant(account);
  }
}
