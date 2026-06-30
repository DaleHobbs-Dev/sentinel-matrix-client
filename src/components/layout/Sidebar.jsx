import { SidebarLink, Button, Spinner } from "@/components/ui"
import { useUser } from "@/contexts/userContext"
import { useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"

export const Sidebar = () => {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
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
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
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
        <SidebarLink to={"/courses"}>Courses</SidebarLink>
        <SidebarLink to={"/students"}>Students</SidebarLink>
        <SidebarLink to={"/analytics"}>Analytics</SidebarLink>
      </nav>

      <div className="mt-auto border-t border-slate-200 p-3">
        <Button
          onClick={() => {
            logout()
            navigate("/login", { replace: true })
          }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-lighter hover:text-primary-dark"
        >
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
