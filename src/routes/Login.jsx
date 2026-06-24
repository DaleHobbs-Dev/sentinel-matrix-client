import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { API_BASE_URL, TOKEN_KEY } from "@/services"
import { Card, FormField, Input, Button, Alert } from "@/components/ui"
import { useUser } from "../contexts/UserContext"

export const Login = () => {
    const [email, setEmail] = useState("steve@brownlee.com")
    const [password, setPassword] = useState("brownlee")
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { setUser } = useUser()

    const handleLogin = (e) => {
        e.preventDefault()
        setError(null)
        fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ username: email, password }),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.token) {
                    localStorage.setItem(TOKEN_KEY, JSON.stringify(authInfo))
                    setUser(authInfo.user)
                    navigate("/")
                } else {
                    setError("No account found with those credentials.")
                }
            })
            .catch(() => setError("Something went wrong. Please try again."))
    }

    return (
        <Card
            subtitle="Please sign in"
            footer={
                <Link className="underline text-primary-800 hover:text-primary-700" to="/register">
                    Not a member yet?
                </Link>
            }
        >
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                {error && <Alert variant="error">{error}</Alert>}

                <FormField label="Email address" htmlFor="inputEmail">
                    <Input
                        type="email"
                        id="inputEmail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                </FormField>

                <FormField label="Password" htmlFor="inputPassword">
                    <Input
                        type="password"
                        id="inputPassword"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </FormField>

                <Button type="submit">Sign in</Button>
            </form>
        </Card>
    )
}
