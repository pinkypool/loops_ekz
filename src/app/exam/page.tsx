"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PythonRunner } from "@/components/editor/python-runner";
import { Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ExamPage() {
  const [timeLeft, setTimeLeft] = useState(60 * 45); // 45 minutes
  const [examFinished, setExamFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExamFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const examTask = {
    title: "Финальная задача: Анализ матрицы",
    description: `
Дан вложенный список (матрица) \`matrix\`.
Напишите функцию \`sum_evens(matrix)\`, которая найдет сумму всех **четных чисел**, 
используя вложенные циклы \`for\` и любые необходимые методы.

Матрица может быть любого размера.
    `,
    initialCode: "def sum_evens(matrix):\n    # ваш код\n    pass\n\n# Пример вызова:\n# print(sum_evens([[1, 2], [3, 4]]))\n",
    testCases: [
      `
matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
assert sum_evens(matrix1) == 20, "Для матрицы 1..9 сумма чётных должна быть 20 (2+4+6+8)"
      `,
      `
matrix2 = [[1, 3], [5, 7]]
assert sum_evens(matrix2) == 0, "Если нет чётных чисел - 0"
      `,
      `
matrix3 = [[2, -4], [6, 0]]
assert sum_evens(matrix3) == 4, "Проверка с отрицательными и нулем"
      `
    ]
  };

  const handleSuccess = () => {
    setExamFinished(true);
    // Fire confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Финальный Экзамен</h1>
          <p className="text-muted-foreground mt-1">CS 101 - Программирование на высокоуровневых языках</p>
        </div>
        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-md font-mono text-xl">
          <Clock className="w-5 h-5" />
          <span className={timeLeft < 300 ? "text-red-500 font-bold" : ""}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {!examFinished ? (
        <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          <Card className="h-full flex flex-col p-6 overflow-y-auto select-none" onCopy={(e) => { e.preventDefault(); alert("Копирование на экзамене запрещено!"); }}>
            <CardTitle className="text-xl mb-4">{examTask.title}</CardTitle>
            <div className="prose prose-slate dark:prose-invert">
              <ReactMarkdown>{examTask.description}</ReactMarkdown>
            </div>
            <div className="mt-8 text-sm text-yellow-600 dark:text-yellow-500 bg-yellow-500/10 p-4 rounded-md">
              Внимание: На экзамене подсказки отключены. Для сдачи необходимо написать проходящий код.
            </div>
          </Card>
          <div className="h-full">
            <PythonRunner 
              initialCode={examTask.initialCode}
              testCases={examTask.testCases}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      ) : (
        <Card className="max-w-md mx-auto mt-20 text-center py-12">
          <CardHeader>
            <CardTitle className="text-3xl">Экзамен завершён!</CardTitle>
            <CardDescription className="text-lg mt-2">
              {timeLeft > 0 ? "Поздравляем! Вы решили задачу досрочно и прошли курс." : "Время вышло!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => window.location.href = '/'}>
              Вернуться на главную
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
