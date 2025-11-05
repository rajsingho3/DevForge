"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Download, Settings, Loader2 } from "lucide-react";
import Link from "next/link";

interface PlaygroundHeaderProps {
  playground: {
    id: string;
    title: string;
    template: string;
  };
  onRun?: () => void;
  isBooting?: boolean;
}

export default function PlaygroundHeader({ playground, onRun, isBooting }: PlaygroundHeaderProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">{playground.title}</h1>
          <p className="text-xs text-muted-foreground">{playground.template}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        
        <Button 
          size="sm" 
          className="bg-[#E93F3F] hover:bg-[#E93F3F]/90"
          onClick={onRun}
          disabled={isBooting}
        >
          {isBooting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Initializing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
