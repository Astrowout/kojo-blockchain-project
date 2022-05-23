// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract KojoAPIConsumer is ChainlinkClient, ConfirmedOwner {
  using Chainlink for Chainlink.Request;

  LinkTokenInterface internal link;

  bytes32 private jobId;
  uint256 private fee;

  string private endpoint;
  string private path;

  uint256 public value;

  event RequestVolume(bytes32 indexed requestId, uint256 volume);

  constructor() ConfirmedOwner(msg.sender) {
    link = LinkTokenInterface(chainlinkTokenAddress());
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
    //@TODO: Write checks and defaults.
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
    emit RequestVolume(_requestId, _value);
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
