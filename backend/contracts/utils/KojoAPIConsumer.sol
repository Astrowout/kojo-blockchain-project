// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */
contract KojoAPIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public regionAverage;
    uint256 public usage;
    uint256 public familySize;

    string private endpoint;
    string private path;
    address private tokenAddress;
    address private oracleAddress;
    bytes32 private jobId;
    uint256 private fee;

    event RequestFulfilled(bytes32 indexed requestId, uint256 regionAverage, uint256 usage, uint256 familySize);

    /**
     * @notice Initialize the link token and target oracle
     *
     * Polygon Testnet (mumbai) details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0xc8D925525CA8759812d0c299B90247917d4d4b7C (Mumbai oracle)
     * jobId: a4ff98397da34565968cf775a293940c
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xc8D925525CA8759812d0c299B90247917d4d4b7C);
        jobId = 'a4ff98397da34565968cf775a293940c';
        fee = 10 ** 16; // 0.01 LINK
    }

    function handleConfigureAPI (
      bytes32 _jobId,
      uint256 _fee,
      string calldata _endpoint,
      string calldata _path,
      address _tokenAddress,
      address _oracleAddress
    ) external onlyOwner {
      jobId = _jobId;
      fee = _fee;
      endpoint = _endpoint;
      path = _path;
      tokenAddress = _tokenAddress;
      oracleAddress = _oracleAddress;
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data which is located in a list
     */
    function requestKojoAllowance(address account) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // API docs: https://api.play-kojo.xyz/api/farys/{account}
        bytes memory did = toBytes(account);
        req.add('get', string(string.concat("https://api.play-kojo.xyz/api/farys/latest/", did)));
        req.add('path', 'regionAverage');
        req.add('get', string(string.concat("https://api.play-kojo.xyz/api/farys/latest/", did)));
        req.add('path', 'usage');
        req.add('get', string(string.concat("https://api.play-kojo.xyz/api/farys/latest/", did)));
        req.add('path', 'familySize');
        // Sends the request
        sendChainlinkRequest(req, fee);
    }

    /**
     * @notice Fulfillment function for multiple parameters in a single request
     * @dev This is called by the oracle. recordChainlinkFulfillment must be used.
     */
    function fulfill(
        bytes32 _requestId,
        uint256 _regionAverage,
        uint256 _usage,
        uint256 _familySize
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestFulfilled(_requestId, _regionAverage, _usage, _familySize);
        regionAverage = _regionAverage;
        usage = _usage;
        familySize = _familySize;
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }


    /**
     * Convert address type to bytes type
     */
    function toBytes(address a) public pure returns (bytes memory b) {
        assembly {
            let m := mload(0x40)
            a := and(a, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF)
            mstore(add(m, 20), xor(0x140000000000000000000000000000000000000000, a))
            mstore(0x40, add(m, 52))
            b := m
        }
    }
}
