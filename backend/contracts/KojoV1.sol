// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {KojoERC1155} from "./token/KojoERC1155.sol";

import {Structs} from "./utils/KojoLibrary.sol";
import {KojoStorage} from "./utils/KojoStorage.sol";
import {KojoUtils} from "./utils/KojoUtils.sol";
import {KojoAPIConsumer} from "./utils/KojoAPIConsumer.sol";

contract KojoV1 is KojoERC1155 {
  KojoStorage internal store;
  KojoUtils internal utils;
  KojoAPIConsumer internal api;

  uint256 internal plantTypeId;

  event TokensClaimed(Structs.Participant participant, uint256 amount);
  event PlantMinted(Structs.Participant participant, Structs.Plant plant);
  event PlantWatered(
    address account,
    Structs.Participant participant,
    Structs.Plant plant,
    uint256 amount
  );

  // Initialize contract.
  function initialize(
    address _store,
    address _utils,
    address _api
  ) public initializer {
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
    __ERC1155_init("");
    __Ownable_init();
    __ERC1155Burnable_init();
    __ERC1155Supply_init();

    fungibleTokenId = 0;
    nonFungibleTokenCount = 1;
    plantTypeId = 1;

    store = KojoStorage(_store);
    utils = KojoUtils(_utils);
    api = KojoAPIConsumer(_api);
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

  //   if (tokenId != token.fungibleTokenId) {
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
  function _handleMintPlant()
    internal
    returns (
      Structs.Participant memory returnParticipant,
      Structs.Plant memory returnPlant
    )
  {
    _mint(msg.sender, nonFungibleTokenCount, 1, "");

    console.log("tloopt mis 0");

    burn(msg.sender, fungibleTokenId, 1);

    console.log("tloopt mis 1");

    Structs.Participant memory _participant = store
      .handleAddTokenIdToParticipant(msg.sender, nonFungibleTokenCount);

    console.log("tloopt mis 2");

    Structs.Plant memory _plant = store.handleCreatePlant(
      nonFungibleTokenCount
    );

    console.log("tloopt mis 3");

    handleIncrementTokenCount();

    console.log("tloopt mis 4");

    if (plantTypeId == 3) {
      plantTypeId = 1;
    } else {
      plantTypeId += 1;
    }

    return (_participant, _plant);
  }

  // Allows the owner to update the store.
  function handleUpdateContracts(
    address _store,
    address _utils,
    address _api
  ) public onlyOwner {
    store = KojoStorage(_store);
    utils = KojoUtils(_utils);
    api = KojoAPIConsumer(_api);
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
  //   address _oracleAddress
  // ) public onlyOwner {
  //   api.handleConfigureAPI(
  //     _jobId,
  //     _fee,
  //     _endpoint,
  //     _path,
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
    require(
      !participant.isPresent,
      "Participant already exists. You can only claim your intial kojos once."
    );

    Structs.Participant memory newParticipant = store.handleCreateParticpant(
      msg.sender
    );

    _mint(msg.sender, fungibleTokenId, store.initialTokenAllowance(), "");

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

    _mint(msg.sender, fungibleTokenId, participant.allowedTokenBalance, "");

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

    uint256 kojoBalance = balanceOf(msg.sender, fungibleTokenId);
    console.log("Sender balance is %s tokens", kojoBalance);
    require(
      kojoBalance >= store.plantPrice(),
      "Not enough kojos. One plant costs 1 kojo"
    );

    (
      Structs.Participant memory _participant,
      Structs.Plant memory _plant
    ) = _handleMintPlant();

    console.log("plantseee %s", _plant.isPresent);

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

  // Allows users to read participants from storage.
  function handleReadInititalAllowance() external view returns (uint256) {
    return store.initialTokenAllowance();
  }
}
