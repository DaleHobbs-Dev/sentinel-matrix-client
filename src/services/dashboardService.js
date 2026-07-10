import { fetchJSON } from "@/services"

export const getDashboard = () => fetchJSON("courses/dashboard")

export const getCourseDashboard = (courseId) => fetchJSON(`courses/${courseId}/dashboard`)
