import { createContentLoader } from 'vitepress'

// 自定义项目展示顺序，前面加数字的文件名需要用引号
const orderMap = {
  'mengka': 1,
  'bin23456789': 2,
  '1keydd': 0,           
  'leitbogioro': 3
}

export default createContentLoader('scripts/*.md', {
  watch: true,
  render: false,
  includeSrc: false,
  transform(raw) {
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
