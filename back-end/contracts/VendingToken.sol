// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity 0.8.17;

contract VendingToken is ERC20("Vending Token", "$VENDING") {

    function mintGL(uint _amount) external {
        _mint(msg.sender, _amount);
    } 

    function decimals() public pure override returns (uint8) {
        return 2;
    }
    


}