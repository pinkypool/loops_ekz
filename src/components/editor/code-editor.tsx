"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, height = "400px", readOnly = false }: CodeEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ height }} className="bg-muted animate-pulse rounded-md" />;
  }

  return (
    <div 
      className="border rounded-md overflow-hidden relative"
      style={{ height, minHeight: "400px" }}
      onPaste={(e) => {
        // Anti-cheat: prevent pasting into the editor
        e.preventDefault();
        alert("Вставка кода запрещена! Пожалуйста, пишите код самостоятельно. (Anti-Cheat)");
      }}
    >
      <Editor
        height={height}
        defaultLanguage="python"
        theme={theme === "dark" ? "vs-dark" : "light"}
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          readOnly,
          // Anti-cheat: prevent context menu (right click)
          contextmenu: false,
        }}
        loading={<div className="p-4 text-sm text-muted-foreground">Загрузка редактора...</div>}
      />
    </div>
  );
}
