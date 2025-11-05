
"use client"

import Image from "next/image"
import { format } from "date-fns"
import type { Project } from "../types"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Edit3, Trash2, ExternalLink, Copy, Download, Eye } from "lucide-react"
import { toast } from "sonner"
import MarkedToggleButton from "./MarkedToggleButton"
import { updatePlayground, deletePlayground, duplicatePlayground } from "../actions"


interface ProjectTableProps {
  projects: Project[]
}

interface EditProjectData {
  title: string
  description: string
}

export default function ProjectTable({
  projects,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editData, setEditData] = useState<EditProjectData>({ title: "", description: "" })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const handleEditClick = (project: Project) => {
    setSelectedProject(project)
    setEditData({
      title: project.title,
      description: project.description || "",
    })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = async (project: Project) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const handleUpdateProject = async () => {
    if (!selectedProject || !editData.title.trim()) {
      toast.error("Please enter a valid title")
      return
    }

    setIsLoading(true)
    try {
      const result = await updatePlayground(selectedProject.id, {
        title: editData.title.trim(),
        description: editData.description.trim(),
      })

      if (result.success) {
        toast.success("Project updated successfully")
        setEditDialogOpen(false)
        setSelectedProject(null)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to update project")
      }
    } catch (error) {
      console.error("Error updating project:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!selectedProject) return

    setIsLoading(true)
    try {
      const result = await deletePlayground(selectedProject.id)

      if (result.success) {
        toast.success("Project deleted successfully")
        setDeleteDialogOpen(false)
        setSelectedProject(null)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to delete project")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDuplicateProject = async (project: Project) => {
    try {
      const result = await duplicatePlayground(project.id)

      if (result.success) {
        toast.success("Project duplicated successfully")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to duplicate project")
      }
    } catch (error) {
      console.error("Error duplicating project:", error)
      toast.error("An unexpected error occurred")
    }
  }

  const copyProjectUrl = (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`
    navigator.clipboard.writeText(url)
    toast.success("Project URL copied to clipboard")
  }

  return (
    <>
      <div className="border rounded-xl overflow-hidden shadow-sm bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/50">
              <TableHead className="font-semibold">Project</TableHead>
              <TableHead className="font-semibold">Template</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="font-semibold">User</TableHead>
              <TableHead className="w-[50px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-1">
                    <Link 
                      href={`/playground/${project.id}`} 
                      className="hover:text-[#E93F3F] transition-colors font-semibold text-base"
                    >
                      {project.title}
                    </Link>
                    {project.description && (
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className="bg-[#E93F3F]/10 text-[#E93F3F] border-[#E93F3F]/20 font-medium"
                  >
                    {project.template}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(project.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-border">
                      <Image
                        src={project.user.image || "/placeholder.svg"}
                        alt={project.user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{project.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <MarkedToggleButton markedForRevision={project.Starmark[0]?.isMarked} id={project.id} />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/playground/${project.id}`} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Open Project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/playground/${project.id}`} target="_blank" className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditClick(project)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateProject(project)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyProjectUrl(project.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(project)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateProject} disabled={isLoading || !editData.title.trim()}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedProject?.title}&quot;? This action cannot be undone. All files and
              data associated with this project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


