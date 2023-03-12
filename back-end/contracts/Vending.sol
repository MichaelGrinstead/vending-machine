// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./VendingToken.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity 0.8.19;

contract Vending is ERC721 {
    using Strings for uint256;

    VendingToken token;

    address public owner;

    uint256 tokenId = 1;

    mapping(uint => string) public tokenIdToURI;
    mapping(uint => string) public itemNumberToCID;
    mapping(uint => uint) public itemNumberToPrice;

    modifier onlyOwner(){
        require(msg.sender == owner);
    _;
    }
    constructor(address _VendingTokenAddress, address _owner, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        token = VendingToken(_VendingTokenAddress);
        owner = _owner;

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

    function addCID(uint _itemNumber, string memory _CID) external onlyOwner {
        itemNumberToCID[_itemNumber] = _CID;
    }

    function setPrice(uint _itemNumber, uint _price) external onlyOwner  {
        itemNumberToPrice[_itemNumber] = _price;
    }


    function purchase(address _to, uint _itemNumber) external {
        require(_itemNumber <= 12 && _itemNumber > 0);
        uint price = itemNumberToPrice[_itemNumber];

        (bool success) = token.transferFrom(msg.sender, payable(address(this)), price);
        require(success);

        _safeMint(_to, tokenId);
        string memory uri = tokenURI(_itemNumber);
        tokenIdToURI[tokenId] = uri;

        tokenId ++;
    }

    function tokenURI(uint256 _itemNumber) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, itemNumberToCID[_itemNumber])) : "";
    }


    function _baseURI() internal pure override returns (string memory) {
        return "https://personal-project-storage.infura-ipfs.io/ipfs/";
    }


}