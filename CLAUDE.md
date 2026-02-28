# limitless-landing

Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + next-themes + Geist font

> Limitless Agent 产品介绍网站，独立仓库，与主项目 Agent-with-TTS 分离部署。

## Directory Structure

```
limitless-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 根布局（Geist 字体 + ThemeProvider dark-first）
│   │   ├── page.tsx                # 单页入口（Nav + Hero + Showcase + Features + TechStack + Footer + i18n toggle）
│   │   └── globals.css             # 主题变量 + brand accent colors + noise overlay + animations + glass-card + gradient-text + cta-glow
│   ├── components/
│   │   ├── neural-spark-logo.tsx   # 品牌 Logo（Canvas 动画，从 Agent-with-TTS 移植）
│   │   ├── theme-provider.tsx      # next-themes dark-first
│   │   ├── sections/
│   │   │   ├── hero.tsx            # Hero：ambient particle canvas + 轨道环动画 + gradient text + feature pills + glow CTA
│   │   │   ├── showcase.tsx        # App Showcase：CSS-only mock 产品界面（浏览器框架 + 侧边栏 + 聊天消息 + 工具卡片 + 代码块）— 待替换为真实产品截图
│   │   │   ├── features.tsx        # Features：8 张 bento grid 玻璃态卡片（彩色图标 + 序号 + hover 渐变光带）
│   │   │   ├── tech-stack.tsx      # Tech Stack：无限 marquee 横向滚动（品牌色光点 + 渐隐遮罩）
│   │   │   ├── faq.tsx             # FAQ：已从页面移除，文件保留备用
│   │   │   └── footer.tsx          # Footer：floating logo + gradient 分隔线 + CTA + GitHub 链接
│   │   └── ui/                     # shadcn/ui 组件（accordion + button + badge）
│   ├── hooks/
│   │   └── use-intersection.ts     # IntersectionObserver hook（滚动触发动画，一次性触发后断开）
│   └── lib/
│       ├── i18n.ts                 # 中英双语字典（en/zh，类型安全）
│       └── utils.ts                # cn() 工具
├── package.json
└── tsconfig.json
```

## Design

- **风格**: Cinematic Dark Sci-Fi（深空黑底 + Neural Spark teal/blue/rose 品牌色辉光）
- **背景**: animated gradient mesh + 网格线 + 80 粒子 Canvas 动画 + noise 纹理叠加
- **卡片**: 玻璃态（3% 白色 + backdrop-blur + hover 上浮 + 阴影扩散）
- **动画**: 轨道环旋转、脉冲辉光、浮动、marquee、滚动触发 fadeInUp
- **导航**: 固定顶部栏（logo + 锚点链接 + 中英切换）

## Deployment

- **GitHub**: Limitless2023/limitless-landing
- **Vercel**: 需在 Dashboard 绑定 Git Integration + 自定义域名（每次 CLI deploy 生成唯一 URL）

## Development

```bash
npm run dev    # 开发模式（默认 3000，主项目占用时用 PORT=3001）
npm run build  # 生产构建
```

## Pending

- [ ] 用真实产品截图替换 CSS mock Showcase section
- [ ] Vercel Dashboard 绑定 GitHub repo + 短域名
- [ ] 添加 .gitignore 规则排除截图文件

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
