import { Sidebar, Topbar } from "@/components/ui";

export const Layout = ({ children }) => {
  return (
    <div className="app-layout flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    </div>
  );
}