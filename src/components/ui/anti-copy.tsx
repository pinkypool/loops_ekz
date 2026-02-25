"use client";

import React from "react";

export function AntiCopy({ children, message, className }: { children: React.ReactNode, message: string, className?: string }) {
  return (
    <div 
      className={className}
      onCopy={(e) => {
        e.preventDefault();
        alert(message);
      }}
    >
      {children}
    </div>
  );
}
