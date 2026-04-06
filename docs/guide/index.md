---
title: Introduction to ERC-721
description: A comprehensive guide to the ERC-721 token standard on Ethereum.
---

# Introduction to ERC-721

**ERC-721** (Ethereum Request for Comments 721) is a **token standard** on the Ethereum blockchain that defines rules for creating and managing **Non-Fungible Tokens (NFTs)**.

- **ERC stands for** *Ethereum Request for Comments* — a formal process for proposing improvements and standards on Ethereum.
- **Blueprint, not a token**: ERC-721 is a technical blueprint (interface) that smart contracts must follow to be recognized as NFT contracts.
- **Uniqueness**: It enables the creation of tokens that are **unique**, **indivisible**, and **non-interchangeable**.

> [!TIP]
> **Key Insight:** At its core, an ERC-721 contract is a mapping from a `uint256` (token ID) to an Ethereum address (owner). "Owning an NFT" simply means your address is the value stored for that token ID in the contract's mapping.

---

## History & Origin

| Detail | Info |
|---|---|
| **Proposed** | January 2018 |
| **Authors** | William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs |
| **EIP Number** | EIP-721 |
| **First Use** | CryptoPunks & CryptoKitties |
| **Inspired By** | ERC-20 token standard |

ERC-721 was inspired by ERC-20 but was built to address its limitation: ERC-20 only tracks identical (fungible) tokens. ERC-721 was designed to track **distinct, unique assets**.
