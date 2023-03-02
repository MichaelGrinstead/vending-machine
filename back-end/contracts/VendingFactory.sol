// SPDX-License-Identifier: GPL-3.0

import "./Vending.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity 0.8.19;

contract VendingFactory {

    ERC721 nft;

    mapping(address => address) public ownerToVendingContract;

    mapping(string => address) public tokenNameToOwner;
    mapping(string => address) public tokenSymbolToOwner;

    function createVending(address _tokenAddress, string memory _name, string memory _symbol) external {
        Vending vending = new Vending(_tokenAddress, _name, _symbol);

        ownerToVendingContract[msg.sender] = address(vending);
        tokenNameToOwner[_name] = msg.sender;
    }
}