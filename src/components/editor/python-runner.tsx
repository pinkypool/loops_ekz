"use client";

import { useState } from "react";
import Link from "next/link";
import { CodeEditor } from "@/components/editor/code-editor";
import { usePython } from "@/hooks/use-python";
import { Button } from "@/components/ui/button";
import { Play, Loader2, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PythonRunnerProps {
  initialCode?: string;
  testCases?: string[];
  expectedOutputs?: string[];
  solutionCode?: string;
  hints?: string[];
  onSuccess?: () => void;
  onSuccessWithAttempts?: (attempts: number) => void;
  nextLessonUrl?: string;
}

export function PythonRunner({ 
  initialCode = 'print("Hello, CS 101!")', 
  testCases = [],
  solutionCode = "",
  hints = [],
  onSuccess,
  onSuccessWithAttempts,
  nextLessonUrl
}: PythonRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const { runCode, isRunning, isReady } = usePython();
  const [output, setOutput] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRun = async () => {
    setOutput("");
    const result = await runCode(code, testCases);

    let outputText = result.stdout || "";
    
    if (result.stderr) {
      outputText += `\nError:\n${result.stderr}`;
    }
    
    if (result.error) {
       outputText += `\nSystem Error:\n${result.error}`;
    }

    let allTestsPassed = true;
    if (result.testResults && result.testResults.length > 0) {
      outputText += "\n\n--- Результаты тестов ---\n";
      result.testResults.forEach((test, i) => {
        if (test.passed) {
          outputText += `[✓] Тест ${i + 1} пройден\n`;
        } else {
          allTestsPassed = false;
          outputText += `[✗] Тест ${i + 1} провален: ${test.error}\n`;
        }
      });
    }

    setOutput(outputText);

    if (result.success && allTestsPassed) {
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      if (onSuccessWithAttempts) onSuccessWithAttempts(errorCount);
    } else {
      setIsSuccess(false);
      setErrorCount((prev) => prev + 1);
    }
  };

  const currentHint = errorCount >= 3 && hints.length > 0 ? hints[Math.min(hints.length - 1, Math.floor((errorCount - 3) / 2))] : null;
  const canShowSolution = errorCount >= 5 && solutionCode;

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 min-h-[400px]">
        <CodeEditor 
          value={code} 
          onChange={(val) => setCode(val || "")} 
          height="100%" 
        />
      </div>

      <div className="flex items-center justify-between">
        <Button 
          onClick={handleRun} 
          disabled={isRunning || !isReady}
          className="w-32"
        >
          {isRunning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
          Запустить
        </Button>
        <div className="flex gap-2 text-sm text-muted-foreground">
          {errorCount > 0 && <span>Ошибок: {errorCount}</span>}
          {canShowSolution && !showSolution && (
            <Button variant="outline" size="sm" onClick={() => setShowSolution(true)}>
              Показать решение
            </Button>
          )}
        </div>
      </div>

      {currentHint && !isSuccess && (
         <Card className="bg-yellow-500/10 border-yellow-500/50">
            <CardContent className="p-4 flex gap-3 text-sm">
              <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0" />
              <div>
                <strong>Подсказка:</strong> {currentHint}
              </div>
            </CardContent>
         </Card>
      )}

      {showSolution && (
         <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-sm">
              <div className="font-semibold mb-2">Возможное решение:</div>
              <pre className="bg-muted p-3 rounded-md overflow-x-auto text-xs">
                {solutionCode}
              </pre>
            </CardContent>
         </Card>
      )}

      {isSuccess && (
         <Card className="bg-green-500/10 border-green-500/50">
            <CardContent className="p-4 flex gap-3 text-sm text-green-700 dark:text-green-400 font-medium items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Отлично! Все тесты пройдены.
              </div>
              {nextLessonUrl ? (
                <Link href={nextLessonUrl}>
                  <Button size="sm">Продолжить</Button>
                </Link>
              ) : onSuccess ? (
                <Button size="sm" onClick={onSuccess}>Продолжить</Button>
              ) : null}
            </CardContent>
         </Card>
      )}

      <div className={cn(
        "border rounded-md bg-muted/50 p-4 min-h-[150px] font-mono text-sm max-h-[300px] overflow-y-auto whitespace-pre-wrap",
        isSuccess && output ? "text-green-600 dark:text-green-400" : "",
        !isSuccess && errorCount > 0 && output ? "text-red-600 dark:text-red-400" : ""
      )}>
        <div className="text-muted-foreground mb-2 text-xs uppercase tracking-wider">Вывод (Консоль)</div>
        {output || <span className="text-muted-foreground italic">Здесь появится результат выполнения...</span>}
      </div>
    </div>
  );
}
