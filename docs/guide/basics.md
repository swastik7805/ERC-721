---
title: Properties & Architecture
---

# Properties & Architecture

Understanding the fundamental difference between fungible and non-fungible assets and how the ERC-721 standard implements them.

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

### The On-Chain Mapping

The contract maintains:
- A mapping of **token ID → owner address**
- A mapping of **owner address → token count (balance)**
- A mapping of **token ID → approved address** (for transfers)
- A mapping of **owner → operator → bool** (for operator approvals)
