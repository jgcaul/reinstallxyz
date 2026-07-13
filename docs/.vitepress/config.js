import { defineConfig } from 'vitepress'
import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'

const dumpDevJson = async () => {
  const loader = createContentLoader('scripts/*.md', { watch: false, render: false, includeSrc: false })
  const data = await loader.load()
  fs.writeFileSync('./scripts-dev.json', JSON.stringify(data, null, 2), 'utf8')
}

export default defineConfig({
  title: "reinstall.xyz",
  description: "一键DD脚本合集",
  base: "/",
  head: [
    ['style', {}, `
      :root {
        --vp-c-brand: #007acc;
        --vp-c-brand-light: #0098ff;
        --vp-c-brand-lighter: #cce7ff;
      }
      .dark {
        --vp-c-brand: #40a9ff;
        --vp-c-brand-light: #69b1ff;
      }
      .vp-doc {
        max-width: 1100px;
        margin: 0 auto;
        padding: 2rem 3rem;
      }
      hr {
        margin: 48px 0;
        border: none;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--vp-c-divider), transparent);
      }
    `]
  ],
  themeConfig: {
    sidebar: false,
    outline: [2,3],
    prev: false,
    next: false,
    backToTop: true,
    nav: [
      { text: "Github", link: "https://github.com/jgcaul/reinstallxyz" }
    ],
    footer: {
      copyright: "© 2026 一键DD脚本合集 | Powered by reinstall.xyz"
    }
  },
  vite: {
    server: { host: '0.0.0.0' },
    plugins: [{
      name: 'dump-data',
      configureServer(server) {
        dumpDevJson()
        server.watcher.on('change', f => f.includes('/scripts/') && dumpDevJson())
      }
    }]
  },
  async buildEnd(ctx) {
    const loader = createContentLoader('scripts/*.md')
    const allData = await loader.load()
    fs.writeFileSync(path.join(ctx.outDir, 'scripts.json'), JSON.stringify(allData, null, 2), 'utf8')
  }
})
