// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {KojoERC1155} from "./token/KojoERC1155.sol";

import {Structs} from "./utils/KojoLibrary.sol";
import {KojoStorage} from "./utils/KojoStorage.sol";
import {KojoUtils} from "./utils/KojoUtils.sol";
import {KojoAPIConsumer} from "./utils/KojoAPIConsumer.sol";

contract KojoV1 is OwnableUpgradeable {
  KojoERC1155 internal token;
  KojoStorage internal store;
  KojoUtils internal utils;
  KojoAPIConsumer internal api;

  address public tokenAddress;

  event TokensClaimed(
    Structs.Participant participant,
    uint256 amount
  );
  event PlantMinted(
    Structs.Participant participant,
    Structs.Plant plant
  );
  event PlantWatered(
    address account,
    Structs.Participant participant,
    Structs.Plant plant,
    uint256 amount
  );

  function initialize(
    address _store,
    address _utils,
    address _api,
    address _token
  ) public initializer {
    store = KojoStorage(_store);
    utils = KojoUtils(_utils);
    api = KojoAPIConsumer(_api);
    token = KojoERC1155(_token);

    tokenAddress = _token;

    __Ownable_init_unchained();
  }

  // Prohibits external contracts to call certain functions.
  modifier onlyEOA() {
    require(tx.origin == msg.sender, "Not an EOA.");
    _;
  }

  // Allows the contract to update the storage after transfering tokens.
  // function _afterTokenTransfer(
  //   address operator,
  //   address from,
  //   address to,
  //   uint256[] memory ids,
  //   uint256[] memory amounts,
  //   bytes memory data
  // ) internal virtual override {
  //   // @TODO: Turn me on.
  //   super._afterTokenTransfer(operator, from, to, ids, amounts, data);

  //   uint256 tokenId = ids[0];

  //   if (tokenId != token.fungibleTokenId()) {
  //     Structs.Participant memory fromParticipant = store.handleReadParticipant(
  //       from
  //     );
  //     Structs.Participant memory toParticipant = store.handleReadParticipant(
  //       to
  //     );

  //     if (fromParticipant.isPresent) {
  //       Structs.Participant memory _fromParticipant = utils
  //         .handleRemoveTokenIdFromParticipant(fromParticipant, tokenId);
  //       store.handleUpdateParticipant(from, _fromParticipant);
  //     }

  //     if (toParticipant.isPresent) {
  //       Structs.Participant memory _toParticipant = utils
  //         .handleAddTokenIdToParticipant(toParticipant, tokenId);
  //       store.handleUpdateParticipant(to, _toParticipant);
  //     }

  //     // @TODO: Provide fallback for when participant dont exist.
  //   }
  // }

  // Allows the contract to update the storage after minting tokens.
  function _handleMintPlant(Structs.Participant memory participant)
    internal
    returns (
      Structs.Participant memory returnParticipant,
      Structs.Plant memory returnPlant
    )
  {
    token.mint(msg.sender, token.nonFungibleTokenCount(), 1, "");

    Structs.Participant memory _participant = utils
      .handleAddTokenIdToParticipant(
        participant,
        token.nonFungibleTokenCount()
      );
    Structs.Plant memory _plant = store.handleCreatePlant(
      token.nonFungibleTokenCount()
    );

    store.handleUpdateParticipant(msg.sender, _participant);
    token.handleIncrementTokenCount();

    return (_participant, _plant);
  }

  // Allows the owner to update the store.
  function handleUpdateContracts(
    address _store,
    address _utils,
    address _api,
    address _token
  ) public onlyOwner {
    store = KojoStorage(_store);
    utils = KojoUtils(_utils);
    api = KojoAPIConsumer(_api);
    token = KojoERC1155(_token);

    tokenAddress = _token;
  }

  // Allows the  owner to update how many tokens are distributed for a given percentage point.
  function handleUpdateTokenSensitivity(uint256 tokenSensitivity)
    public
    onlyOwner
  {
    store.handleUpdateTokenSensitivity(tokenSensitivity);
  }

  // // Allows the  owner to configure the chainlink api consumer.
  // function handleConfigureAPIConsumer(
  //   bytes32 _jobId,
  //   uint256 _fee,
  //   string calldata _endpoint,
  //   string calldata _path,
  //   address _tokenAddress,
  //   address _oracleAddress
  // ) public onlyOwner {
  //   api.handleConfigureAPI(
  //     _jobId,
  //     _fee,
  //     _endpoint,
  //     _path,
  //     _tokenAddress,
  //     _oracleAddress
  //   );
  // }

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
    require(!participant.isPresent, "Participant already exists. You can only claim your intial kojos once.");

    Structs.Participant memory newParticipant = store.handleCreateParticpant(
      msg.sender
    );

    token.mint(
      msg.sender,
      token.fungibleTokenId(),
      store.initialTokenAllowance(),
      ""
    );

    emit TokensClaimed(newParticipant, store.initialTokenAllowance());

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

    token.mint(
      msg.sender,
      token.fungibleTokenId(),
      participant.allowedTokenBalance,
      ""
    );

    Structs.Participant memory _participant = participant;
    _participant.allowedTokenBalance = 0;

    store.handleUpdateParticipant(msg.sender, _participant);

    emit TokensClaimed(participant, participant.allowedTokenBalance);
  }

  // Allows EOA's to buy a seed/plant.
  function handleBuyPlant() public payable onlyEOA {
    Structs.Participant memory participant = store.handleReadParticipant(
      msg.sender
    );

    require(participant.isPresent, "Participant does not exist.");
    require(msg.value >= store.plantPrice(), "Not enough kojos. One plant costs 1 kojo");

    (
      Structs.Participant memory _participant,
      Structs.Plant memory _plant
    ) = _handleMintPlant(participant);

    emit PlantMinted(_participant, _plant);
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
    token.setTokenUri(tokenId, uri);

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

  // Allows users to read participants from storage.
  function handleReadInititalAllowance()
    external
    view
    returns (uint256)
  {
    return store.initialTokenAllowance();
  }
}
