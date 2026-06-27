import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "@/contexts/userContext"
import { LoadingPage } from "@/components/ui"

export const Authorized = () => {
  const token = localStorage.getItem("sentinel_token")
  const { user, loading } = useUser()

  if (!token) {
    return <Navigate to="/login" replace />
  }



    if (loading) return <LoadingPage />
    if (!user) return <Navigate to="/login" replace />

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    )
}