import { Button, Card, Container } from "../components"

export default function HomePage() {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      <Card className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#005C72]">
          Student Risk Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">
          Sentinel Matrix
        </h1>
        <p className="mt-4 text-gray-600">
          An instructor-focused analytics platform for identifying at-risk students
          using grades, attendance, missing assignments, and prior academic standing.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/login">Login</Button>
          <Button href="/register" variant="outline">Register</Button>
        </div>
      </Card>
    </Container>
  )
}
