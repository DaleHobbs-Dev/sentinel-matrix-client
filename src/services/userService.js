import { fetchJSON } from "@/services"

export const getUserProfile = () => fetchJSON("me")