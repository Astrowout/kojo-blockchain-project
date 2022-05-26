// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract KojoProxy is OwnableUpgradeable {
  address public current;

  event Success(bool result, bytes data);

  // Allows functions to be called on current contract address.
  fallback() external payable {
    (bool result, bytes memory data) = current.call(msg.data);
    emit Success(result, data);
  }

  // Allows payments to be reverted when a wrong function is called.
  receive() external payable {
    revert("Not allowed.");
  }

  // Allows owner to update the contract address when a new version is released.
  function handleUpdateAddress(address _address) public onlyOwner {
    current = _address;
  }
}
