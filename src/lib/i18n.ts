export type Locale = "en" | "zh";

const en = {
  hero: {
    title: "Your AI Playground",
    subtitle: "Multi-model conversations with memory, tools, and full transparency.",
    cta: "Try Now",
  },
  features: {
    title: "Features",
    items: [
      { title: "Web · Mac · iPhone", desc: "One codebase, three platforms. Seamless experience across Web, Electron desktop, and Capacitor iOS." },
      { title: "Multi-Model & Arena", desc: "Switch between Kimi K2.5, DeepSeek, Gemini, MiniMax. Compare two models side-by-side in Arena mode." },
      { title: "Conversation Memory", desc: "AI remembers your preferences across sessions. Semantic search over saved memories, zero vector DB cost." },
      { title: "AI Tool Ecosystem", desc: "Web search, code execution, image generation, URL reading, weather, task planning — plus MCP protocol for third-party tools." },
      { title: "Voice I/O", desc: "Full-duplex voice: push-to-talk STT and natural TTS. Speak to your AI, hear it respond." },
      { title: "Generative UI", desc: "AI generates interactive UI components — cards, tables, tabs, charts — directly in the conversation." },
      { title: "Artifacts Panel", desc: "Preview AI-generated code, HTML, Markdown, CSV, and SVG in a live sandbox. Copy or download instantly." },
      { title: "Custom Skills", desc: "Upload skill files to reshape AI behavior. Your instructions, your rules, your agent." },
    ],
  },
  tech: {
    title: "Built With",
  },
  faq: {
    title: "FAQ",
    items: [
      { q: "Is it free?", a: "Guest users get 3 free conversations. Sign up with email or Google to unlock unlimited access." },
      { q: "Which AI models are supported?", a: "Kimi K2.5, DeepSeek V3 & R1, Gemini 3 Flash & Pro, MiniMax M2.5 — with one-click switching and Arena comparison." },
      { q: "Is my data secure?", a: "Conversations are stored in your Supabase account. Memory saves are user-controlled and deletable at any time." },
      { q: "Can I extend it with my own tools?", a: "Yes. Connect any MCP-compatible server to add custom tools. Up to 5 servers supported." },
      { q: "Does it work offline?", a: "The Electron desktop app runs locally but requires internet for AI model APIs. The iOS app loads from the web." },
    ],
  },
  footer: {
    cta: "Start a Conversation",
    copyright: "© 2026 Limitless Agent. All rights reserved.",
    github: "GitHub",
  },
};

const zh: typeof en = {
  hero: {
    title: "你的 AI 工作台",
    subtitle: "多模型对话，跨会话记忆，工具生态，全链路可观测。",
    cta: "立即体验",
  },
  features: {
    title: "核心能力",
    items: [
      { title: "Web · Mac · iPhone", desc: "一套代码，三端运行。Web、Electron 桌面端、Capacitor iOS 无缝体验。" },
      { title: "多模型切换 & Arena", desc: "Kimi K2.5 / DeepSeek / Gemini / MiniMax 一键切换，Arena 模式并排对比两个模型的回答质量。" },
      { title: "跨对话记忆", desc: "AI 记住你的偏好和决策，语义搜索已保存记忆，零向量数据库成本。" },
      { title: "AI 工具生态", desc: "网络搜索、代码执行、图片生成、网页阅读、天气、任务规划 — 还支持 MCP 协议接入第三方工具。" },
      { title: "语音交互", desc: "全双工语音：按住说话语音识别 + 自然语音合成。对你的 AI 说话，听它回应。" },
      { title: "Generative UI", desc: "AI 在对话中直接生成可交互 UI 组件 — 卡片、表格、标签页、图表。" },
      { title: "Artifacts 面板", desc: "实时预览 AI 生成的代码、HTML、Markdown、CSV、SVG，沙盒 iframe 隔离，一键复制或下载。" },
      { title: "自定义技能", desc: "上传 Skill 文件重塑 AI 行为。你的指令，你的规则，你的 Agent。" },
    ],
  },
  tech: {
    title: "技术栈",
  },
  faq: {
    title: "常见问题",
    items: [
      { q: "免费吗？", a: "游客可免费体验 3 次对话。注册邮箱或 Google 账号即可解锁无限使用。" },
      { q: "支持哪些 AI 模型？", a: "Kimi K2.5、DeepSeek V3 & R1、Gemini 3 Flash & Pro、MiniMax M2.5 — 一键切换 + Arena 对比。" },
      { q: "数据安全吗？", a: "对话存储在你的 Supabase 账户中。记忆保存由用户控制，随时可删除。" },
      { q: "能接入自己的工具吗？", a: "可以。连接任何 MCP 兼容服务器即可添加自定义工具，最多支持 5 个服务器。" },
      { q: "支持离线使用吗？", a: "Electron 桌面端本地运行，但 AI 模型 API 需要网络。iOS 端从 Web 加载。" },
    ],
  },
  footer: {
    cta: "开始对话",
    copyright: "© 2026 Limitless Agent. All rights reserved.",
    github: "GitHub",
  },
};

const dictionaries = { en, zh } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
