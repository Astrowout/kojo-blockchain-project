// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";

contract KojoERC1155 is
  Initializable,
  ERC1155Upgradeable,
  OwnableUpgradeable,
  ERC1155HolderUpgradeable,
  ERC1155SupplyUpgradeable
{
  mapping(uint256 => string) private _uris;

  uint256 public fungibleTokenId;
  uint256 public nonFungibleTokenCount;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
     _disableInitializers();
  }

  // Initialize token contract.
  function __KojoERC1155_init() internal onlyInitializing {
    __ERC1155_init_unchained("");
    __Ownable_init_unchained();
    __ERC1155Supply_init_unchained();

    fungibleTokenId = 0;
    nonFungibleTokenCount = 1;
  }


  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Upgradeable, ERC1155ReceiverUpgradeable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  // Allows to owner to update the metadata.
  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  // Allows the owner to mint tokens of multiple types.
  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }

  // The following functions are overrides required by Solidity.
  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }

  // Increment the non-fungible token count.
  function handleIncrementTokenCount() internal {
    nonFungibleTokenCount += 1;
  }

  // Overwrite existing uri function to allow token specific uri's.
  function uri(uint256 tokenId) public view override returns (string memory) {
    return (_uris[tokenId]);
  }

  // Allow the owner to set token specific token uri.
  function setTokenUri(uint256 tokenId, string memory _uri) public onlyOwner {
    _uris[tokenId] = _uri;
  }
}
