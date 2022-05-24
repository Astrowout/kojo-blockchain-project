// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract KojoAPIConsumer is ChainlinkClient, ConfirmedOwner {
  bool internal isInitialized = false;

  using Chainlink for Chainlink.Request;

  LinkTokenInterface internal link;

  bytes32 private jobId;
  uint256 private fee;

  string private endpoint;
  string private path;

  uint256 public value;

  event RequestValue(bytes32 indexed requestId, uint256 value);

  constructor() ConfirmedOwner(msg.sender) {
    link = LinkTokenInterface(chainlinkTokenAddress());

    init();
  }

  // Allows the contract to be initialized.
  function init() internal {
    require(!isInitialized, "Contract already initialized.");

    jobId = "ca98366cc7314957b8c012c72f05aeeb";
    fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18;
    endpoint = "https://play-kojo.xyz/api/farys";
    path = "usage,6";

    setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
    setChainlinkOracle(0x74EcC8Bdeb76F2C6760eD2dc8A46ca5e581fA656);

    isInitialized = true;
  }

  // Allows the owner to (re)configure API.
  function handleConfigureAPI(
    bytes32 _jobId,
    uint256 _fee,
    string calldata _endpoint,
    string calldata _path,
    address _tokenAddress,
    address _oracleAddress
  ) public onlyOwner {
    jobId = _jobId;
    fee = _fee;
    endpoint = _endpoint;
    path = _path;
    setChainlinkToken(_tokenAddress);
    setChainlinkOracle(_oracleAddress);
  }

  // Allows owner to request data from endpoint.
  function handleRequestData() public onlyOwner returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      jobId,
      address(this),
      this.handleFulfillRequest.selector
    );

    req.add("get", endpoint);
    req.add("path", path);
    req.addInt("times", 10**18);

    return sendChainlinkRequest(req, fee);
  }

  // Allows data to be set once recieved.
  function handleFulfillRequest(bytes32 _requestId, uint256 _value)
    public
    recordChainlinkFulfillment(_requestId)
  {
    emit RequestValue(_requestId, _value);
    value = _value;
  }

  // Allows owner to withdraw funds from the contract.
  function handleWithdrawLink() public onlyOwner {
    require(
      link.transfer(msg.sender, link.balanceOf(address(this))),
      "Unable to transfer"
    );
  }
}
