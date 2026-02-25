"use client";

import { useState } from "react";
import { LessonTimer } from "@/components/lesson/timer";
import { QuizRunner, QuizQuestion } from "@/components/lesson/quiz-runner";
import { PythonRunner } from "@/components/editor/python-runner";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface LessonManagerProps {
  moduleId: string;
  lessonId: string;
  lessonData: {
    title: string;
    theory: string;
    task: {
      description: string;
      initialCode: string;
      testCases?: string[];
      solutionCode?: string;
      hints?: string[];
    };
    quiz?: QuizQuestion[];
  };
  nextLessonUrl: string;
}

export function LessonManager({ moduleId, lessonId, lessonData, nextLessonUrl }: LessonManagerProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  // errorCount is managed inside PythonRunner, but we intercept the onSuccess to save
  
  const saveProgress = async (
    updates: { theoryScore?: number; codeAttempts?: number; isCompleted?: boolean }
  ) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId,
          lessonId,
          timeSpentSeconds: timeSpent, // send current time spent
          ...updates
        })
      });
    } catch(err) {
      console.error("Failed to save progress", err);
    }
  };

  const handleTimerTick = (elapsed: number) => {
    setTimeSpent(elapsed);
  };

  const handleQuizComplete = (score: number) => {
    saveProgress({ theoryScore: score });
  };

  const handlePythonSuccess = (attempts: number) => {
    saveProgress({ codeAttempts: attempts, isCompleted: true });
  };

  const isQuizMode = !!(lessonData.quiz && lessonData.quiz.length > 0);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lessonData.title}</h1>
        {/* Pass a tick callback to the timer to track time spent */}
        <LessonTimer initialSeconds={3000} onTick={handleTimerTick} />
      </div>

      <div className={isQuizMode ? "" : "grid md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]"}>
        {isQuizMode ? (
          <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
            <Card className="p-6 prose prose-slate dark:prose-invert select-none">
              <ReactMarkdown>{lessonData.theory}</ReactMarkdown>
            </Card>
            
            <div className="h-[600px] mb-10">
              <QuizRunner questions={lessonData.quiz!} onComplete={handleQuizComplete} nextLessonUrl={nextLessonUrl} />
            </div>
          </div>
        ) : (
          <>
            {/* Left Side: Tasks */}
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 select-none">
                <div className="prose prose-slate dark:prose-invert mb-6">
                  <ReactMarkdown>{lessonData.theory}</ReactMarkdown>
                </div>
                <h3 className="font-bold text-lg mb-4">Задание</h3>
                <div className="prose prose-slate dark:prose-invert">
                  <ReactMarkdown>{lessonData.task.description}</ReactMarkdown>
                </div>
              </div>
            </Card>

            {/* Right Side: IDE */}
            <div className="h-full">
               <PythonRunner 
                 initialCode={lessonData.task.initialCode}
                 testCases={lessonData.task.testCases}
                 hints={lessonData.task.hints}
                 nextLessonUrl={nextLessonUrl}
                 onSuccessWithAttempts={handlePythonSuccess}
               />
            </div>
          </>
        )}
      </div>
    </>
  );
}
