---
title: Interface & Events
---

# Interface & Events

Every ERC-721 compliant contract **must** implement the core functions and events defined in the standard.

## Core Functions

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

> [!WARNING]
> **Safe vs Unsafe Transfer:** `safeTransferFrom` checks whether the receiving address (if it's a contract) implements `onERC721Received`. This prevents tokens from being lost in contracts that can't handle NFTs. `transferFrom` makes no such check.

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
