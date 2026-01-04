"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function EntryPage({ onStart }: { onStart: () => void }) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ripples, setRipples] = useState<number[]>([]);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setIsHolding(true);
    setProgress(0);

    // 添加涟漪
    const rippleId = Date.now();
    setRipples((prev) => [...prev, rippleId]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((id) => id !== rippleId));
    }, 2000);

    // 进度动画
    let currentProgress = 0;
    progressTimer.current = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressTimer.current!);
      }
    }, 40);

    // 2秒后触发
    holdTimer.current = setTimeout(() => {
      onStart();
    }, 2000);
  };

  const handlePressEnd = () => {
    setIsHolding(false);
    setProgress(0);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] text-center px-4 py-6 sm:py-8"
    >
      {/* 竖排标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 sm:mb-12"
      >
        <h1 className="font-serif text-2xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-moon-white">
          测测你的精神状态
        </h1>
      </motion.div>

      {/* 极简符文 - 呼吸的圆 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-10 sm:mb-12"
      >
        {/* 外环 - 缓慢呼吸 */}
        <motion.div
          className="absolute inset-0 rounded-full border border-accent-gold/30"
          animate={{
            scale: isHolding ? [1, 1.1, 1] : 1,
            opacity: isHolding ? 1 : 0.4,
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        />

        {/* 中环 */}
        <motion.div
          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-ink-medium/50"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 核心点 */}
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-gold/60"
          animate={{
            scale: isHolding ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: isHolding ? 1 : [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 涟漪效果 */}
        {ripples.map((id) => (
          <motion.div
            key={id}
            className="absolute w-4 h-4 rounded-full border border-accent-gold/40"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        ))}

        {/* 进度环 */}
        {isHolding && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke="rgba(212, 165, 116, 0.3)"
              strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 477} 477`}
              className="transition-all duration-100"
            />
          </svg>
        )}
      </motion.div>

      {/* 引导语 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
          className="text-moon-mist text-sm mb-10 sm:mb-12 max-w-xs leading-relaxed px-2"
      >
        不是算命，是帮你骂得更精准
      </motion.p>

      {/* 长按按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full max-w-xs"
      >
        <motion.button
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          className="relative w-full py-4 rounded-full bg-ink-deep border border-ink-medium/50 text-moon-gray select-none overflow-hidden transition-all duration-300 touch-manipulation min-h-[52px] flex items-center justify-center active:bg-ink-medium/20"
          whileHover={{ borderColor: "rgba(212, 165, 116, 0.3)" }}
          style={{
            boxShadow: isHolding
              ? "0 0 30px rgba(212, 165, 116, 0.1)"
              : "none",
          }}
        >
          {/* 进度背景 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-accent-gold/5"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />

          <span
            className={`relative z-10 text-sm tracking-widest transition-colors duration-300 ${
              isHolding ? "text-accent-gold" : "text-moon-gray"
            }`}
          >
            {isHolding ? "连接中..." : "长按以启动"}
          </span>
        </motion.button>
      </motion.div>

    </motion.div>
  );
}
