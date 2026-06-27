import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY, postJSON } from "@/services";
import {
  AuthCard,
  FormField,
  Input,
  Button,
  Alert,
} from "@/components/ui";
import { useUser } from "../contexts/userContext";

export const Login = () => {
  const [email, setEmail] = useState("first.last@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    postJSON("login", { email: email, password })
      .then((authInfo) => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(authInfo));

        setUser(authInfo.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const message =
          err.body?.non_field_errors?.[0] ??
          "Something went wrong. Please try again.";

        setError(message);
      });
  };

  return (
    <AuthCard
      subtitle="Please sign in"
      footer={
        <Link
          className="underline text-primary-800 hover:text-primary-700"
          to="/register"
        >
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </FormField>

        <Button type="submit">Sign in</Button>
      </form>
    </AuthCard>
  );
};
