// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KojoBurn is
  ERC1155Holder,
  Ownable
{
    constructor() ERC1155Holder() {}
}
