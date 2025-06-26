This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 图标管理规范

### 📁 文件组织结构

所有图标文件统一存放在 `public/icons/` 目录下，按功能分类：

```
public/
  └── icons/
      ├── ui/          # UI 交互图标（按钮、导航等）
      ├── brand/       # 品牌相关图标（logo、社交媒体等）
      ├── feature/     # 功能特性图标（产品功能展示等）
      └── common/      # 通用图标（箭头、关闭、菜单等）
```

### 📋 命名规范

**格式：** `{类别}-{描述}-{状态?}.{扩展名}`

**示例：**
```
✅ 推荐命名：
- brand-logo.svg
- brand-logo-white.svg
- ui-arrow-right.svg
- ui-menu-hamburger.svg
- feature-security-shield.svg
- feature-analytics-chart.svg
- common-close.svg
- common-search.svg

❌ 避免命名：
- Logo.svg          # 大写开头
- arrow_right.svg   # 下划线
- icon1.svg         # 无意义数字
- 🔍search.svg      # emoji
```

### 🔧 命名规则详细说明

1. **全小写** + **连字符分隔**
2. **语义化命名**，见名知意
3. **按功能分类**，便于查找
4. **状态后缀**：如 `-active`、`-hover`、`-disabled`、`-white`、`-dark`
5. **保持一致性**，整个项目使用相同规则

### 💡 使用建议

在组件中引用图标：

```tsx
import Image from "next/image";

// 基础使用
<Image 
  src="/icons/brand/brand-logo.svg" 
  alt="Filo Logo" 
  width={32} 
  height={32} 
/>

// 响应式图标
<Image 
  src="/icons/ui/ui-menu-hamburger.svg" 
  alt="Menu" 
  width={24} 
  height={24}
  className="hover:opacity-70 transition-opacity"
/>
```

### 🎨 图标规格建议

- **格式**：优先使用 SVG 格式
- **尺寸**：原始设计尺寸建议为 24x24px 的倍数
- **颜色**：使用单色或可通过 CSS 控制的颜色
- **优化**：确保 SVG 代码已优化，移除不必要的元素

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
