
"use client";

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createPlayground } from "@/modules/dashboard/actions";
import { Plus, Zap, Lightbulb, Database, Compass, FlameIcon, Terminal } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const templates = [
  {
    id: "REACT",
    name: "React",
    description: "Build interactive UIs with React",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: "NEXTJS",
    name: "Next.js",
    description: "Full-stack React framework",
    icon: Lightbulb,
    color: "text-black dark:text-white",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
  },
  {
    id: "EXPRESS",
    name: "Express",
    description: "Fast Node.js web framework",
    icon: Database,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    id: "VUE",
    name: "Vue",
    description: "Progressive JavaScript framework",
    icon: Compass,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    id: "HONO",
    name: "Hono",
    description: "Ultrafast web framework",
    icon: FlameIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    id: "ANGULAR",
    name: "Angular",
    description: "Platform for building web apps",
    icon: Terminal,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
]

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreatePlayground = async () => {
    if (!selectedTemplate || !title.trim()) {
      toast.error("Please select a template and enter a title");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createPlayground({
        title: title.trim(),
        description: description.trim(),
        template: selectedTemplate,
      });

      if (result.success && result.data) {
        toast.success("Playground created successfully!");
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        setSelectedTemplate(null);
        router.push(`/playground/${result.data.id}`);
      } else {
        toast.error(result.error || "Failed to create playground");
      }
    } catch (error) {
      console.error("Error creating playground:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#E93F3F] hover:bg-[#E93F3F]/90 shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create New Playground
      </Button>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Playground</DialogTitle>
            <DialogDescription>
              Choose a template and give your playground a name
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Template Selection */}
            <div className="space-y-3">
              <Label>Select Template</Label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedTemplate === template.id 
                          ? 'border-[#E93F3F] bg-[#E93F3F]/5' 
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded ${template.bgColor}`}>
                          <Icon className={`h-5 w-5 ${template.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{template.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Project"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePlayground}
              disabled={isLoading || !selectedTemplate || !title.trim()}
              className="bg-[#E93F3F] hover:bg-[#E93F3F]/90"
            >
              {isLoading ? "Creating..." : "Create Playground"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNewButton
