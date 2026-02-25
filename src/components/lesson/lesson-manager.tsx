"use client";

import { useState } from "react";
import { LessonTimer } from "@/components/lesson/timer";
import { QuizRunner, QuizQuestion } from "@/components/lesson/quiz-runner";
import { PythonRunner } from "@/components/editor/python-runner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lessonData.title}</h1>
        {/* Pass a tick callback to the timer to track time spent */}
        <LessonTimer initialSeconds={3000} onTick={handleTimerTick} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {/* Left Side: Theory & Tasks */}
        <Card className="h-full flex flex-col overflow-hidden">
          <Tabs defaultValue="theory" className="h-full flex flex-col">
            <div className="px-4 pt-4">
               <TabsList className="w-full grid grid-cols-3">
                 <TabsTrigger value="theory">Теория</TabsTrigger>
                 <TabsTrigger value="task">Задание</TabsTrigger>
                 <TabsTrigger value="quiz">Тест</TabsTrigger>
               </TabsList>
            </div>
            
            <TabsContent value="theory" className="flex-1 overflow-y-auto p-6 prose prose-slate dark:prose-invert max-w-none select-none">
               <h2>{lessonData.title}</h2>
               <ReactMarkdown>{lessonData.theory}</ReactMarkdown>
            </TabsContent>
            
            <TabsContent value="task" className="flex-1 overflow-y-auto p-6 select-none">
               <h3 className="font-bold text-lg mb-4">Практическое задание</h3>
               <div className="prose prose-slate dark:prose-invert">
                 <ReactMarkdown>{lessonData.task.description}</ReactMarkdown>
               </div>
            </TabsContent>

            <TabsContent value="quiz" className="flex-1 overflow-y-auto overflow-hidden">
               {lessonData.quiz && lessonData.quiz.length > 0 ? (
                 <QuizRunner questions={lessonData.quiz} onComplete={handleQuizComplete} />
               ) : (
                 <div className="p-6 text-muted-foreground">Тесты для этого урока еще не добавлены.</div>
               )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Right Side: IDE */}
        <div className="h-full">
           <PythonRunner 
             initialCode={lessonData.task.initialCode}
             testCases={lessonData.task.testCases}
             solutionCode={lessonData.task.solutionCode}
             hints={lessonData.task.hints}
             nextLessonUrl={nextLessonUrl}
             onSuccessWithAttempts={handlePythonSuccess}
           />
        </div>
      </div>
    </>
  );
}
