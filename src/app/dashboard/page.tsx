import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";
import ProjectTable from "@/modules/dashboard/components/projectTable";
import AddNew from "@/modules/dashboard/components/addNew";
import { getAllplayground } from "@/modules/dashboard/actions";
import type { Project, PlaygroundFromDB } from "@/modules/dashboard/types";

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
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Projects</h1>
                            <p className="text-muted-foreground mt-2">
                                Manage your development playgrounds
                            </p>
                        </div>
                        <AddNew />
                    </div>
                    
                    {projects.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">
                                No projects yet. Create your first playground!
                            </p>
                            <AddNew />
                        </div>
                    ) : (
                        <ProjectTable projects={projects} />
                    )}
                </div>
            </main>
        </>
    );
}
