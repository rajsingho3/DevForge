"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal as TerminalIcon, X, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

interface TerminalProps {
  runCommand?: (command: string) => Promise<{ output: string; error?: string }>;
}

export default function Terminal({ runCommand }: TerminalProps) {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to DevForge Terminal" },
    { type: "output", content: "Type 'help' for available commands" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new lines are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const handleCommand = async (command: string) => {
    if (!command.trim() || isExecuting) return;

    // Add input to terminal
    setTerminalLines((prev) => [
      ...prev,
      { type: "input", content: `$ ${command}` },
    ]);

    // Process command
    const args = command.trim().split(" ");
    const cmd = args[0].toLowerCase();

    // Built-in commands
    if (cmd === "help") {
      setTerminalLines((prev) => [
        ...prev,
        { type: "output", content: "Available commands:" },
        { type: "output", content: "  help - Show this help message" },
        { type: "output", content: "  clear - Clear the terminal" },
        { type: "output", content: "  echo - Echo text" },
        { type: "output", content: "  npm - Run npm commands (WebContainer)" },
        { type: "output", content: "  node - Run node commands (WebContainer)" },
      ]);
      setCurrentInput("");
      return;
    }

    if (cmd === "clear") {
      setTerminalLines([]);
      setCurrentInput("");
      return;
    }

    if (cmd === "echo") {
      setTerminalLines((prev) => [
        ...prev,
        { type: "output", content: args.slice(1).join(" ") },
      ]);
      setCurrentInput("");
      return;
    }

    // WebContainer commands
    if (runCommand && (cmd === "npm" || cmd === "node" || cmd === "npx")) {
      setIsExecuting(true);
      try {
        const result = await runCommand(command);
        
        if (result.output) {
          setTerminalLines((prev) => [
            ...prev,
            { type: "output", content: result.output },
          ]);
        }
        
        if (result.error) {
          setTerminalLines((prev) => [
            ...prev,
            { type: "error", content: result.error || "Unknown error" },
          ]);
        }
      } catch (error) {
        setTerminalLines((prev) => [
          ...prev,
          { type: "error", content: error instanceof Error ? error.message : "Command execution failed" },
        ]);
      } finally {
        setIsExecuting(false);
      }
    } else if (!runCommand) {
      setTerminalLines((prev) => [
        ...prev,
        { type: "output", content: `Executing: ${command}` },
        { type: "output", content: "WebContainer is initializing..." },
      ]);
    } else {
      setTerminalLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${cmd}` },
        { type: "output", content: "Type 'help' for available commands" },
      ]);
    }

    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <Tabs defaultValue="terminal" className="h-full flex flex-col">
        <div className="h-10 border-b flex items-center justify-between px-2">
          <TabsList className="h-9">
            <TabsTrigger value="terminal" className="text-xs">
              <TerminalIcon className="h-3 w-3 mr-2" />
              Terminal
            </TabsTrigger>
            <TabsTrigger value="console" className="text-xs">
              Console
            </TabsTrigger>
            <TabsTrigger value="problems" className="text-xs">
              Problems
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Maximize2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <TabsContent value="terminal" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div
              ref={scrollRef}
              className="font-mono text-sm p-4 space-y-1"
              onClick={() => inputRef.current?.focus()}
            >
              {terminalLines.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.type === "input"
                      ? "text-green-500"
                      : line.type === "error"
                      ? "text-red-500"
                      : "text-foreground"
                  }
                >
                  {line.content}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <span className="text-green-500">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isExecuting}
                  className="flex-1 bg-transparent outline-none text-foreground disabled:opacity-50"
                  autoFocus
                />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="console" className="flex-1 m-0 p-4">
          <p className="text-sm text-muted-foreground">Console output will appear here...</p>
        </TabsContent>

        <TabsContent value="problems" className="flex-1 m-0 p-4">
          <p className="text-sm text-muted-foreground">No problems detected</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
