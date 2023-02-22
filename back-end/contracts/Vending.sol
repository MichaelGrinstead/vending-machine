// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./VendingToken.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity 0.8.17;

contract Vending is ERC721("Vending Item", "V-ITEM") {
    using Strings for uint256;

    VendingToken token;

    uint256 tokenId = 1;

    uint256 public itemTierOneAmount = 20;
    uint256 public itemTierTwoAmount = 20;
    uint256 public itemTierThreeAmount = 20;

    mapping(uint => string) public tokenIdToURI;

    string[] public CIDs = 
        [
        "QmPJCZbenCkYbDrHj9PPmvUHGbfgQUBGSK3BRTsmXRj3MR",
        "QmSi49oEboHGKiBrjRp5PkKEeXLE83j5fJG9TwVmfgcPcj",
        "QmRpCrsKQeCuXxfPCrVrk2Er6DgZ7grVinhHrwNbZC68yS",
        "QmSffb8DKjeMQoTUtBJq2XA72z4jemjuBQGmDtJd7DfPc9",
        "QmW9GYYZ3wb8tYA3Hpr3jnTD5uNbjDbd3TR7UbQm7qe4KJ",
        "QmUGTj9F9Qqx1FbwY7fVfGNZrGJnpopRJjdgvxNUVZF5yt",
        "Qmba2N1sMDpVFXVoPjS2CJxhqZXbquaKRwCkCMh1kW964x",
        "Qmbc1QogbULNZaM8UcBWPxxY6VFtqbXLduiPVpYLe5begu",
        "QmVkBC6VPuatf686sVEKPmEUoWfJruCmBMkV3NXGDGaY9M",
        "QmPjefQnS1W5Lj1SnBH8n16uWVCRX3JPmZxb4d2ReLpJa2",
        "QmWHy5Ffz7R9y6JWjrYPtMTF4qXu9esm7P1RvQNGYJ3LLB",
        "QmTWg4eRpQoMUc5pwnfvLNjjSu6RCBFKdAhgL717L6kN4z"
        ];
                


    constructor(address _GLTokenAddress) {
        token = VendingToken(_GLTokenAddress);
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
        string memory uri = tokenURI(_itemNumber);
        tokenIdToURI[tokenId] = uri;

        tokenId ++;
    }

    function tokenURI(uint256 _itemNumber) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, CIDs[_itemNumber - 1])) : "";
    }


    function _baseURI() internal pure override returns (string memory) {
        return "https://personal-project-storage.infura-ipfs.io/ipfs/";
    }


}