"use client";

import type { Locale } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";

/* ================================================================ */
/*  Mock 产品界面 — 纯 CSS 构建的抽象 App 截图                           */
/* ================================================================ */
export function Showcase({ locale }: { locale: Locale }) {
  const { ref, inView } = useInView(0.05);

  return (
    <section className="relative px-6 py-16" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(120,224,200,0.04),transparent)]" />

      <div className={`mx-auto max-w-5xl transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        {/* ---- 浏览器框架 ---- */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-1.5 shadow-[0_8px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]">
          {/* 标题栏 */}
          <div className="flex items-center gap-2 rounded-t-xl bg-white/[0.03] px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)]/60" />
              <span className="text-[10px] text-white/25 font-mono">limitless-agents.vercel.app</span>
            </div>
          </div>

          {/* 内容区 */}
          <div className="flex h-[420px] overflow-hidden rounded-b-xl sm:h-[480px]">
            {/* 侧边栏 */}
            <div className="hidden w-56 shrink-0 border-r border-white/[0.05] bg-white/[0.015] p-4 sm:block">
              {/* 搜索框 */}
              <div className="mb-4 rounded-lg bg-white/[0.04] px-3 py-2">
                <div className="h-2 w-16 rounded bg-white/10" />
              </div>
              {/* 对话列表 */}
              <div className="space-y-2">
                {[0.7, 0.5, 0.9, 0.4, 0.6, 0.8, 0.3].map((w, i) => (
                  <div
                    key={i}
                    className={`rounded-lg px-3 py-2.5 ${i === 0 ? "bg-white/[0.06] border border-white/[0.08]" : ""}`}
                  >
                    <div className="h-2 rounded bg-white/10" style={{ width: `${w * 100}%` }} />
                    <div className="mt-1.5 h-1.5 w-12 rounded bg-white/5" />
                  </div>
                ))}
              </div>
            </div>

            {/* 聊天主区域 */}
            <div className="flex flex-1 flex-col">
              {/* 消息区 */}
              <div className="flex-1 space-y-4 overflow-hidden p-5">
                {/* 用户消息 */}
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-white/[0.08] px-4 py-2.5">
                    <div className="h-2 w-48 rounded bg-white/15" />
                  </div>
                </div>

                {/* AI 消息 */}
                <div className="flex gap-3">
                  <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-[var(--accent-teal)]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[var(--accent-teal)]/60" />
                  </div>
                  <div className="max-w-[75%] space-y-2">
                    <div className="h-2 w-full rounded bg-white/10" />
                    <div className="h-2 w-4/5 rounded bg-white/10" />
                    <div className="h-2 w-3/5 rounded bg-white/8" />
                    {/* 工具调用卡片 */}
                    <div className="mt-3 rounded-lg border border-[var(--accent-teal)]/10 bg-[var(--accent-teal)]/[0.03] px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)]/50" />
                        <div className="h-1.5 w-20 rounded bg-[var(--accent-teal)]/20" />
                      </div>
                    </div>
                    <div className="h-2 w-full rounded bg-white/10" />
                    <div className="h-2 w-2/3 rounded bg-white/8" />
                  </div>
                </div>

                {/* 用户消息 2 */}
                <div className="flex justify-end">
                  <div className="max-w-[60%] rounded-2xl rounded-br-sm bg-white/[0.08] px-4 py-2.5">
                    <div className="h-2 w-32 rounded bg-white/15" />
                    <div className="mt-1.5 h-2 w-20 rounded bg-white/12" />
                  </div>
                </div>

                {/* AI 消息 2 — code artifact */}
                <div className="flex gap-3">
                  <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-[var(--accent-teal)]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[var(--accent-teal)]/60" />
                  </div>
                  <div className="max-w-[75%] space-y-2">
                    <div className="h-2 w-4/5 rounded bg-white/10" />
                    {/* 代码块 */}
                    <div className="rounded-lg bg-black/30 p-3 font-mono">
                      <div className="h-1.5 w-3/4 rounded bg-[var(--accent-blue)]/15" />
                      <div className="mt-1.5 h-1.5 w-full rounded bg-white/6" />
                      <div className="mt-1.5 h-1.5 w-2/3 rounded bg-[var(--accent-teal)]/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 输入框 */}
              <div className="border-t border-white/[0.05] p-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <div className="flex-1">
                    <div className="h-2 w-40 rounded bg-white/8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-white/[0.04]" />
                    <div className="h-6 w-6 rounded-lg bg-[var(--accent-teal)]/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部反射光 */}
        <div className="mx-auto mt-[-1px] h-16 w-3/4 bg-gradient-to-b from-white/[0.02] to-transparent blur-xl" />
      </div>
    </section>
  );
}
