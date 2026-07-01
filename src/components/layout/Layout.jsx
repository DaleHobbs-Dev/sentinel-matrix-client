import { Sidebar, Topbar } from "@/components";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="app-layout flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    </div>
  );
}