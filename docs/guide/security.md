---
title: Security & Best Practices
---

# Security & Best Practices

Ensuring the security and longevity of your ERC-721 smart contracts and metadata.

## Security Considerations

### ✅ safeTransferFrom vs transferFrom
Always prefer `safeTransferFrom` to prevent NFTs from being permanently lost in contracts that don't implement `onERC721Received`.

### ✅ Reentrancy Attacks
`safeTransferFrom` calls external contracts (receivers), which can create reentrancy vectors. Use `ReentrancyGuard` or the checks-effects-interactions pattern.

### ✅ Approval Exploits
If a user is tricked into calling `setApprovalForAll` for a malicious operator, all their NFTs can be drained. Warn users clearly in UIs.

---

## Best Practices

1. **Use OpenZeppelin** — Audited, battle-tested contracts. Don't reinvent the wheel.
2. **Use IPFS / Arweave for metadata** — Avoid centralized HTTP URLs.
3. **Be transparent about mutability** — Clearly state if metadata can be changed.
4. **Use `_safeMint`** — Prevents NFTs from being minted to contracts that can't receive them.
5. **Pin IPFS data** — Unpinned content can be garbage collected.
6. **Test thoroughly** — Unit test all edge cases including zero-address checks.
7. **Audit before mainnet** — Get a professional smart contract audit for production NFTs.

> [!IMPORTANT]
> **Metadata Mutability:** If a contract allows the owner to change `tokenURI`, users may receive an NFT that looks completely different after purchase. Use immutable IPFS/Arweave URIs for long-term ownership.
