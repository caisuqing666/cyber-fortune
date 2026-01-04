"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  questions,
  fortuneData,
  getResultType,
  randomPick,
  type ResultType,
  type PageState,
  type ResultData,
} from "@/data/fortune";

import { EntryPage } from "@/components/EntryPage";
import { QuestionPage } from "@/components/QuestionPage";
import { LoadingPage } from "@/components/LoadingPage";
import { ResultPage } from "@/components/ResultPage";
import { SharePage } from "@/components/SharePage";
import { ExitPage } from "@/components/ExitPage";

export default function CyberFortune() {
  const [page, setPage] = useState<PageState>("entry");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [result, setResult] = useState<ResultData | null>(null);

  // 处理答案选择
  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 所有问题回答完毕，进入加载页
      setPage("loading");
      generateResult(newScores);
    }
  };

  // 生成结果
  const generateResult = (finalScores: number[]) => {
    const totalScore = finalScores.reduce((a, b) => a + b, 0);
    const resultType = getResultType(totalScore);
    const data = fortuneData[resultType];

    setResult({
      type: resultType,
      judgement: randomPick(data.judgements),
      scene: randomPick(data.scenes),
      comfort: randomPick(data.comforts),
      tag: randomPick(data.tags),
    });
  };

  // 重新开始
  const restart = () => {
    setPage("entry");
    setCurrentQuestion(0);
    setScores([]);
    setResult(null);
  };

  // 处理后退
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setScores(scores.slice(0, scores.length - 1)); // 移除最后一个分数
    } else {
      setPage("entry"); // 如果在第一个问题，则回到入口页
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {page === "entry" && (
          <EntryPage key="entry" onStart={() => setPage("question")} />
        )}
        {page === "question" && (
          <QuestionPage
            key={`question-${currentQuestion}`}
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}
        {page === "loading" && (
          <LoadingPage key="loading" onComplete={() => setPage("result")} />
        )}
        {page === "result" && result && (
          <ResultPage
            key="result"
            result={result}
            onNext={() => setPage("share")}
          />
        )}
        {page === "share" && result && (
          <SharePage
            key="share"
            result={result}
            onNext={() => setPage("exit")}
          />
        )}
        {page === "exit" && <ExitPage key="exit" onRestart={restart} />}
      </AnimatePresence>
    </div>
  );
}