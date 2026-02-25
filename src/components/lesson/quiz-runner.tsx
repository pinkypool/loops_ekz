"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizRunnerProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  nextLessonUrl?: string;
}

export function QuizRunner({ questions, onComplete, nextLessonUrl }: QuizRunnerProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="p-6 text-muted-foreground">Тесты отсутствуют.</div>;
  }

  const currentQ = questions[currentQuestionIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setFinished(true);
      if (onComplete) onComplete(score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const passed = score >= questions.length * 0.7; // 70% threshold
    return (
      <Card className="w-full h-full flex flex-col justify-center items-center text-center p-8 bg-muted/30">
        <div className="mb-6">
          {passed ? (
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
          ) : (
            <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto" />
          )}
        </div>
        <CardTitle className="text-3xl font-bold mb-4">Теория пройдена!</CardTitle>
        <CardDescription className="text-xl mb-8">
          Ваш результат: <span className="font-bold text-foreground">{score}</span> из {questions.length}
        </CardDescription>
        
        {nextLessonUrl ? (
          <div className="flex gap-4">
            <Button onClick={handleRestart} variant="outline" size="lg" className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Попробовать снова
            </Button>
            <Link href={nextLessonUrl}>
              <Button size="lg">Продолжить</Button>
            </Link>
          </div>
        ) : (
          <Button onClick={handleRestart} variant="outline" size="lg" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Попробовать снова
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full bg-card">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Вопрос {currentQuestionIdx + 1} из {questions.length}</span>
          <span className="text-sm font-medium text-muted-foreground">Баллы: {score}</span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {currentQ.options.map((option, idx) => {
             const isSelected = selectedAnswer === idx;
             const isCorrect = idx === currentQ.correctAnswer;
             const isWrong = isSelected && !isCorrect;
             
             let stateClass = "border-border hover:bg-muted";
             if (isAnswered) {
               if (isCorrect) stateClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
               else if (isWrong) stateClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
               else stateClass = "opacity-50 pointer-events-none border-border";
             } else if (isSelected) {
               stateClass = "border-primary bg-primary/5";
             }

             return (
               <button
                 key={idx}
                 onClick={() => handleSelect(idx)}
                 disabled={isAnswered}
                 className={cn(
                   "text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3",
                   stateClass
                 )}
               >
                 <div className={cn(
                   "w-6 h-6 rounded-full border-2 flex shrink-0 items-center justify-center mt-0.5",
                   isSelected ? "border-primary" : "border-muted-foreground/30",
                   isAnswered && isCorrect ? "border-green-500" : "",
                   isAnswered && isWrong ? "border-red-500" : ""
                 )}>
                   {isSelected && !isAnswered && <div className="w-3 h-3 bg-primary rounded-full" />}
                   {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                   {isAnswered && isWrong && <div className="w-3 h-3 bg-red-500 rounded-full" />}
                 </div>
                 <span className="leading-snug">{option}</span>
               </button>
             );
          })}
        </div>
      </CardContent>
      
      <CardFooter className="pt-6 border-t mt-auto">
        {!isAnswered ? (
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleSubmit} 
            disabled={selectedAnswer === null}
          >
            Ответить
          </Button>
        ) : (
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleNext}
          >
            {currentQuestionIdx < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
