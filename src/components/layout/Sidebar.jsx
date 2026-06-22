import { SidebarLink } from "@/components/ui"
import logo from "@/assets/logo.png"

export const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <img
          src={logo}
          alt="Sentinel Matrix"
          className="h-12 w-auto"
        />
        <h1 className="mt-2 text-xl font-bold text-primary-dark">
          Sentinel Matrix
        </h1>
      </div>

      <nav className="flex flex-col gap-2 p-3">
        <SidebarLink to={"/dashboard"}>Dashboard</SidebarLink>
        <SidebarLink to={"/"}>Courses</SidebarLink>
        <SidebarLink to={"/"}>Students</SidebarLink>
        <SidebarLink to={"/"}>Analytics</SidebarLink>
      </nav>
    </aside>
  );
}
