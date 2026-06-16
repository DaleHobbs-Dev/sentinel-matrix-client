import { Button, Card, Container, Input } from "@/components"

export default function LoginPage() {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-950">Login</h1>
        <form className="mt-6 space-y-4">
          <Input label="Email" type="email" placeholder="instructor@example.com" />
          <Input label="Password" type="password" placeholder="Password" />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Card>
    </Container>
  )
}
