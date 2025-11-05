import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";
import ProjectTable from "@/modules/dashboard/components/projectTable";
import AddNew from "@/modules/dashboard/components/addNew";
import { getAllplayground } from "@/modules/dashboard/actions";
import type { Project, PlaygroundFromDB } from "@/modules/dashboard/types";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage() {
    const playgroundData = await getAllplayground();
    
    // Transform playground data for the sidebar
    const sidebarData = playgroundData.map((playground: PlaygroundFromDB) => ({
        id: playground.id,
        name: playground.title,
        icon: playground.template === "REACT" ? "Zap" : 
              playground.template === "NEXTJS" ? "Lightbulb" :
              playground.template === "EXPRESS" ? "Database" :
              playground.template === "VUE" ? "Compass" :
              playground.template === "HONO" ? "FlameIcon" :
              playground.template === "ANGULAR" ? "Terminal" : "Code2",
        starred: playground.Starmark?.[0]?.isMarked || false,
    }));
    
    // Transform playground data for the project table
    const projects: Project[] = playgroundData.map((playground: PlaygroundFromDB) => ({
        id: playground.id,
        title: playground.title,
        description: playground.description || "",
        template: playground.template,
        createdAt: playground.createdAt,
        updatedAt: playground.updatedAt,
        userId: playground.userId,
        user: {
            id: playground.user.id,
            name: playground.user.name || "",
            email: playground.user.email,
            image: playground.user.image,
        },
        Starmark: playground.Starmark || [],
    }));
    
    return (
        <>
            <DashboardSidebar initialPlaygroundData={sidebarData} />
            <main className="flex-1 p-6 lg:p-8 bg-background overflow-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Projects</h1>
                            <p className="text-muted-foreground mt-2">
                                Manage and organize your development playgrounds
                            </p>
                        </div>
                        <AddNew />
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                                    <p className="text-2xl font-bold mt-1">{projects.length}</p>
                                </div>
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Starred</p>
                                    <p className="text-2xl font-bold mt-1">{projects.filter(p => p.Starmark[0]?.isMarked).length}</p>
                                </div>
                                <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-950 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Templates Used</p>
                                    <p className="text-2xl font-bold mt-1">{new Set(projects.map(p => p.template)).size}</p>
                                </div>
                                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 010 2H6v10h4a1 1 0 010 2H5a1 1 0 01-1-1V5zM20 5a1 1 0 00-1-1h-4a1 1 0 000 2h2v10h-2a1 1 0 000 2h4a1 1 0 001-1V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                                    <p className="text-2xl font-bold mt-1">{projects.length > 0 ? 'Active' : 'None'}</p>
                                </div>
                                <div className="h-12 w-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add New Card or Project Table */}
                    {projects.length === 0 ? (
                        <div className="space-y-6">
                            <div className="bg-linear-to-br from-[#E93F3F]/10 via-background to-background border-2 border-dashed rounded-xl p-12 text-center">
                                <div className="max-w-md mx-auto">
                                    <div className="h-20 w-20 bg-[#E93F3F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="h-10 w-10 text-[#E93F3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Start building something amazing! Create your first playground to get started.
                                    </p>
                                    <AddNew />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">All Projects</h2>
                                <p className="text-sm text-muted-foreground">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
                            </div>
                            <Suspense fallback={<ProjectTableSkeleton />}>
                                <ProjectTable projects={projects} />
                            </Suspense>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

function ProjectTableSkeleton() {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="p-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
