import { Button, Card, Container, Input } from "../../components"

export default function RegisterPage() {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-950">Create Account</h1>
        <form className="mt-6 space-y-4">
          <Input label="First Name" />
          <Input label="Last Name" />
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Card>
    </Container>
  )
}
