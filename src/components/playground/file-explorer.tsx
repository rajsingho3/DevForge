"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Plus,
  FileText,
  FolderPlus,
  MoreHorizontal,
  Trash2,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

interface FileExplorerProps {
  playgroundId: string;
  onFileSelect: (path: string, content: string) => void;
  selectedFile: string | null;
}

// Sample initial file structure
const initialFiles: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "index.js",
        type: "file",
        content: "console.log('Hello World!');",
      },
      {
        id: "3",
        name: "App.js",
        type: "file",
        content: "function App() {\n  return <div>Hello React!</div>;\n}",
      },
    ],
  },
  {
    id: "4",
    name: "package.json",
    type: "file",
    content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}',
  },
  {
    id: "5",
    name: "README.md",
    type: "file",
    content: "# My Project\n\nWelcome to my project!",
  },
];

export default function FileExplorer({
  onFileSelect,
  selectedFile,
}: FileExplorerProps) {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["1"]));
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemParent, setNewItemParent] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleFileClick = (file: FileNode, path: string) => {
    if (file.type === "file") {
      onFileSelect(path, file.content || "");
    }
  };

  const handleCreateFile = (parentId?: string) => {
    setIsCreatingFile(true);
    setNewItemParent(parentId || null);
    setNewItemName("");
  };

  const handleCreateFolder = (parentId?: string) => {
    setIsCreatingFolder(true);
    setNewItemParent(parentId || null);
    setNewItemName("");
  };

  const confirmCreate = () => {
    if (!newItemName.trim()) return;

    const newNode: FileNode = {
      id: Date.now().toString(),
      name: newItemName,
      type: isCreatingFile ? "file" : "folder",
      children: isCreatingFolder ? [] : undefined,
      content: isCreatingFile ? "" : undefined,
    };

    if (newItemParent) {
      // Add to specific folder
      const addToFolder = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === newItemParent) {
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }
          if (node.children) {
            return {
              ...node,
              children: addToFolder(node.children),
            };
          }
          return node;
        });
      };
      setFiles(addToFolder(files));
    } else {
      // Add to root
      setFiles([...files, newNode]);
    }

    setIsCreatingFile(false);
    setIsCreatingFolder(false);
    setNewItemName("");
    setNewItemParent(null);
  };

  const handleDelete = (nodeId: string) => {
    const deleteNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter((node) => {
        if (node.id === nodeId) return false;
        if (node.children) {
          node.children = deleteNode(node.children);
        }
        return true;
      });
    };
    setFiles(deleteNode(files));
  };

  const renderTree = (nodes: FileNode[], depth = 0, parentPath = ""): React.ReactElement[] => {
    return nodes.map((node) => {
      const path = parentPath ? `${parentPath}/${node.name}` : node.name;
      const isFolder = node.type === "folder";
      const isExpanded = expandedFolders.has(node.id);
      const isSelected = selectedFile === path;

      return (
        <div key={node.id}>
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1.5 hover:bg-accent cursor-pointer rounded-sm group",
              isSelected && "bg-accent"
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {isFolder && (
              <button
                onClick={() => toggleFolder(node.id)}
                className="p-0.5 hover:bg-accent-foreground/10 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
            
            <div
              className="flex-1 flex items-center gap-2 min-w-0"
              onClick={() => {
                if (isFolder) {
                  toggleFolder(node.id);
                } else {
                  handleFileClick(node, path);
                }
              }}
            >
              {isFolder ? (
                isExpanded ? (
                  <FolderOpen className="h-4 w-4 text-yellow-500 shrink-0" />
                ) : (
                  <Folder className="h-4 w-4 text-yellow-500 shrink-0" />
                )
              ) : (
                <File className="h-4 w-4 text-blue-500 shrink-0" />
              )}
              <span className="text-sm truncate">{node.name}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isFolder && (
                  <>
                    <DropdownMenuItem onClick={() => handleCreateFile(node.id)}>
                      <FileText className="h-4 w-4 mr-2" />
                      New File
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCreateFolder(node.id)}>
                      <FolderPlus className="h-4 w-4 mr-2" />
                      New Folder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(node.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isFolder && isExpanded && node.children && (
            <div>{renderTree(node.children, depth + 1, path)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col bg-background border-r">
      <div className="p-2 border-b flex items-center justify-between">
        <h2 className="text-sm font-semibold">Files</h2>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleCreateFile()}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleCreateFolder()}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {renderTree(files)}
        
        {(isCreatingFile || isCreatingFolder) && (
          <div className="flex items-center gap-2 px-2 py-1.5">
            {isCreatingFolder ? (
              <Folder className="h-4 w-4 text-yellow-500" />
            ) : (
              <File className="h-4 w-4 text-blue-500" />
            )}
            <Input
              autoFocus
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmCreate();
                if (e.key === "Escape") {
                  setIsCreatingFile(false);
                  setIsCreatingFolder(false);
                }
              }}
              onBlur={confirmCreate}
              className="h-6 text-sm"
              placeholder={isCreatingFolder ? "Folder name" : "File name"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
