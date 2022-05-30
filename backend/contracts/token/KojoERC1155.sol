// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract KojoERC1155 is
  ERC1155Upgradeable,
  OwnableUpgradeable,
  ERC1155BurnableUpgradeable,
  ERC1155SupplyUpgradeable
{
  mapping(uint256 => string) private _uris;

  uint256 public fungibleTokenId;
  uint256 public nonFungibleTokenCount;

  // Disable initialize function after intitialization.
  // constructor() {
  //   _disableInitializers();
  // }

  // Initialize contract.
  function initialize() public initializer {
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
    __ERC1155_init("");
    __Ownable_init();
    __ERC1155Burnable_init();
    __ERC1155Supply_init();

    fungibleTokenId = 0;
    nonFungibleTokenCount = 1;
  }

  // Allows to owner to update the metadata.
  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  // Allows the owner to mint tokens of a specific type.
  function mint(
    address account,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public onlyOwner {
    _mint(account, id, amount, data);
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

  // Overwrite existing uri function to allow token specific uri's.
  function uri(uint256 tokenId) public view override returns (string memory) {
    return (_uris[tokenId]);
  }

  // Allow the owner to set token specific token uri.
  function setTokenUri(uint256 tokenId, string memory _uri) public onlyOwner {
    _uris[tokenId] = _uri;
  }
}
