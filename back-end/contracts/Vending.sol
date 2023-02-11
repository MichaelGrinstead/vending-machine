// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./GLToken.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity 0.8.17;

contract Vending is ERC721("Go Logic NFT", "GLNFT") {
    using Strings for uint256;

    GLToken token;

    uint256 tokenId = 1;

    uint256 public itemTierOneAmount = 20;
    uint256 public itemTierTwoAmount = 20;
    uint256 public itemTierThreeAmount = 20;

    string public URI;

    constructor(address _GLTokenAddress) {
        token = GLToken(_GLTokenAddress);
    }

    function updateURI(string memory _uri) external {
        URI = _uri;
    }

    function fetchIds(address _owner) view external returns(uint[] memory){
        uint[] memory ids = new uint[](balanceOf(_owner));
        uint counter = 0;
        for(uint i = 1; i < tokenId; i ++){
            if(ownerOf(i) == _owner){
                ids[counter] = i;
                counter++;
            }
        }
        return ids;
    }


    function purchase(address _to, uint _itemNumber, uint _amount) external {
        require(_itemNumber <= 12 && _itemNumber > 0);

        (bool success) = token.transferFrom(msg.sender, payable(address(this)), _amount);
        require(success);

        if(_itemNumber >= 1 && _itemNumber <= 4){
            require(_amount >= 200);
            require(itemTierOneAmount > 0);
            itemTierOneAmount --;
        }else if(_itemNumber >= 5 && _itemNumber <= 8) {
            require(_amount >= 400);
            require(itemTierTwoAmount > 0);
            itemTierTwoAmount --;
        }else if(_itemNumber >= 9 && _itemNumber <= 12){
            require(_amount >= 600);
            require(itemTierThreeAmount > 0);
            itemTierThreeAmount --;
        }
        _safeMint(_to, tokenId);

        tokenId ++;
    }

    function tokenURI(uint256 _itemNumber) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _itemNumber.toString())) : "";
    }


    function _baseURI() internal pure override returns (string memory) {
        return "";
    }


}