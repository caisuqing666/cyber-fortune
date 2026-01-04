"use client";

import { motion } from "framer-motion";

export function ExitPage({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] px-4 py-8 text-center"
    >
      {/* 完成标记 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-ink-medium/50 flex items-center justify-center mb-6 sm:mb-8"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-moon-gray"
          >
            <motion.path
              d="M5 12l5 5L20 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* 结束语 - 逐行显示 */}
      <div className="mb-10 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="font-serif text-lg sm:text-xl text-moon-white mb-3"
        >
          好了。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-moon-mist text-sm"
        >
          该知道的你都知道了，该回去打工了。
        </motion.p>
      </div>

      {/* 分割线 */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 40, opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.2 }}
        className="h-px bg-gradient-to-r from-transparent via-ink-medium/50 to-transparent mb-10 sm:mb-12"
      />

      {/* 重新开始按钮 */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.8 }}
        onClick={onRestart}
        className="px-8 py-3.5 rounded-full border border-ink-medium/40 text-moon-mist hover:text-moon-white active:text-moon-white active:border-ink-light/60 transition-all duration-300 text-base touch-manipulation min-h-[52px] flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        重新问卜
      </motion.button>
    </motion.div>
  );
}
