---
title: Ecosystem & Examples
---

# Ecosystem & Examples

Where ERC-721 fits in the blockchain world and real-world implementations.

## ERC-721 vs ERC-20 vs ERC-1155

| Feature | ERC-20 | ERC-721 | ERC-1155 |
|---|---|---|---|
| **Token Type** | Fungible | Non-Fungible | Both |
| **Batch Transfers** | ❌ | ❌ | ✅ |
| **Gas Efficiency** | High | Lower | Higher |
| **Best For** | Currencies | Unique items | Games, mixed assets |

---

## OpenZeppelin Implementation

OpenZeppelin provides the most trusted, audited ERC-721 implementation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.md";
import "@openzeppelin/contracts/access/Ownable.md";
import "@openzeppelin/contracts/utils/Counters.md";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
```

---

## Real-World Examples

| Project | Description |
|---|---|
| **CryptoKitties** | First major ERC-721 use case; breedable digital cats |
| **CryptoPunks** | 10,000 unique pixel art characters |
| **Bored Ape Yacht Club** | Club membership + IP rights via NFT |
| **Decentraland (LAND)** | Virtual real estate ownership |
| **ENS Domains** | `.eth` domain names as ERC-721 tokens |
| **Uniswap v3 Positions** | DeFi liquidity positions as NFTs |
