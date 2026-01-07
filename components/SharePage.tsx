"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResultData, fortuneData } from "@/data/fortune";
import * as htmlToImage from "html-to-image";

type CardStyle = "ink" | "neon" | "cosmos";

interface SharePageProps {
  result: ResultData;
  onNext: () => void;
}

export function SharePage({
  result,
  onNext,
}: SharePageProps) {
  const [cardStyle, setCardStyle] = useState<CardStyle>("ink");
  const [isSaving, setIsSaving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const data = fortuneData[result.type];

  // 触觉反馈
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof window === 'undefined' || !navigator.vibrate) return;
    const patterns = { light: 10, medium: 30, heavy: 50 };
    navigator.vibrate(patterns[type]);
  }, []);

  const cardStyles: { key: CardStyle; name: string }[] = [
    { key: "ink", name: "墨染" },
    { key: "neon", name: "霓虹" },
    { key: "cosmos", name: "星尘" },
  ];

  // 生成分享文案
  const generateShareText = () => {
    return `赛博问卜 | ${data.name}\n\n「${result.judgement}」\n\n${result.scene}\n\n#赛博问卜`;
  };

  // 保存图片
  const handleSaveImage = async () => {
    triggerHaptic('medium');
    if (!shareCardRef.current || isSaving) return;

    setIsSaving(true);
    try {
      const dataUrl = await htmlToImage.toPng(shareCardRef.current, {
        pixelRatio: 3,
        quality: 1,
      });
      const link = document.createElement("a");
      link.download = "cyber-fortune.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("保存失败", error);
    } finally {
      setIsSaving(false);
    }
  };

  // 复制文案
  const handleCopyText = async () => {
    triggerHaptic('light');
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(generateShareText());
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error("复制失败", error);
    } finally {
      setIsCopying(false);
    }
  };

  // 原生分享（移动端）
  const handleNativeShare = async () => {
    triggerHaptic('medium');
    if (!shareCardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(shareCardRef.current, {
        pixelRatio: 2,
        quality: 0.9,
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "cyber-fortune.png", { type: "image/png" });

      if (navigator.share) {
        await navigator.share({
          title: '赛博问卜 - 我的精神状态',
          text: generateShareText(),
          files: [file],
        });
      } else {
        // 不支持原生分享时，回退到复制文案
        await navigator.clipboard.writeText(generateShareText());
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (error) {
      console.error("分享失败", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="w-full max-w-md mx-auto px-4 py-5 sm:px-6 sm:py-8"
    >
      {/* 引导语 */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-center text-moon-mist text-sm mb-6"
      >
        选一张你喜欢的，保存分享
      </motion.p>

      {/* 卡片样式切换 */}
      <div className="flex justify-center gap-3 mb-6">
        {cardStyles.map((style) => (
          <button
            key={style.key}
            onClick={() => {
              triggerHaptic('light');
              setCardStyle(style.key);
            }}
            className={`px-5 py-2.5 text-sm rounded-full transition-all duration-300 touch-manipulation min-h-[44px] flex items-center justify-center active:scale-95 ${
              cardStyle === style.key
                ? "bg-ink-deep border border-accent-gold/50 text-accent-gold shadow-[0_0_20px_rgba(212,165,116,0.15)]"
                : "bg-transparent border border-ink-medium/40 text-moon-mist hover:border-ink-light/60"
            }`}
          >
            {style.name}
          </button>
        ))}
      </div>

      {/* 卡片预览区 */}
      <div className="flex justify-center mb-8">
        <div ref={shareCardRef}>
          <AnimatePresence mode="wait">
            {cardStyle === "ink" && (
              <InkCard key="ink" result={result} data={data} />
            )}
            {cardStyle === "neon" && (
              <NeonCard key="neon" result={result} data={data} />
            )}
            {cardStyle === "cosmos" && (
              <CosmosCard key="cosmos" result={result} data={data} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 按钮组 */}
      <div className="space-y-3">
        {/* 保存图片按钮 */}
        <motion.button
          onClick={handleSaveImage}
          disabled={isSaving}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-gold/20 to-accent-gold/10 border border-accent-gold/40 text-accent-gold transition-all duration-300 hover:border-accent-gold/60 hover:from-accent-gold/25 hover:to-accent-gold/15 active:scale-[0.98] disabled:opacity-50 touch-manipulation min-h-[52px] flex items-center justify-center text-base font-medium"
        >
          {isSaving ? "保存中..." : "保存图片"}
        </motion.button>

        {/* 复制文案按钮 */}
        <motion.button
          onClick={handleCopyText}
          disabled={isCopying}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="w-full py-3.5 rounded-xl bg-ink-deep border border-ink-medium/50 text-moon-white transition-all duration-300 hover:border-ink-light/60 active:scale-[0.98] disabled:opacity-50 touch-manipulation min-h-[48px] flex items-center justify-center text-base"
        >
          {showCopied ? (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制到剪贴板
            </span>
          ) : (
            "复制文案"
          )}
        </motion.button>

        {/* 原生分享按钮（移动端） */}
        {typeof navigator !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function' && (
          <motion.button
            onClick={handleNativeShare}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full py-3.5 rounded-xl bg-accent-vermilion/10 border border-accent-vermilion/30 text-accent-vermilion transition-all duration-300 hover:bg-accent-vermilion/20 active:scale-[0.98] touch-manipulation min-h-[48px] flex items-center justify-center text-base"
          >
            分享到社交媒体
          </motion.button>
        )}

        {/* 完成按钮 */}
        <motion.button
          onClick={() => {
            triggerHaptic('light');
            onNext();
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-full py-3 text-moon-mist hover:text-moon-gray active:text-moon-white transition-colors text-base touch-manipulation min-h-[48px] flex items-center justify-center"
          whileTap={{ scale: 0.98 }}
        >
          完成
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================
// 墨染卡片 - 新中式美学
// ============================================
function InkCard({
  result,
  data,
}: {
  result: ResultData;
  data: (typeof fortuneData)["hidden_drain"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[280px] sm:w-[300px] relative overflow-hidden"
      style={{
        aspectRatio: "3/4",
        background: "linear-gradient(180deg, #faf8f5 0%, #f3efe8 50%, #ebe5db 100%)",
        borderRadius: "16px",
      }}
    >
      {/* 宣纸纹理 */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8b7355]/30 to-transparent" />

      {/* 内容区 */}
      <div className="relative h-full flex flex-col p-6 sm:p-7">
        {/* 顶部标识 */}
        <div className="flex justify-between items-start mb-auto">
          <span className="text-[10px] tracking-[0.3em] text-[#8b7355]/60 font-light">
            赛博问卜
          </span>
          <div className="w-8 h-8 rounded-full border border-[#c45c48]/30 flex items-center justify-center">
            <span className="text-[#c45c48]/70 text-xs font-serif">卜</span>
          </div>
        </div>

        {/* 主内容区 - 居中 */}
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          {/* 判词 - 大字突出 */}
          <div className="mb-6 text-center">
            <span
              className="text-2xl sm:text-[26px] font-serif tracking-[0.15em] text-[#2a2520] leading-relaxed"
              style={{ fontWeight: 500 }}
            >
              {result.judgement}
            </span>
          </div>

          {/* 装饰分隔 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#8b7355]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c45c48]/50" />
            <div className="w-8 h-px bg-[#8b7355]/30" />
          </div>

          {/* 场景描述 */}
          <p className="text-[13px] sm:text-sm leading-[2] text-center text-[#5a5248] font-light px-2 max-w-[240px]">
            {result.scene}
          </p>
        </div>

        {/* 底部印章 */}
        <div className="flex justify-end">
          <div
            className="px-3 py-1.5 border border-[#c45c48]/60 rounded"
            style={{ transform: "rotate(-6deg)" }}
          >
            <span className="text-[#c45c48] text-xs tracking-[0.2em] font-serif">
              此劫已阅
            </span>
          </div>
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8b7355]/20 to-transparent" />
    </motion.div>
  );
}

// ============================================
// 霓虹卡片 - 赛博朋克风格
// ============================================
function NeonCard({
  result,
  data,
}: {
  result: ResultData;
  data: (typeof fortuneData)["hidden_drain"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[280px] sm:w-[300px] relative overflow-hidden"
      style={{
        aspectRatio: "3/4",
        background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d12 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(212, 165, 116, 0.15)",
      }}
    >
      {/* 网格背景 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 165, 116, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 165, 116, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* 顶部光晕 */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(212, 165, 116, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* 左侧霓虹线 */}
      <div className="absolute left-4 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-accent-gold/40 to-transparent" />

      {/* 右侧霓虹线 */}
      <div className="absolute right-4 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#c45c48]/40 to-transparent" />

      {/* 内容区 */}
      <div className="relative h-full flex flex-col p-6 sm:p-7">
        {/* 顶部标签 */}
        <div className="flex justify-center mb-auto">
          <div className="px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5">
            <span className="text-[10px] tracking-[0.25em] text-accent-gold/80 uppercase">
              {data.name}
            </span>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          {/* 判词框 */}
          <div
            className="mb-6 px-5 py-3 rounded-lg border border-accent-gold/30 relative"
            style={{
              background: "linear-gradient(135deg, rgba(212, 165, 116, 0.08) 0%, rgba(212, 165, 116, 0.02) 100%)",
              boxShadow: "0 0 30px rgba(212, 165, 116, 0.1), inset 0 0 20px rgba(212, 165, 116, 0.05)",
            }}
          >
            {/* 角标装饰 */}
            <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-accent-gold/50" />
            <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-accent-gold/50" />
            <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-accent-gold/50" />
            <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-accent-gold/50" />

            <span className="text-xl sm:text-[22px] font-medium tracking-wider text-moon-white">
              {result.judgement}
            </span>
          </div>

          {/* 场景描述 */}
          <p className="text-[13px] leading-[1.9] text-center text-moon-gray/90 font-light px-3 max-w-[250px]">
            {result.scene}
          </p>
        </div>

        {/* 底部 */}
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-moon-mist/50 tracking-wider">
            #{result.tag}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-accent-gold/60" />
            <span className="text-[10px] tracking-[0.2em] text-accent-gold/60">
              赛博问卜
            </span>
          </div>
        </div>
      </div>

      {/* 底部光晕 */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 rounded-full opacity-15"
        style={{
          background: "radial-gradient(ellipse, rgba(196, 92, 72, 0.5) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ============================================
// 星尘卡片 - 梦幻宇宙风格
// ============================================
function CosmosCard({
  result,
  data,
}: {
  result: ResultData;
  data: (typeof fortuneData)["hidden_drain"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[280px] sm:w-[300px] relative overflow-hidden"
      style={{
        aspectRatio: "3/4",
        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* 星星点缀 */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* 主光晕 */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
        }}
      />

      {/* 次光晕 */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* 内容区 */}
      <div className="relative h-full flex flex-col p-6 sm:p-7">
        {/* 顶部 */}
        <div className="flex justify-between items-start mb-auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400/60" />
            <span className="text-[10px] tracking-wider text-white/40">
              {data.name}
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/30">
            赛博问卜
          </span>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          {/* 判词 */}
          <div className="mb-6 relative">
            {/* 发光背景 */}
            <div
              className="absolute inset-0 blur-xl opacity-40"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(236, 72, 153, 0.3) 100%)",
              }}
            />
            <h2 className="relative text-[22px] sm:text-2xl font-medium tracking-[0.1em] text-white text-center leading-relaxed">
              {result.judgement}
            </h2>
          </div>

          {/* 装饰线 */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 opacity-70" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
          </div>

          {/* 场景描述 */}
          <p className="text-[13px] leading-[1.95] text-center text-white/70 font-light px-2 max-w-[250px]">
            {result.scene}
          </p>
        </div>

        {/* 底部安抚语 */}
        <div className="text-center">
          <p className="text-[11px] text-white/40 leading-relaxed px-4 italic">
            「{result.comfort}」
          </p>
        </div>
      </div>
    </motion.div>
  );
}
