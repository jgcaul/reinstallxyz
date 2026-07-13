import { createContentLoader } from 'vitepress'

// ========== 自定义排序配置 ==========
// 按顺序列出文件名，第一个是最先显示
const sortOrder = ['mengka', 'bin456789', '1keydd', 'leitbogioro']
// ===================================

export default createContentLoader('scripts/*.md', {
  watch: true,
  render: false,
  includeSrc: false,
  transform(raw) {
    // 提取文件名（不含扩展名）
    const getFileKey = (url) => url.split('/').pop().replace('.md', '')
    
    // 添加排序索引
    const itemsWithOrder = raw.map(item => ({
      url: item.url,
      title: item.frontmatter.title,
      desc: item.frontmatter.desc,
      repoUrl: item.frontmatter.repoUrl,
      codeType: item.frontmatter.codeType,
      codeRaw: item.frontmatter.codeRaw,
      _fileKey: getFileKey(item.url),
      _orderIndex: sortOrder.indexOf(getFileKey(item.url))
    }))
    
    // 按 sortOrder 排序
    return itemsWithOrder
      .sort((a, b) => {
        const aIndex = a._orderIndex === -1 ? 999 : a._orderIndex
        const bIndex = b._orderIndex === -1 ? 999 : b._orderIndex
        return aIndex - bIndex
      })
      .map(({ _fileKey, _orderIndex, ...item }) => item) // 移除临时字段
  }
})
