// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
contract KojoAPIConsumer is ChainlinkClient, ConfirmedOwner {
  using Chainlink for Chainlink.Request;

  uint256 public allowance;

  bytes32 private jobId;
  uint256 private fee;

  event RequestFulfilled(
    bytes32 indexed requestId,
    uint256 allowance
  );

  /**
   * @notice Initialize the link token and target oracle
   *
   * Polygon Testnet (mumbai) details:
   * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
   * Oracle: 0x5b74D9D9faF80bcfDB042C6e4Ad7Ab98C8e59aF7 (Mumbai oracle)
   * jobId: c0798a05e28f42e0bcdef36e22fa4702
   *
   */
  constructor() ConfirmedOwner(msg.sender) {
    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    setChainlinkOracle(0x5b74D9D9faF80bcfDB042C6e4Ad7Ab98C8e59aF7);
    jobId = "c0798a05e28f42e0bcdef36e22fa4702";
    fee = 10**16; // 0.01 LINK
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
    uint256 _allowance
  ) public recordChainlinkFulfillment(_requestId) {
    emit RequestFulfilled(_requestId, _allowance);
    allowance = _allowance;
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
