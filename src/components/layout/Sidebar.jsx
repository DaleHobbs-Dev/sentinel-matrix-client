import { SidebarLink } from "@/components/ui"

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-slate-200">
            <img src="../../assets/logo.png" alt="Sentinel Matrix"/>
            <h1 className="text-xl font-bold mt-2">Sentinel Matrix</h1>
        </div>

      <nav className="sidebar-nav p-3 space-y-2">
        <SidebarLink to={"/dashboard"}>Dashboard</SidebarLink>
        <SidebarLink to={"/"}>Courses</SidebarLink>
        <SidebarLink to={"/"}>Students</SidebarLink>
        <SidebarLink to={"/"}>Analytics</SidebarLink>
      </nav>
    </aside>
    );
}