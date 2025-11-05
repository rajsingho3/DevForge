"use client";

import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useWebContainer } from "@/hooks/use-webcontainer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FileExplorer from "./file-explorer";
import CodeEditor from "./code-editor";
import Terminal from "./terminal";
import PlaygroundHeader from "./playground-header";

interface PlaygroundClientProps {
  playground: {
    id: string;
    title: string;
    description: string;
    template: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function PlaygroundClient({ playground }: PlaygroundClientProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const { webcontainer, isBooting, error, runCommand } = useWebContainer();

  const handleFileSelect = (filePath: string, content: string) => {
    setSelectedFile(filePath);
    setFileContent(content);
  };

  const handleContentChange = (value: string) => {
    setFileContent(value);
    // TODO: Auto-save or debounced save logic
  };

  const handleRunCode = async () => {
    if (!webcontainer) {
      toast.error("WebContainer is not ready yet");
      return;
    }

    toast.success("Running code...");
    // Implement run logic based on template
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-6 border rounded-lg bg-card">
          <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-destructive">Failed to Initialize WebContainer</h3>
          <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">{error}</p>
          <div className="text-xs text-left bg-muted p-3 rounded mb-4">
            <p className="font-semibold mb-2">To fix this issue:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Stop your development server (Ctrl+C)</li>
              <li>Restart it with <code className="bg-background px-1 rounded">npm run dev</code></li>
              <li>The required headers are now configured</li>
            </ol>
          </div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <PlaygroundHeader playground={playground} onRun={handleRunCode} isBooting={isBooting} />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Editor and Terminal */}
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            {/* Code Editor */}
            <ResizablePanel defaultSize={60} minSize={30}>
              <CodeEditor
                value={fileContent}
                onChange={handleContentChange}
                language={selectedFile ? getLanguageFromPath(selectedFile) : "javascript"}
                fileName={selectedFile}
              />
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Terminal */}
            <ResizablePanel defaultSize={40} minSize={20}>
              <Terminal runCommand={runCommand} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function getLanguageFromPath(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'json': 'json',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'py': 'python',
    'vue': 'vue',
    'md': 'markdown',
  };
  
  return languageMap[ext || ''] || 'javascript';
}
