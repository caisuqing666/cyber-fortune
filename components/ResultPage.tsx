"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ResultData, fortuneData } from "@/data/fortune";

export function ResultPage({
  result,
  onNext,
}: {
  result: ResultData;
  onNext: () => void;
}) {
  const [showStamp, setShowStamp] = useState(false);
  const data = fortuneData[result.type];

  useEffect(() => {
    // 延迟显示盖章
    const timer = setTimeout(() => {
      setShowStamp(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto px-4 py-5 sm:px-6 sm:py-8"
    >
      {/* 状态标签 - 模糊到清晰 */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center mb-5 sm:mb-10"
      >
        <span className="inline-block px-4 py-2 rounded-full bg-ink-deep/80 border border-ink-medium/50 text-moon-gray text-sm sm:text-base tracking-wider">
          {data.name}
        </span>
      </motion.div>

      {/* 判词标题 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mb-5 sm:mb-8"
      >
        <h2 className="font-serif text-base sm:text-lg text-accent-gold/90 tracking-wider px-2">
          「{result.judgement}」
        </h2>
      </motion.div>

      {/* 分割线 */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-ink-medium/40 to-transparent mb-6 sm:mb-8"
      />

      {/* 核心判词 - 逐句淡入 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mb-5 sm:mb-8"
      >
        <p className="text-moon-white leading-loose text-center font-light text-[16px] sm:text-[17px] px-2">
          {result.scene}
        </p>
      </motion.div>

      {/* 分割线 */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="h-px bg-gradient-to-r from-transparent via-ink-medium/40 to-transparent mb-6 sm:mb-8"
      />

      {/* 安抚语 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mb-6 sm:mb-10"
      >
        <p className="text-moon-gray text-[15px] sm:text-base leading-relaxed text-center px-2">
          {result.comfort}
        </p>
      </motion.div>

      {/* 盖章 - 落印动画 */}
      <motion.div
        initial={{ opacity: 0, scale: 1.3, rotate: -15, y: -20 }}
        animate={
          showStamp
            ? { opacity: 1, scale: 1, rotate: -8, y: 0 }
            : { opacity: 0, scale: 1.3, rotate: -15, y: -20 }
        }
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="text-center mb-6 sm:mb-12"
      >
        <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 border-2 border-accent-vermilion/60 rounded-lg text-accent-vermilion font-serif text-sm sm:text-lg tracking-widest">
          此劫已阅
        </span>
      </motion.div>

      {/* 继续按钮 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <motion.button
          onClick={onNext}
          className="w-full py-4 rounded-xl bg-ink-deep border border-ink-medium/50 text-moon-white transition-all duration-300 hover:border-accent-gold/30 active:bg-ink-medium/20 touch-manipulation min-h-[52px] flex items-center justify-center text-base"
          whileHover={{ boxShadow: "0 0 30px rgba(212, 165, 116, 0.08)" }}
          whileTap={{ scale: 0.98 }}
        >
          继续
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
