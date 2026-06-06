<div align="center">

# 🚀 CodeSnap CLI

**智能代码片段管理工具 - 终端原生的开发者效率利器**

[![npm version](https://img.shields.io/npm/v/codesnap-cli.svg)](https://www.npmjs.com/package/codesnap-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

[简体中文](#简体中文) | [繁體中文](#繁體中文) | [English](#english)

</div>

---

## 简体中文

### 🎉 项目介绍

CodeSnap CLI 是一款专为开发者打造的**终端原生代码片段管理工具**。在日常开发中，你是否经常遇到以下痛点？

- 🔍 翻遍多个项目才能找到那段"用过但忘了放哪"的代码
- 📋 复制粘贴散落在各处笔记中的代码片段，格式全乱
- 🔄 换了新电脑，积攒多年的代码片段全部丢失
- 🏷️ 代码片段越积越多，却没有有效的分类和检索方式

CodeSnap CLI 正是为解决这些痛点而生！它让你可以在终端中**高效地管理、搜索、同步**代码片段，无需离开键盘，无需打开浏览器，一切尽在命令行中完成。

**灵感来源**：受 `pet`、`cheat` 等优秀CLI工具的启发，我们打造了这款更智能、更现代、更友好的代码片段管理器。

**自研差异化亮点**：
- 比传统工具更智能的**模糊搜索**（支持内容+标签+描述多维度匹配）
- 原生支持 **GitHub Gist 双向同步**，云端备份不丢失
- 内置**模板变量**自动替换（如 `${DATE}`、`${FILENAME}`）
- 精美的终端界面，支持语法高亮预览

### ✨ 核心特性

| 特性 | 说明 |
|------|------|
| 📝 **快速记录** | 交互式添加代码片段，支持多语言和标签分类 |
| 🔍 **智能搜索** | 基于 Fuse.js 的模糊搜索，支持标题/描述/代码/标签多维度检索 |
| 📋 **一键复制** | 查看片段时可直接复制到剪贴板，支持模板变量自动替换 |
| ☁️ **云同步** | 原生支持 GitHub Gist 双向同步，多设备无缝切换 |
| 📤 **导入导出** | 支持 JSON / Markdown 格式导入导出，方便备份和分享 |
| 🏷️ **标签管理** | 灵活的标签体系，让片段分类井井有条 |
| 🎨 **精美界面** | 终端原生渲染，语法高亮，操作体验流畅 |
| 🔒 **本地优先** | 所有数据默认本地存储，隐私安全有保障 |

### 🚀 快速开始

#### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

#### 安装

```bash
# 全局安装
npm install -g codesnap-cli

# 或使用 npx 直接运行
npx codesnap-cli
```

#### 快速启动

```bash
# 查看欢迎界面
codesnap

# 添加第一个代码片段
codesnap add

# 列出所有片段
codesnap list

# 搜索片段
codesnap search debounce

# 查看统计信息
codesnap stats
```

### 📖 详细使用指南

#### 添加代码片段

```bash
codesnap add
# 或简写
cs a
```

交互式填写标题、描述、编程语言、代码内容和标签。

#### 列出和筛选

```bash
# 列出所有片段
codesnap list

# 按编程语言筛选
codesnap list --language javascript

# 按标签筛选
codesnap list --tag utils

# 限制数量
codesnap list --limit 10
```

#### 智能搜索

```bash
# 基础搜索
codesnap search "防抖函数"

# 按语言筛选搜索
codesnap search "fetch" --language typescript

# 交互式选择结果
codesnap search "react" --interactive
```

#### 查看和复制

```bash
# 查看片段详情（支持ID或标题模糊匹配）
codesnap show <id>

# 查看并复制到剪贴板
codesnap show <id> --copy

# 仅显示原始代码
codesnap show <id> --raw
```

#### 编辑和删除

```bash
# 编辑片段
codesnap edit <id>

# 删除片段（带确认提示）
codesnap remove <id>
```

#### 导入导出

```bash
# 导出为 JSON
codesnap export --format json --output snippets.json

# 导出为 Markdown
codesnap export --format markdown --output snippets.md

# 导入片段
codesnap import snippets.json
```

#### GitHub Gist 同步

```bash
# 首次同步（会提示输入 GitHub Token）
codesnap sync

# 仅推送到 Gist
codesnap sync --push

# 仅从 Gist 拉取
codesnap sync --pull

# 使用指定 Token
codesnap sync --token YOUR_GITHUB_TOKEN
```

> 💡 **获取 GitHub Token**：访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) 生成，需要 `gist` 权限。

#### 模板变量

在代码片段中可以使用以下变量，查看/复制时会自动替换：

| 变量 | 说明 | 示例 |
|------|------|------|
| `${DATE}` | 当前日期 | 2025-06-06 |
| `${TIME}` | 当前时间 | 14:30:00 |
| `${DATETIME}` | 当前日期时间 | 2025-06-06 14:30:00 |
| `${FILENAME}` | 文件名 | untitled |
| `${YEAR}` | 当前年份 | 2025 |
| `${MONTH}` | 当前月份 | 06 |
| `${DAY}` | 当前日期 | 06 |

### 💡 设计思路与迭代规划

#### 技术选型原因

- **TypeScript**：提供强类型支持，提升代码质量和可维护性
- **Commander.js**：成熟的 Node.js CLI 框架，命令解析稳定可靠
- **Fuse.js**：轻量级模糊搜索库，无需后端即可实现智能检索
- **Inquirer.js**：交互式命令行提示，用户体验友好
- **Chalk**：终端字符串样式美化，输出更生动

#### 后续迭代计划

- [ ] 支持代码片段语法高亮预览
- [ ] 添加片段分享功能（生成短链接）
- [ ] 支持多仓库管理（工作区切换）
- [ ] 集成 AI 辅助生成片段描述和标签
- [ ] VS Code 插件联动
- [ ] 支持团队协作（共享片段库）

### 📦 打包与部署

#### 本地开发

```bash
# 克隆仓库
git clone https://github.com/gitstq/codesnap-manager.git
cd codesnap-manager

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 运行
npm start
```

#### 发布到 npm

```bash
# 登录 npm
npm login

# 发布
npm publish
```

### 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

- **Bug 反馈**：请使用 `bug` 标签提交 Issue，描述复现步骤
- **功能建议**：请使用 `feature` 标签提交 Issue
- **代码贡献**：Fork 仓库后提交 PR，确保通过所有测试

提交规范：
- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `refactor:` 代码重构
- `test:` 测试相关

### 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

---

## 繁體中文

### 🎉 專案介紹

CodeSnap CLI 是一款專為開發者打造的**終端原生程式碼片段管理工具**。在日常開發中，你是否經常遇到以下痛點？

- 🔍 翻遍多個專案才能找到那段「用過但忘了放哪」的程式碼
- 📋 複製貼上散落在各處筆記中的程式碼片段，格式全亂
- 🔄 換了新電腦，積攢多年的程式碼片段全部遺失
- 🏷️ 程式碼片段越積越多，卻沒有有效的分類和檢索方式

CodeSnap CLI 正是為解決這些痛點而生！它讓你可以在終端中**高效地管理、搜尋、同步**程式碼片段，無需離開鍵盤，無需開啟瀏覽器，一切盡在命令列中完成。

**自研差異化亮點**：
- 比傳統工具更智慧的**模糊搜尋**（支援內容+標籤+描述多維度匹配）
- 原生支援 **GitHub Gist 雙向同步**，雲端備份不遺失
- 內建**模板變數**自動替換（如 `${DATE}`、`${FILENAME}`）
- 精美的終端介面，支援語法高亮預覽

### ✨ 核心特性

| 特性 | 說明 |
|------|------|
| 📝 **快速記錄** | 互動式添加程式碼片段，支援多語言和標籤分類 |
| 🔍 **智慧搜尋** | 基於 Fuse.js 的模糊搜尋，支援標題/描述/程式碼/標籤多維度檢索 |
| 📋 **一鍵複製** | 查看片段時可直接複製到剪貼簿，支援模板變數自動替換 |
| ☁️ **雲同步** | 原生支援 GitHub Gist 雙向同步，多裝置無縫切換 |
| 📤 **匯入匯出** | 支援 JSON / Markdown 格式匯入匯出，方便備份和分享 |
| 🏷️ **標籤管理** | 靈活的標籤體系，讓片段分類井井有條 |
| 🎨 **精美介面** | 終端原生渲染，語法高亮，操作體驗流暢 |
| 🔒 **本地優先** | 所有資料預設本地儲存，隱私安全有保障 |

### 🚀 快速開始

#### 環境要求

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

#### 安裝

```bash
# 全域安裝
npm install -g codesnap-cli

# 或使用 npx 直接執行
npx codesnap-cli
```

#### 快速啟動

```bash
# 查看歡迎介面
codesnap

# 添加第一個程式碼片段
codesnap add

# 列出所有片段
codesnap list

# 搜尋片段
codesnap search debounce

# 查看統計資訊
codesnap stats
```

### 📖 詳細使用指南

#### 添加程式碼片段

```bash
codesnap add
# 或簡寫
cs a
```

互動式填寫標題、描述、程式語言、程式碼內容和標籤。

#### 列出和篩選

```bash
# 列出所有片段
codesnap list

# 按程式語言篩選
codesnap list --language javascript

# 按標籤篩選
codesnap list --tag utils

# 限制數量
codesnap list --limit 10
```

#### 智慧搜尋

```bash
# 基礎搜尋
codesnap search "防抖函數"

# 按語言篩選搜尋
codesnap search "fetch" --language typescript

# 互動式選擇結果
codesnap search "react" --interactive
```

#### 查看和複製

```bash
# 查看片段詳情（支援ID或標題模糊匹配）
codesnap show <id>

# 查看並複製到剪貼簿
codesnap show <id> --copy

# 僅顯示原始程式碼
codesnap show <id> --raw
```

#### 編輯和刪除

```bash
# 編輯片段
codesnap edit <id>

# 刪除片段（帶確認提示）
codesnap remove <id>
```

#### 匯入匯出

```bash
# 匯出為 JSON
codesnap export --format json --output snippets.json

# 匯出為 Markdown
codesnap export --format markdown --output snippets.md

# 匯入片段
codesnap import snippets.json
```

#### GitHub Gist 同步

```bash
# 首次同步（會提示輸入 GitHub Token）
codesnap sync

# 僅推送到 Gist
codesnap sync --push

# 僅從 Gist 拉取
codesnap sync --pull

# 使用指定 Token
codesnap sync --token YOUR_GITHUB_TOKEN
```

> 💡 **取得 GitHub Token**：訪問 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) 生成，需要 `gist` 權限。

#### 模板變數

在程式碼片段中可以使用以下變數，查看/複製時會自動替換：

| 變數 | 說明 | 範例 |
|------|------|------|
| `${DATE}` | 當前日期 | 2025-06-06 |
| `${TIME}` | 當前時間 | 14:30:00 |
| `${DATETIME}` | 當前日期時間 | 2025-06-06 14:30:00 |
| `${FILENAME}` | 檔案名 | untitled |
| `${YEAR}` | 當前年份 | 2025 |
| `${MONTH}` | 當前月份 | 06 |
| `${DAY}` | 當前日期 | 06 |

### 💡 設計思路與迭代規劃

#### 技術選型原因

- **TypeScript**：提供強型別支援，提升程式碼品質和可維護性
- **Commander.js**：成熟的 Node.js CLI 框架，命令解析穩定可靠
- **Fuse.js**：輕量級模糊搜尋庫，無需後端即可實現智慧檢索
- **Inquirer.js**：互動式命令列提示，使用者體驗友好
- **Chalk**：終端字串樣式美化，輸出更生動

#### 後續迭代計劃

- [ ] 支援程式碼片段語法高亮預覽
- [ ] 添加片段分享功能（生成短連結）
- [ ] 支援多倉庫管理（工作區切換）
- [ ] 整合 AI 輔助生成片段描述和標籤
- [ ] VS Code 外掛聯動
- [ ] 支援團隊協作（共享片段庫）

### 📦 打包與部署

#### 本地開發

```bash
# 克隆倉庫
git clone https://github.com/gitstq/codesnap-manager.git
cd codesnap-manager

# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建
npm run build

# 執行
npm start
```

#### 發佈到 npm

```bash
# 登入 npm
npm login

# 發佈
npm publish
```

### 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

- **Bug 反饋**：請使用 `bug` 標籤提交 Issue，描述復現步驟
- **功能建議**：請使用 `feature` 標籤提交 Issue
- **程式碼貢獻**：Fork 倉庫後提交 PR，確保通過所有測試

提交規範：
- `feat:` 新功能
- `fix:` 修復問題
- `docs:` 文件更新
- `refactor:` 程式碼重構
- `test:` 測試相關

### 📄 開源協議

本專案基於 [MIT License](LICENSE) 開源。

---

## English

### 🎉 Introduction

CodeSnap CLI is a **terminal-native code snippet manager** built for developers. Do you often face these pain points in daily development?

- 🔍 Searching through multiple projects to find that "used but forgotten" piece of code
- 📋 Copy-pasting code snippets from scattered notes, losing all formatting
- 🔄 Getting a new computer and losing years of accumulated code snippets
- 🏷️ Having more and more snippets but no effective way to categorize and retrieve them

CodeSnap CLI is born to solve these problems! It allows you to **efficiently manage, search, and sync** code snippets right in the terminal—no need to leave the keyboard, no need to open a browser.

**Differentiation Highlights**:
- **Smarter fuzzy search** than traditional tools (multi-dimensional matching: content + tags + description)
- Native **GitHub Gist bidirectional sync** for cloud backup
- Built-in **template variables** auto-replacement (e.g., `${DATE}`, `${FILENAME}`)
- Beautiful terminal UI with syntax highlighting preview

### ✨ Core Features

| Feature | Description |
|---------|-------------|
| 📝 **Quick Record** | Interactive snippet addition with multi-language and tag support |
| 🔍 **Smart Search** | Fuse.js powered fuzzy search across title/description/code/tags |
| 📋 **One-click Copy** | Copy to clipboard with template variable auto-replacement |
| ☁️ **Cloud Sync** | Native GitHub Gist bidirectional sync for multi-device seamless switching |
| 📤 **Import/Export** | JSON / Markdown format support for backup and sharing |
| 🏷️ **Tag Management** | Flexible tagging system for organized snippet categorization |
| 🎨 **Beautiful UI** | Terminal-native rendering with syntax highlighting |
| 🔒 **Local-first** | All data stored locally by default, privacy guaranteed |

### 🚀 Quick Start

#### Requirements

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

#### Installation

```bash
# Global install
npm install -g codesnap-cli

# Or use npx directly
npx codesnap-cli
```

#### Quick Start Commands

```bash
# View welcome screen
codesnap

# Add your first snippet
codesnap add

# List all snippets
codesnap list

# Search snippets
codesnap search debounce

# View statistics
codesnap stats
```

### 📖 Detailed Usage Guide

#### Add a Snippet

```bash
codesnap add
# or shorthand
cs a
```

Interactively fill in title, description, programming language, code content, and tags.

#### List and Filter

```bash
# List all snippets
codesnap list

# Filter by language
codesnap list --language javascript

# Filter by tag
codesnap list --tag utils

# Limit results
codesnap list --limit 10
```

#### Smart Search

```bash
# Basic search
codesnap search "debounce function"

# Search with language filter
codesnap search "fetch" --language typescript

# Interactive selection
codesnap search "react" --interactive
```

#### View and Copy

```bash
# View snippet details (supports ID or title fuzzy matching)
codesnap show <id>

# View and copy to clipboard
codesnap show <id> --copy

# Show raw code only
codesnap show <id> --raw
```

#### Edit and Delete

```bash
# Edit snippet
codesnap edit <id>

# Delete snippet (with confirmation)
codesnap remove <id>
```

#### Import and Export

```bash
# Export as JSON
codesnap export --format json --output snippets.json

# Export as Markdown
codesnap export --format markdown --output snippets.md

# Import snippets
codesnap import snippets.json
```

#### GitHub Gist Sync

```bash
# First sync (will prompt for GitHub Token)
codesnap sync

# Push only
codesnap sync --push

# Pull only
codesnap sync --pull

# Use specific token
codesnap sync --token YOUR_GITHUB_TOKEN
```

> 💡 **Get GitHub Token**: Visit [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) to generate one with `gist` scope.

#### Template Variables

The following variables in snippets will be auto-replaced when viewing/copying:

| Variable | Description | Example |
|----------|-------------|---------|
| `${DATE}` | Current date | 2025-06-06 |
| `${TIME}` | Current time | 14:30:00 |
| `${DATETIME}` | Current datetime | 2025-06-06 14:30:00 |
| `${FILENAME}` | File name | untitled |
| `${YEAR}` | Current year | 2025 |
| `${MONTH}` | Current month | 06 |
| `${DAY}` | Current day | 06 |

### 💡 Design Philosophy & Roadmap

#### Tech Stack Rationale

- **TypeScript**: Strong typing for code quality and maintainability
- **Commander.js**: Mature Node.js CLI framework for stable command parsing
- **Fuse.js**: Lightweight fuzzy search without backend requirements
- **Inquirer.js**: Interactive CLI prompts for friendly UX
- **Chalk**: Terminal string styling for beautiful output

#### Roadmap

- [ ] Syntax highlighting preview for snippets
- [ ] Snippet sharing (short link generation)
- [ ] Multi-repository management (workspace switching)
- [ ] AI-assisted snippet description and tag generation
- [ ] VS Code plugin integration
- [ ] Team collaboration (shared snippet library)

### 📦 Build & Deploy

#### Local Development

```bash
# Clone repo
git clone https://github.com/gitstq/codesnap-manager.git
cd codesnap-manager

# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build

# Run
npm start
```

#### Publish to npm

```bash
# Login to npm
npm login

# Publish
npm publish
```

### 🤝 Contributing

Issues and Pull Requests are welcome!

- **Bug Reports**: Use `bug` label, describe reproduction steps
- **Feature Requests**: Use `feature` label
- **Code Contributions**: Fork and submit PR, ensure all tests pass

Commit conventions:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `refactor:` Code refactoring
- `test:` Test related

### 📄 License

This project is open-sourced under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ for developers**

[⬆ Back to Top](#-codesnap-cli)

</div>
