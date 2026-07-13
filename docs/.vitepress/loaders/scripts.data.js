import { createContentLoader } from 'vitepress'
export default createContentLoader('scripts/*.md', {
  watch: true,
  render: false,
  includeSrc: false,
  transform(raw) {
    return raw.map(item => ({
      url: item.url,
      title: item.frontmatter.title,
      desc: item.frontmatter.desc,
      repoUrl: item.frontmatter.repoUrl,
      codeType: item.frontmatter.codeType,
      codeRaw: item.frontmatter.codeRaw
    }))
  }
})
