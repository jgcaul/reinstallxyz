import { createContentLoader } from 'vitepress'
export default createContentLoader('scripts/*.md', {
  watch: true,
  render: false,
  includeSrc: false,
  transform(raw) {
    // 定义排序顺序
    const orderMap = {
      'mengka': 0,
      'bin23456789': 1,
      '1keydd': 2,
      'leitbogioro': 3
    }
    
    // 提取文件名（不含扩展名）作为排序key
    const getFileKey = (url) => url.split('/').pop().replace('.md', '')
    
    return raw
      .map(item => ({
        url: item.url,
        title: item.frontmatter.title,
        desc: item.frontmatter.desc,
        repoUrl: item.frontmatter.repoUrl,
        codeType: item.frontmatter.codeType,
        codeRaw: item.frontmatter.codeRaw,
        _fileKey: getFileKey(item.url)
      }))
      .sort((a, b) => (orderMap[a._fileKey] ?? 999) - (orderMap[b._fileKey] ?? 999))
      .map(({ _fileKey, ...item }) => item) // 移除临时字段
  }
})
