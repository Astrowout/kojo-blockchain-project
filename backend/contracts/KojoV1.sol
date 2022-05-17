// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./access/KojoOwnable.sol";
import "./utils/KojoStorage.sol";
import "./utils/KojoUtils.sol";

import "./token/KojoERC1155.sol";

contract KojoV1 is KojoOwnable {
    KojoStorage private store;
    KojoUtils private utils;
    KojoERC1155 private token;

    constructor() {
        store = new KojoStorage();
        utils = new KojoUtils();
        token = new KojoERC1155();
    }

    // Allows owner to update store.
    function handleUpdateStoreAddress(address location) public isOwner {
        store = KojoStorage(location);
    }

    // Allows owner to update utils.
    function handleUpdateUtilsAddress(address location) public isOwner {
        utils = KojoUtils(location);
    }

    // Allows owner to update the start capital given to users.
    function handleUpdateStartCapital(uint startCapital) public isOwner {
        store.handleUpdateStartCapital(startCapital);
    }

    // Allows owner to update how many tokens are distributed for a given percentage point.
    function handleUpdateTokenSensitivity(uint tokenSensitivity) public isOwner {
        store.handleUpdateTokenSensitivity(tokenSensitivity);
    }

    // Allows owner to update the cost of watering a seed/plant.
    function handleUpdateWateringCost(uint wateringCost) public isOwner {
        store.handleUpdateWateringCost(wateringCost);
    }

    // Allows users to claim water.
    function handleClaimWaterTokens(address to, uint amount) public view {
        console.log(to, amount);
    }

    // Allows users to check their water balance.
    function handleReadWaterTokenBalance(address from) public view {
        console.log(from);
    }

    // Allows users to transfer their water.
    function handleTransferWaterTokens(address from, address to, uint amount) public view {
        console.log(from, to, amount);
    }

    // Allows users to buy seeds/plants with water.
    function handleMintPlantToken(address to, uint amount) public view {
        console.log(to, amount);
    }

    // Allows users to read their seeds/plants.
    function handleReadPlantTokens(address from) public view {
        console.log(from);
    }

    // Allows users to water seeds/plants.
    function handleWaterPlantToken(address from, uint amount) public view {
        console.log(from, amount);
    }

    // Allows users to transfer their seed/plant.
    function handleTransferPlantTokens(address from, address to, uint amount) public view {
        console.log(from, to, amount);
    }

    // Allows seed/plant to die.
    function handleKillPlantToken(address from, uint amount) public view {
        console.log(from, amount);
    }
}