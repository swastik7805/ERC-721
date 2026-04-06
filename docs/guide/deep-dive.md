---
title: Metadata & Extensions
---

# Metadata & Extensions

Exploring the optional extensions and metadata standards that make NFTs interactive and rich.

## Optional Extensions

ERC-721 has two widely used optional extension interfaces:

### Metadata Extension (ERC-721Metadata)

Allows NFTs to have human-readable names, symbols, and URIs:

```solidity
function name() external view returns (string _name);
function symbol() external view returns (string _symbol);
function tokenURI(uint256 _tokenId) external view returns (string);
```

### Enumerable Extension (ERC-721Enumerable)

Allows on-chain enumeration of all tokens:

```solidity
function totalSupply() external view returns (uint256);
function tokenByIndex(uint256 _index) external view returns (uint256);
function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);
```

---

## Token Metadata

`tokenURI` returns a URL pointing to a **JSON metadata file** that describes the NFT:

```json
{
  "name": "Kitty #1",
  "description": "A rare cyber kitty.",
  "image": "https://ipfs.io/ipfs/Qm...",
  "attributes": [
    { "trait_type": "Background", "value": "Space" },
    { "trait_type": "Eyes",       "value": "Laser" }
  ]
}
```

### Metadata Storage Options

| Method | Pros | Cons |
|---|---|---|
| **Centralized (HTTP)** | Easy, cheap | Censored, can go offline |
| **IPFS** | Decentralized | Requires pinning |
| **Arweave** | Permanent storage | Upfront cost |
| **On-chain** | Fully decentralized | Very expensive in gas |

> [!CAUTION]
> **Real-world risk:** In April 2025, several NFT collections temporarily lost their artwork when centralized storage providers restricted access — highlighting the importance of decentralized metadata storage.
