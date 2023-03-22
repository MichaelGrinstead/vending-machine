// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./VendingToken.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity 0.8.19;

contract Vending is ERC721 {
    using Strings for uint256;

    VendingToken token;

    address public owner;

    uint256 public tokenId = 1;

    mapping(uint => string) public tokenIdToURI;
    mapping(uint => string) public itemNumberToCID;
    mapping(uint => uint) public itemNumberToPrice;
    mapping(address => uint[]) addressToOwnedTokenIds;

    modifier onlyOwner(){
        require(msg.sender == owner);
    _;
    }

    constructor(address _VendingTokenAddress, address _owner, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        token = VendingToken(_VendingTokenAddress);
        owner = _owner;

    }

    // function fetchIds(address _owner) view external returns(uint[] memory){
    //     uint[] memory ids = new uint[](balanceOf(_owner));
    //     uint counter = 0;
    //     for(uint i = 1; i < tokenId; i ++){
    //         if(ownerOf(i) == _owner){
    //             ids[counter] = i;
    //             counter++;
    //         }
    //     }
    //     return ids;
    // }

    function fetchIds(address _owner) view external returns(uint[] memory){
    uint[] memory result = new uint[](balanceOf(_owner));
    
    for (uint i = 0; i < result.length; i++) {
        result[i] = addressToOwnedTokenIds[_owner][i];
    }
    return result;

    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        super.transferFrom(_from, _to, _tokenId);
        removeTokenIdFromAddress(_from, _tokenId);
        addTokenIdToAddress(_to, _tokenId);
    }

    function removeTokenIdFromAddress(address _owner, uint256 _tokenId) internal {
        uint256[] storage tokenIds = addressToOwnedTokenIds[_owner];
        for (uint256 i = 0; i < tokenIds.length; i++) {
            if (tokenIds[i] == _tokenId) {
                // remove the token ID from the array
                tokenIds[i] = tokenIds[tokenIds.length - 1];
                tokenIds.pop();
                break;
            }
        }
    }

    function addTokenIdToAddress(address _owner, uint256 _tokenId) internal {
        addressToOwnedTokenIds[_owner].push(_tokenId);
    }


    function addCID(uint _itemNumber, string memory _CID) external onlyOwner {
        itemNumberToCID[_itemNumber] = _CID;
    }

    function setPrice(uint _itemNumber, uint _price) external onlyOwner  {
        itemNumberToPrice[_itemNumber] = _price;
    }

    function withdraw() external onlyOwner {
        token.transfer(owner, token.balanceOf(address(this)));
    }



    function purchase(address _to, uint _itemNumber) external {
        require(_itemNumber <= 12 && _itemNumber > 0);
        require(token.balanceOf(msg.sender) > itemNumberToPrice[_itemNumber]);
        _safeMint(_to, tokenId);
        (bool success) = token.transferFrom(msg.sender, payable(address(this)), itemNumberToPrice[_itemNumber]);
        require(success);

        
        string memory uri = tokenURI(_itemNumber);
        tokenIdToURI[tokenId] = uri;
        addressToOwnedTokenIds[msg.sender].push(tokenId);

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