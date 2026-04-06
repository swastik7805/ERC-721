import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ERC-721 Standard",
  description: "The complete guide to the Ethereum NFT standard.",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Basics', link: '/guide/basics' },
      { text: 'Security', link: '/guide/security' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Basics & Architecture', link: '/guide/basics' },
        ]
      },
      {
        text: 'Technical Details',
        items: [
          { text: 'Interface & Events', link: '/guide/interface' },
          { text: 'Metadata & Extensions', link: '/guide/deep-dive' },
        ]
      },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Security & Best Practices', link: '/guide/security' },
          { text: 'Real-world Examples', link: '/guide/ecosystem' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/swastik7805/ERC-721' }
    ],
    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2026-present Swastik Sharma'
    },
    search: {
      provider: 'local'
    }
  }
})
