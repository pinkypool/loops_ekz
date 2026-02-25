"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerProps {
  initialSeconds?: number; // 50 minutes = 3000 seconds
  onExpire?: () => void;
  onTick?: (elapsed: number) => void;
}

export function LessonTimer({ initialSeconds = 3000, onExpire, onTick }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (onTick) onTick(initialSeconds - newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire, onTick, initialSeconds]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  const isWarning = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-sm font-medium border",
      isWarning 
        ? "bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400 animate-pulse" 
        : "bg-muted text-muted-foreground"
    )}>
      <Clock className="w-4 h-4" />
      <span>{formattedTime}</span>
    </div>
  );
}
