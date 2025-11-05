"use client";

import Editor from "@monaco-editor/react";
import { FileText } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  fileName: string | null;
}

export default function CodeEditor({
  value,
  onChange,
  language,
  fileName,
}: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  if (!fileName) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="h-10 border-b flex items-center px-4 bg-muted/30">
        <span className="text-sm font-medium">{fileName}</span>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language={language}
          value={value}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}
