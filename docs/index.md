# 一键DD脚本合集 | reinstall.xyz
<p style="font-size:18px; color:var(--vp-c-text-2);">来自：https://blog.tanglu.me/dd 整理发布</p>

<script setup>

import { data } from './.vitepress/loaders/scripts.data.js'
import { computed } from 'vue'

const techStack = ["Go", "Python", "Shell", "Vue3", "VitePress", "MySQL", "Nginx", "Debian", "PVE/KVM", "CI/CD"]
// 修复：为隐藏标题添加前缀，避免id冲突
const anchorText = computed(() => data.map(item => `## _anchor_${item.title}`).join('\n'))
</script>

<style>
.tag {
  display: inline-block;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  margin: 4px 6px 4px 0;
  background: var(--vp-c-brand-lighter);
  color: var(--vp-c-brand);
}
.dark .tag {
  background: rgba(64,169,255,0.15);
}
.project-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  transition: all 0.25s ease;
}
.project-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 16px rgba(0,122,204,0.12);
  transform: translateY(-3px);
}
.project-card .vp-code-block {
  margin: 12px 0 4px;
}
.line-wrap {
  white-space: pre-line !important;
  display: block;
  margin: 1px 10px;
}
/* 隐藏占位标题，仅用于大纲解析，页面不可见 */
.anchor-hide {
  display: none;
}
</style>

## 📦 项目展示
<!-- 隐藏静态二级标题，VitePress编译阶段抓取生成右侧目录 -->
<div class="anchor-hide" v-html="anchorText"></div>

<!-- 卡片正常渲染，页面可见内容 -->
<div v-for="item in data" class="project-card" :key="item.url">
  <h3 :id="item.title">{{ item.title }}</h3>
  <span class="line-wrap">- 简介：{{ item.desc }}</span>
  <span class="line-wrap">- 仓库：<a :href="item.repoUrl" target="_blank">访问仓库</a></span>

  调用示例（点击按钮复制）：
  <div class="language-bash vp-code-block">
    <button title="复制代码" class="copy"></button>
    <span class="lang">bash</span>
    <pre><code>{{ item.codeRaw }}</code></pre>
  </div>
</div>

<hr>

## 👨‍💻 关于我
长期从事服务端底层开发，擅长 Linux 运维、自动化部署、前端静态工程、数据库调优。
业余开源各类工具脚本、系统定制、轻量化网页项目，所有作品开源可查看源码。

### 技术栈
<span v-for="t in techStack" class="tag">{{ t }}</span>

<hr>

## 📬 联系方式
- Github：https://github.com/jgcaul/reinstallxyz
- Gitee：https://gitee.com/
- Email：demo@example.com

> 欢迎 Star、Issue、交流技术问题
