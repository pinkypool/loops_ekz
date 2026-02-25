"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface ExecutionResult {
  success: boolean;
  stdout?: string;
  stderr?: string;
  error?: string;
  testResults?: { passed: boolean; index: number; error?: string }[];
}

export function usePython() {
  const workerRef = useRef<Worker | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // We'll store resolvers for promises here, mapped by message ID
  const resolversRef = useRef<{ [key: string]: (val: ExecutionResult) => void }>({});

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL("/pyodide-worker.js", window.location.origin));
    
    // When worker loads pyodide it doesn't send message by default, but we can assume it's ready quickly
    // For robust production app, we'd add an INIT message.
    setTimeout(() => {
      setIsReady(true);
    }, 2000);

    workerRef.current.onmessage = (event) => {
      const { id, ...result } = event.data;
      if (id && resolversRef.current[id]) {
        resolversRef.current[id](result as ExecutionResult);
        delete resolversRef.current[id];
        setIsRunning(false);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const runCode = useCallback(async (code: string, testCases?: string[]): Promise<ExecutionResult> => {
    if (!workerRef.current) return { success: false, error: "Worker not initialized" };
    
    setIsRunning(true);
    
    return new Promise((resolve) => {
      const id = window.crypto.randomUUID();
      resolversRef.current[id] = resolve;
      
      workerRef.current?.postMessage({
        id,
        code,
        testCases
      });
    });
  }, []);

  return { runCode, isRunning, isReady };
}
