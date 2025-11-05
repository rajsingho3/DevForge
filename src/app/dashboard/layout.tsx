import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
    children: React.ReactNode;
    }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-x-hidden">
                {children}
            </div>
        </SidebarProvider>
    );
}