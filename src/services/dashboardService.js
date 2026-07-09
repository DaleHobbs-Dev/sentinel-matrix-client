import { fetchJSON } from "@/services"

export const getDashboard = () => fetchJSON("courses/dashboard")
