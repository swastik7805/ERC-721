---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ERC-721 Standard"
  text: "The Complete NFT Guide"
  tagline: "Master the protocol behind the digital ownership revolution."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/swastik7805/ERC-721

features:
  - icon: 💎
    title: Uniquely Yours
    details: Explore how ERC-721 ensures every token is one-of-a-kind and non-interchangeable.
  - icon: 🛡️
    title: Secure by Design
    details: Deep dive into the core interface, safety checks, and battle-tested implementations.
  - icon: 🚀
    title: Metadata Rich
    details: Learn how to attach rich data, images, and attributes to your non-fungible assets.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #4776e6 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
