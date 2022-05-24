// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

abstract contract KojoOwnable {
  address public owner;

  event CreateOwner(address owner);
  event UpdateOwner(address owner);

  constructor() {
    owner = msg.sender;

    emit CreateOwner(owner);
  }

  modifier isOwner() {
    require(owner == msg.sender, "Not the contract owner.");
    _;
  }

  // Allows owner to parse owner rights.
  function handleUpdateOwner(address _owner) public isOwner {
    owner = _owner;
    emit UpdateOwner(_owner);
  }
}
