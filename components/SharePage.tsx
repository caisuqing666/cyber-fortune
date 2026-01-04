"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResultData, fortuneData } from "@/data/fortune";
import * as htmlToImage from "html-to-image";

type CardStyle = "minimal" | "ink" | "seal";

export function SharePage({
  result,
  onNext,
}: {
  result: ResultData;
  onNext: () => void;
}) {
  const [cardStyle, setCardStyle] = useState<CardStyle>("minimal");
  const [isSaving, setIsSaving] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const data = fortuneData[result.type];

  const cardStyles: { key: CardStyle; name: string }[] = [
    { key: "minimal", name: "素雅" },
    { key: "ink", name: "水墨" },
    { key: "seal", name: "印章" },
  ];

  const handleSaveImage = async () => {
    if (!shareCardRef.current || isSaving) return;

    setIsSaving(true);
    try {
      const dataUrl = await htmlToImage.toPng(shareCardRef.current, {
        pixelRatio: 2,
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
        保存这张判词，方便随时自嘲
      </motion.p>

      {/* 卡片样式切换 */}
      <div className="flex justify-center gap-2 mb-6">
        {cardStyles.map((style) => (
          <button
            key={style.key}
            onClick={() => setCardStyle(style.key)}
            className={`px-5 py-2.5 text-sm rounded-full transition-all duration-300 touch-manipulation min-h-[44px] flex items-center justify-center active:scale-95 ${
              cardStyle === style.key
                ? "bg-ink-deep border border-accent-gold/40 text-accent-gold"
                : "bg-transparent border border-ink-medium/40 text-moon-mist active:border-ink-light/60"
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
            {cardStyle === "minimal" && (
              <MinimalCard key="minimal" result={result} data={data} />
            )}
            {cardStyle === "ink" && (
              <InkCard key="ink" result={result} data={data} />
            )}
            {cardStyle === "seal" && (
              <SealCard key="seal" result={result} data={data} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 按钮组 */}
      <div className="space-y-3">
        <motion.button
          onClick={handleSaveImage}
          disabled={isSaving}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full py-4 rounded-xl bg-ink-deep border border-accent-gold/30 text-moon-white transition-all duration-300 hover:border-accent-gold/50 active:bg-ink-medium/20 disabled:opacity-50 touch-manipulation min-h-[52px] flex items-center justify-center text-base"
          whileHover={{ boxShadow: "0 0 30px rgba(212, 165, 116, 0.08)" }}
          whileTap={{ scale: 0.98 }}
        >
          {isSaving ? "保存中..." : "保存这张判词"}
        </motion.button>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full py-3 text-moon-mist hover:text-moon-gray active:text-moon-white transition-colors text-base touch-manipulation min-h-[48px] flex items-center justify-center"
          whileTap={{ scale: 0.98 }}
        >
          下一步
        </motion.button>
      </div>
    </motion.div>
  );
}

// 素雅卡片 - 深色极简，纯粹文字
function MinimalCard({
  result,
  data,
}: {
  result: ResultData;
  data: (typeof fortuneData)["hidden_drain"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-[300px] sm:w-72 bg-[#0a0d14] rounded-2xl p-6 sm:p-8 border border-white/[0.03]"
      style={{ aspectRatio: "3/4" }}
    >
      <div className="h-full flex flex-col justify-between">
        {/* 顶部留白 + 细线 */}
        <div className="pt-2">
          <div className="w-8 h-px bg-white/10 mx-auto" />
        </div>

        {/* 主文 - 居中大面积 */}
        <div className="flex-1 flex items-center justify-center py-6">
          <p className="text-[15px] sm:text-[15px] leading-[1.85] sm:leading-[2] text-center text-white/80 font-light tracking-wide">
            {result.scene}
          </p>
        </div>

        {/* 底部信息 */}
        <div className="space-y-4">
          <div className="w-12 h-px bg-white/10 mx-auto" />
          <div className="text-center">
            <p className="text-[10px] text-white/30 tracking-[0.2em]">
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 水墨卡片 - 深色背景
function InkCard({
  result,
  data,
}: {
  result: ResultData;
  data: (typeof fortuneData)["hidden_drain"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-[300px] sm:w-72 bg-gradient-to-b from-[#0d1117] to-[#161b22] rounded-2xl p-5 sm:p-6 border border-white/5"
      style={{ aspectRatio: "3/4" }}
    >
      <div className="h-full flex flex-col justify-between">
        {/* 顶部判词 */}
        <div className="text-center">
          <span className="font-serif text-sm sm:text-lg text-[#d4a574] tracking-wider">
            「{result.judgement}」
          </span>
        </div>

        {/* 主文 */}
        <div className="flex-1 flex items-center justify-center py-4">
          <p className="text-[13px] sm:text-sm leading-relaxed sm:leading-loose text-center text-gray-300 font-light px-2">
            {result.scene}
          </p>
        </div>

        {/* 分割线 */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

        {/* 安抚语 */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500 leading-relaxed px-2">
            {result.comfort}
          </p>
        </div>

        {/* 底部 */}
        <div className="text-center">
          <p className="text-[10px] text-gray-600 tracking-widest">赛博问卜</p>
        </div>
      </div>
    </motion.div>
  );
}

// 印章卡片 - 突出盖章
function SealCard({
  result,
  data,
}: {
  result: ResultData;
  data: (typeof fortuneData)["hidden_drain"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-[300px] sm:w-72 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] rounded-2xl p-5 sm:p-6 border border-white/5 relative overflow-hidden"
      style={{ aspectRatio: "3/4" }}
    >
      {/* 背景模糊文字 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 blur-sm p-8">
        <p className="text-lg text-white text-center leading-relaxed">
          {result.scene}
        </p>
      </div>

      {/* 内容 */}
      <div className="h-full flex flex-col items-center justify-center relative z-10">
        {/* 标签 */}
        <span className="text-xs text-gray-500 mb-6 tracking-wider">
          {data.name}
        </span>

        {/* 中央盖章 */}
        <div
          className="border-2 border-[#c45c48]/70 rounded-lg px-8 py-4 mb-6"
          style={{ transform: "rotate(-8deg)" }}
        >
          <span className="text-xl sm:text-2xl font-serif font-semibold text-[#c45c48]/90 tracking-widest">
            此劫已阅
          </span>
        </div>

        {/* 标签 */}
        <span className="text-xs text-gray-600 tracking-wider">
          #{result.tag}
        </span>

        {/* 底部 */}
        <p className="absolute bottom-6 text-[10px] text-gray-600 tracking-widest">
          赛博问卜
        </p>
      </div>
    </motion.div>
  );
}
