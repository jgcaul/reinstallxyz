import { createContentLoader } from 'vitepress'
import toc from './toc.js'

export default createContentLoader('scripts/*.md', {
  watch: true,
  render: true,
  includeSrc: false,
  transform(raw) {
    return raw
      .map(item => ({
        url: item.url,
        title: item.frontmatter?.title || '',
        desc: item.frontmatter?.desc || '',
        repoUrl: item.frontmatter?.repoUrl || '',
        codeType: item.frontmatter?.codeType || 'bash',
        codeRaw: item.frontmatter?.codeRaw || '',
        key: item.url.split('/').pop().replace('.html', '')
      }))
      .sort((a, b) => {
        const aIdx = toc.indexOf(a.key)
        const bIdx = toc.indexOf(b.key)
        return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx)
      })
      .map(({ key, ...item }) => item)
  }
})
