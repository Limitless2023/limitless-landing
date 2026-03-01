/**
 * [INPUT]: 依赖 @/lib/i18n 的 Locale, @/hooks/use-intersection 的 useInView, next/image
 * [OUTPUT]: 对外提供 Showcase 组件 — 真实产品截图展示区
 * [POS]: sections 的产品展示器，Hero 之后的视觉锤
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import type { Locale } from "@/lib/i18n";
import { useInView } from "@/hooks/use-intersection";
import Image from "next/image";

/* ================================================================ */
/*  Showcase — 真实产品截图 · Desktop + iPhone 悬浮叠加                    */
/* ================================================================ */
export function Showcase({ locale }: { locale: Locale }) {
  const { ref, inView } = useInView(0.05);

  return (
    <section className="relative px-6 pb-24 pt-12 sm:pb-32 sm:pt-20" ref={ref}>
      {/* 背景辉光 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(232,224,216,0.04),transparent)]" />

      <div
        className={`mx-auto max-w-5xl transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="relative">
          {/* ---- 桌面端截图 ---- */}
          <div
            className="showcase-desktop-frame overflow-hidden rounded-xl"
          >
            <Image
              src="/showcase-desktop.png"
              alt="Limitless Agent — Desktop"
              width={2800}
              height={1800}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* ---- 底部反射光 ---- */}
          <div className="mx-auto mt-[-1px] h-16 w-3/4 bg-gradient-to-b from-white/[0.015] to-transparent blur-2xl" />

          {/* ---- iPhone 截图 — 悬浮叠加 ---- */}
          <div
            className={`absolute -bottom-8 right-2 hidden sm:block lg:-right-6 xl:-right-10 transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="animate-float-slow">
              {/* 手机机身 */}
              <div className="showcase-iphone-frame w-[130px] lg:w-[170px] xl:w-[200px] overflow-hidden rounded-[1.8rem] lg:rounded-[2.2rem] border-[3px] border-white/[0.1] bg-black/80 p-[3px] backdrop-blur-sm">
                {/* 屏幕内容 */}
                <div className="overflow-hidden rounded-[1.5rem] lg:rounded-[1.9rem]">
                  <Image
                    src="/showcase-iphone.png"
                    alt="Limitless Agent — iPhone"
                    width={1206}
                    height={2622}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
