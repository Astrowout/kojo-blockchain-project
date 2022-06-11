// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

import {KojoStorage} from "../utils/KojoStorage.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
contract KojoAPIConsumer is ChainlinkClient, ConfirmedOwner {
  using Chainlink for Chainlink.Request;

  bytes32 private jobId;
  uint256 private fee;

  KojoStorage public store;

  event RequestFulfilled(
    bytes32 indexed requestId,
    uint256 allowance
  );

  /**
   * @notice Initialize the link token and target oracle
   *
   * Polygon Testnet (mumbai) details:
   * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
   * Oracle: 0xE1eDB1c19298A1522059CF9F542D2D6FAfF93D08 (Mumbai oracle)
   * jobId: 1899223a725b4be68a83454d643deb66
   *
   */
  constructor() ConfirmedOwner(msg.sender) {
    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    setChainlinkOracle(0xE1eDB1c19298A1522059CF9F542D2D6FAfF93D08);

    jobId = "1899223a725b4be68a83454d643deb66";
    fee = 10**16; // 0.01 LINK
  }

  function setStorageContract(address _store) external onlyOwner {
    store = KojoStorage(_store);
  }

  /**
   * Create a Chainlink request to retrieve API response, find the target
   * data which is located in a list
   */
  function requestKojoAllowance(string calldata account) public onlyOwner {
    Chainlink.Request memory req = buildChainlinkRequest(
      jobId,
      address(this),
      this.fulfill.selector
    );

    // Set the URL to perform the GET request on
    // API docs: https://api.play-kojo.xyz/api/farys/{account}
    req.add(
      "get",
      string(string.concat("https://api.play-kojo.xyz/api/farys/latest/", bytes(account)))
    );
    req.add("path", "allowance");
    // Sends the request
    sendChainlinkRequest(req, fee);
  }

  /**
   * @notice Fulfillment function for multiple parameters in a single request
   * @dev This is called by the oracle. recordChainlinkFulfillment must be used.
   */
  function fulfill(
    bytes32 _requestId,
    uint256 _allowance,
    address _account
  ) public recordChainlinkFulfillment(_requestId) {
    emit RequestFulfilled(_requestId, _allowance);
    store.setAllowance(_allowance, _account);
  }

  /**
   * Allow withdraw of Link tokens from the contract
   */
  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(
      link.transfer(msg.sender, link.balanceOf(address(this))),
      "Unable to transfer"
    );
  }
}
