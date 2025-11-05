"use client";

import { useEffect, useState, useRef } from "react";
import { WebContainer } from "@webcontainer/api";

export function useWebContainer() {
  const [webcontainerInstance, setWebcontainerInstance] = useState<WebContainer | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bootAttempted = useRef(false);

  useEffect(() => {
    if (bootAttempted.current) return;
    bootAttempted.current = true;

    async function bootWebContainer() {
      try {
        // Check if SharedArrayBuffer is available
        if (typeof SharedArrayBuffer === 'undefined') {
          throw new Error(
            'SharedArrayBuffer is not available. Please restart the development server after updating next.config.ts'
          );
        }

        setIsBooting(true);
        const instance = await WebContainer.boot();
        setWebcontainerInstance(instance);
        setIsBooting(false);
      } catch (err) {
        console.error("Failed to boot WebContainer:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to boot WebContainer";
        setError(
          `${errorMessage}\n\nNote: WebContainer requires specific headers. Make sure your dev server is restarted.`
        );
        setIsBooting(false);
      }
    }

    bootWebContainer();
  }, []);

  const runCommand = async (command: string): Promise<{ output: string; error?: string }> => {
    if (!webcontainerInstance) {
      return { output: "", error: "WebContainer not initialized" };
    }

    try {
      const args = command.trim().split(" ");
      const cmd = args[0];
      const cmdArgs = args.slice(1);

      const process = await webcontainerInstance.spawn(cmd, cmdArgs);
      
      let output = "";

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            output += data;
          },
        })
      );

      const exitCode = await process.exit;

      if (exitCode !== 0) {
        return { output, error: `Command exited with code ${exitCode}` };
      }

      return { output };
    } catch (err) {
      return {
        output: "",
        error: err instanceof Error ? err.message : "Command execution failed",
      };
    }
  };

  const writeFile = async (path: string, content: string) => {
    if (!webcontainerInstance) {
      throw new Error("WebContainer not initialized");
    }
    await webcontainerInstance.fs.writeFile(path, content);
  };

  const readFile = async (path: string): Promise<string> => {
    if (!webcontainerInstance) {
      throw new Error("WebContainer not initialized");
    }
    const content = await webcontainerInstance.fs.readFile(path, "utf-8");
    return content;
  };

  const createDirectory = async (path: string) => {
    if (!webcontainerInstance) {
      throw new Error("WebContainer not initialized");
    }
    await webcontainerInstance.fs.mkdir(path, { recursive: true });
  };

  return {
    webcontainer: webcontainerInstance,
    isBooting,
    error,
    runCommand,
    writeFile,
    readFile,
    createDirectory,
  };
}
