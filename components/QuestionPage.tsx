"use client";

import { motion } from "framer-motion";
import { Question } from "@/data/fortune";

export function QuestionPage({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onBack,
}: {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (score: number) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-4 py-5 sm:px-6 sm:py-8"
    >
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between mb-4">
        {/* 返回按钮 */}
        <motion.button
          onClick={onBack}
          className="text-moon-mist hover:text-moon-gray transition-colors text-base py-3 -ml-2 pl-2 pr-2 min-w-[80px] touch-manipulation active:text-moon-white"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          ← 返回
        </motion.button>

        {/* 页码 */}
        <span className="text-moon-mist text-base font-light">
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* 极细进度线 */}
      <div className="h-px bg-ink-medium/30 rounded-full overflow-hidden mb-6 sm:mb-12">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-gold/60 to-accent-gold/20"
          initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* 问题区域 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 sm:mb-12"
      >
        <h2 className="font-serif text-lg sm:text-xl text-moon-white leading-relaxed">
          {question.question}
        </h2>
      </motion.div>

      {/* 选项列表 */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option.score)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="group relative w-full text-left touch-manipulation"
          >
            <div className="relative p-4 sm:p-5 rounded-xl border border-ink-medium/40 bg-transparent transition-all duration-300 group-hover:border-ink-light/60 group-hover:bg-ink-deep/30 active:border-ink-light/60 active:bg-ink-deep/30 active:scale-[0.98] min-h-[68px] sm:min-h-[64px] flex items-center">
              {/* 左侧金线指示器（悬停时显示） */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-accent-gold/60 rounded-full transition-all duration-300 group-hover:h-8 sm:group-hover:h-8"
              />

              <span className="text-moon-white/90 leading-relaxed pl-2 text-base sm:text-base">
                {option.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 底部装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 sm:mt-16 text-center"
      >
        <p className="text-moon-mist/50 text-xs">
          选最真实的那一个，别骗自己
        </p>
      </motion.div>
    </motion.div>
  );
}
