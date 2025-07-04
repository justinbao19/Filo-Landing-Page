# 🚀 Filo Landing Page

> **Filo** - 智能邮件管理应用的官方着陆页  
> 将复杂的邮件转化为清晰的摘要、快速回复和AI生成的待办事项

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ 项目特性

- 🎨 **现代化设计**：精美的UI设计和流畅的动画效果
- 📱 **响应式布局**：完美适配桌面和移动设备
- ⚡ **高性能**：基于Next.js 15和Turbopack的极速构建
- 🎭 **动态交互**：打字效果、悬停动画、平滑滚动
- 🌐 **国际化支持**：多语言切换功能
- 🎯 **TypeScript**：完整的类型安全保障

## 🖥️ 在线预览

- **开发环境**：[http://localhost:3001](http://localhost:3001)
- **生产环境**：[部署链接](https://your-domain.com)

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Next.js](https://nextjs.org/) | 15.3.4 | React框架 |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.1 | 样式框架 |
| [Next-intl](https://next-intl-docs.vercel.app/) | 4.3.1 | 国际化 |
| [React](https://reactjs.org/) | 19.1.0 | UI库 |

## 🚀 快速开始

### 环境要求

- Node.js 18.17+ 
- npm 9+ 或 pnpm 8+

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 pnpm (推荐)
pnpm install

# 使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 使用 pnpm
pnpm dev

# 使用 yarn
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
Filo_Landing_Page/
├── public/                    # 静态资源
│   ├── icons/                # 图标文件
│   │   ├── brand/           # 品牌图标
│   │   ├── ui/              # UI图标
│   │   ├── feature/         # 功能图标
│   │   └── common/          # 通用图标
│   ├── feature/             # 功能展示图片
│   └── common/              # 其他静态文件
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx         # 首页组件
│   └── i18n/                # 国际化配置
├── messages/                # 多语言文件
├── package.json
├── tailwind.config.ts       # Tailwind配置
├── tsconfig.json           # TypeScript配置
└── next.config.ts          # Next.js配置
```

## 🎨 图标管理规范

### 📂 文件组织结构

所有图标文件统一存放在 `public/icons/` 目录下，按功能分类：

```
public/icons/
├── brand/       # 品牌相关图标（logo、社交媒体等）
├── ui/          # UI交互图标（按钮、导航等）
├── feature/     # 功能特性图标（产品功能展示等）
└── common/      # 通用图标（箭头、关闭、菜单等）
```

### 📝 命名规范

**格式：** `{类别}-{描述}-{状态?}.{扩展名}`

```bash
✅ 推荐命名：
brand-logo.svg
brand-logo-white.svg
ui-arrow-right.svg
ui-menu-hamburger.svg
feature-security-shield.svg
common-close.svg

❌ 避免命名：
Logo.svg          # 大写开头
arrow_right.svg   # 下划线
icon1.svg         # 无意义数字
```

### 💡 使用示例

```tsx
import Image from "next/image";

<Image 
  src="/icons/brand/brand-logo.svg" 
  alt="Filo Logo" 
  width={60} 
  height={35.792}
  className="w-[60px] h-[35.792px]"
/>
```

## 🎯 核心功能

### 📧 邮件管理展示
- 邮件摘要功能演示
- 智能分类展示
- AI回复生成

### 🎨 动态交互
- 打字效果动画
- 悬停交互效果
- 平滑滚动展示

### 📱 响应式设计
- Mobile/Desktop切换
- 自适应布局
- 触摸友好交互

### 🌍 多语言支持
- 中英文切换
- 动态语言加载
- 本地化内容

## 🔧 开发指南

### 添加新功能

1. **创建组件**：在 `src/components/` 目录下创建新组件
2. **添加样式**：使用Tailwind CSS类或CSS模块
3. **类型定义**：为所有props和状态添加TypeScript类型
4. **国际化**：在 `messages/` 目录下添加多语言文本

### 代码规范

- 使用TypeScript严格模式
- 遵循ESLint配置
- 组件使用函数式写法
- 样式优先使用Tailwind CSS.

### 性能优化

- 图片使用Next.js Image组件
- 代码分割和懒加载
- 静态生成(SSG)优化
- 资源压缩和缓存

## 📊 性能指标

- **Lighthouse评分**：95+ (Performance)
- **首屏加载时间**：< 2s
- **交互延迟**：< 100ms
- **累积布局偏移**：< 0.1

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- **项目主页**：[Filo官网](https://filomail.com)
- **问题反馈**：[GitHub Issues](https://github.com/your-username/filo-landing-page/issues)
- **邮箱联系**：contact@filomail.com

---

<div align="center">
  <p>用 ❤️ 构建，为了更好的邮件管理体验</p>
  <p>© 2024 Filo. All rights reserved.</p>
</div>
