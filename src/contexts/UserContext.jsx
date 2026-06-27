import { useEffect, useState } from "react"
import { TOKEN_KEY, getUserProfile } from "@/services"
import { UserContext } from "./userContext.js"

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(
        () => Boolean(localStorage.getItem(TOKEN_KEY))
    )

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (!token) {
            return
        }
        getUserProfile()
            .then(setUser)
            .catch(() => localStorage.removeItem(TOKEN_KEY))
            .finally(() => setLoading(false))
    }, [])

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    )
}
