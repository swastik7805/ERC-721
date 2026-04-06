# ERC-721: The Complete Guide to Non-Fungible Token Standard

---

## 📌 Table of Contents

1. [What is ERC-721?](#what-is-erc-721)
2. [History & Origin](#history--origin)
3. [Fungible vs Non-Fungible Tokens](#fungible-vs-non-fungible-tokens)
4. [How ERC-721 Works](#how-erc-721-works)
5. [Core Interface & Functions](#core-interface--functions)
6. [Events](#events)
7. [Optional Extensions](#optional-extensions)
8. [Token Metadata](#token-metadata)
9. [Minting & Burning](#minting--burning)
10. [Approval & Transfer Mechanics](#approval--transfer-mechanics)
11. [ERC-721 vs ERC-20 vs ERC-1155](#erc-721-vs-erc-20-vs-erc-1155)
12. [Use Cases](#use-cases)
13. [OpenZeppelin Implementation](#openzeppelin-implementation)
14. [Security Considerations](#security-considerations)
15. [Best Practices](#best-practices)
16. [Real-World Examples](#real-world-examples)
17. [Summary](#summary)

---

## What is ERC-721?

**ERC-721** (Ethereum Request for Comments 721) is a **token standard** on the Ethereum blockchain that defines rules for creating and managing **Non-Fungible Tokens (NFTs)**.

- ERC stands for *Ethereum Request for Comments* — a formal process for proposing improvements and standards on Ethereum.
- ERC-721 is **not a token itself**, but a *technical blueprint* (interface) that smart contracts must follow to be recognized as NFT contracts.
- It enables the creation of tokens that are **unique**, **indivisible**, and **non-interchangeable** with each other.

> 💡 **Key Insight:** At its core, an ERC-721 contract is a mapping from a `uint256` (token ID) to an Ethereum address (owner). "Owning an NFT" simply means your address is the value stored for that token ID in the contract's mapping.

---

## History & Origin

| Detail | Info |
|---|---|
| **Proposed** | January 2018 |
| **Authors** | William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs |
| **EIP Number** | EIP-721 |
| **First Real-World Use** | CryptoPunks & CryptoKitties (Axiom Zen) |
| **Inspired By** | ERC-20 token standard |

ERC-721 was inspired by ERC-20 but was built to address its limitation: ERC-20 only tracks identical (fungible) tokens. ERC-721 was designed to track **distinct, unique assets**.

---

## Fungible vs Non-Fungible Tokens

| Property | Fungible (ERC-20) | Non-Fungible (ERC-721) |
|---|---|---|
| **Interchangeable?** | ✅ Yes | ❌ No |
| **Unique?** | ❌ No | ✅ Yes |
| **Example** | ETH, USDC, DAI | Art NFT, Game item, Land |
| **Value** | Same for all units | Each token has its own value |
| **Divisible?** | ✅ Often | ❌ No |

---

## How ERC-721 Works

Every NFT in an ERC-721 contract is assigned a **unique `uint256` token ID**. This ID:

- **Never changes** for the lifetime of the contract.
- Together with the **contract address**, forms a **globally unique identifier** for that asset on Ethereum:

```
(contract address, uint256 tokenId) → globally unique NFT
```

The contract maintains:
- A mapping of **token ID → owner address**
- A mapping of **owner address → token count (balance)**
- A mapping of **token ID → approved address** (for transfers)
- A mapping of **owner → operator → bool** (for operator approvals)

---

## Core Interface & Functions

Every ERC-721 compliant contract **must** implement the following functions:

### Read Functions

```solidity
// Returns number of NFTs owned by an address
function balanceOf(address _owner) external view returns (uint256);

// Returns the owner of a specific NFT
function ownerOf(uint256 _tokenId) external view returns (address);

// Returns the approved address for a specific NFT
function getApproved(uint256 _tokenId) external view returns (address);

// Returns true if an address is approved as an operator for another
function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### Write Functions

```solidity
// Safely transfers an NFT (checks if receiver can handle ERC-721)
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

// Transfers an NFT (does NOT check receiver capability)
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

// Approves an address to transfer a specific NFT
function approve(address _approved, uint256 _tokenId) external payable;

// Approves/revokes an operator for ALL tokens of the caller
function setApprovalForAll(address _operator, bool _approved) external;
```

> ⚠️ **Safe vs Unsafe Transfer:** `safeTransferFrom` checks whether the receiving address (if it's a contract) implements `onERC721Received`. This prevents tokens from being lost in contracts that can't handle NFTs. `transferFrom` makes no such check.

---

## Events

ERC-721 contracts must emit the following events:

```solidity
// Emitted when ownership changes (including mint and burn)
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

// Emitted when an approved address is set or changed
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

// Emitted when an operator is approved/revoked for all tokens
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

---

## Optional Extensions

ERC-721 has two widely used optional extension interfaces:

### ERC-721Metadata

Allows NFTs to have human-readable names, symbols, and URIs:

```solidity
function name() external view returns (string _name);
function symbol() external view returns (string _symbol);
function tokenURI(uint256 _tokenId) external view returns (string);
```

### ERC-721Enumerable

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
  "description": "A rare cyber kitty from the CryptoKitties universe.",
  "image": "https://ipfs.io/ipfs/Qm...",
  "attributes": [
    { "trait_type": "Background", "value": "Space" },
    { "trait_type": "Eyes",       "value": "Laser" },
    { "trait_type": "Rarity",     "value": "Legendary" }
  ]
}
```

### Metadata Storage Options

| Method | Pros | Cons |
|---|---|---|
| **Centralized (HTTP)** | Easy, cheap | Censored, can go offline |
| **IPFS** | Decentralized, content-addressed | Requires pinning |
| **Arweave** | Permanent storage | Upfront cost |
| **On-chain** | Fully decentralized | Very expensive in gas |

> ⚠️ **Real-world risk:** In April 2025, the CloneX NFT collection by RTFKT (Nike) temporarily lost all its artwork when Cloudflare restricted access due to a Terms of Service violation — highlighting the dangers of centralized metadata storage.

---

## Minting & Burning

ERC-721 does **not specify** how minting (creating) or burning (destroying) tokens work — these are left to the contract developer.

- **Minting:** A Transfer event is emitted from the **zero address** (`address(0)`) to the new owner.
- **Burning:** A Transfer event is emitted from the owner to the **zero address**.

```solidity
// Minting example (OpenZeppelin style)
_mint(msg.sender, newTokenId);

// Burning example
_burn(tokenId);
```

---

## Approval & Transfer Mechanics

### Single Token Approval
- `approve(address, tokenId)` — Allows ONE specific address to transfer ONE specific token.
- Only one address can be approved per token ID at a time.
- Approval is **cleared automatically** after a transfer.

### Operator Approval
- `setApprovalForAll(operator, true)` — Allows an address to manage **all** your tokens.
- Useful for marketplaces (e.g., OpenSea) so they can list/sell on your behalf.

### Transfer Flow
```
Owner calls transferFrom/safeTransferFrom
  → Contract checks: caller is owner, approved, or operator
  → Ownership mapping is updated
  → Single-token approval is cleared
  → Transfer event is emitted
```

---

## ERC-721 vs ERC-20 vs ERC-1155

| Feature | ERC-20 | ERC-721 | ERC-1155 |
|---|---|---|---|
| **Token Type** | Fungible | Non-Fungible | Both |
| **Uniqueness** | ❌ | ✅ | ✅ |
| **Batch Transfers** | ❌ | ❌ | ✅ |
| **Contract per Collection** | 1 contract | 1 per collection | 1 for many types |
| **Gas Efficiency** | High | Lower | Higher |
| **Best For** | Currencies | Unique items | Games, mixed assets |

---

## Use Cases

| Domain | Examples |
|---|---|
| **Digital Art** | Foundation, SuperRare, Art Blocks |
| **Gaming** | In-game weapons, skins, characters |
| **Collectibles** | CryptoPunks, Bored Ape Yacht Club |
| **Virtual Real Estate** | Decentraland LAND, The Sandbox |
| **Music & Media** | Royal, Sound.xyz |
| **Identity / Credentials** | Soulbound tokens, certificates |
| **Ticketing** | Event access passes, concert tickets |
| **Domain Names** | ENS (.eth domains) |
| **DeFi** | Liquidity positions (Uniswap v3) |

---

## OpenZeppelin Implementation

OpenZeppelin provides the most trusted, audited ERC-721 implementation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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

### OpenZeppelin Modules Available

- `ERC721.sol` — Base implementation
- `ERC721Enumerable.sol` — Adds enumeration
- `ERC721URIStorage.sol` — Per-token URI storage
- `ERC721Burnable.sol` — Adds burn capability
- `ERC721Royalty.sol` — EIP-2981 royalties support
- `ERC721Votes.sol` — Governance voting support

---

## Security Considerations

### ✅ safeTransferFrom vs transferFrom
Always prefer `safeTransferFrom` to prevent NFTs from being permanently lost in contracts that don't implement `onERC721Received`.

### ✅ Reentrancy Attacks
`safeTransferFrom` calls external contracts (receivers), which can create reentrancy vectors. Use `ReentrancyGuard` or the checks-effects-interactions pattern.

### ✅ Approval Exploits
If a user is tricked into calling `setApprovalForAll` for a malicious operator, all their NFTs can be drained. Warn users clearly in UIs.

### ✅ Metadata Mutability
If a contract allows the owner to change `tokenURI`, users may receive an NFT that looks completely different after purchase. Use immutable IPFS/Arweave URIs.

### ✅ Integer Overflow
Use Solidity 0.8+ (built-in overflow checks) or OpenZeppelin's SafeMath.

---

## Best Practices

1. **Use OpenZeppelin** — Audited, battle-tested contracts. Don't reinvent the wheel.
2. **Use IPFS / Arweave for metadata** — Avoid centralized HTTP URLs.
3. **Pin IPFS data** — Unpinned content can be garbage collected.
4. **Be transparent about mutability** — Clearly state if metadata can be changed.
5. **Protect URI update functions** — Use `onlyOwner` or role-based access control.
6. **Use `_safeMint`** — Prevents NFTs from being minted to contracts that can't receive them.
7. **Emit events correctly** — Don't skip Transfer events on mint/burn.
8. **Test thoroughly** — Unit test all edge cases including zero-address checks.
9. **Audit before mainnet** — Get a professional smart contract audit for production NFTs.

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
| **NBA Top Shot** | Licensed basketball highlight collectibles |

---

## Summary

```
ERC-721 = A standard interface for unique (non-fungible) tokens on Ethereum.

Core Idea:
  - Each token has a unique uint256 ID
  - (contract address + tokenId) = globally unique identifier
  - Ownership tracked via on-chain mapping

Key Functions:
  balanceOf()       → How many NFTs does an address own?
  ownerOf()         → Who owns this NFT?
  transferFrom()    → Transfer ownership
  safeTransferFrom()→ Transfer safely (checks receiver)
  approve()         → Allow someone to transfer one NFT
  setApprovalForAll()→ Allow operator for all NFTs

Key Events:
  Transfer, Approval, ApprovalForAll
```

---

> 📚 **Further Reading:**
> - [Official EIP-721](https://eips.ethereum.org/EIPS/eip-721)
> - [ethereum.org ERC-721 Docs](https://ethereum.org/developers/docs/standards/tokens/erc-721/)
> - [OpenZeppelin ERC-721](https://docs.openzeppelin.com/contracts/4.x/erc721)
> - [RareSkills ERC-721 Deep Dive](https://rareskills.io/post/erc721)

---

*Document generated: April 2026 | Based on EIP-721 specification and current ecosystem best practices.*
