import Link from "next/link"
import Button from "./Button"

export default function Navbar() {
  return (
    <header className="bg-[#005C72] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="text-xl font-bold">
          Sentinel Matrix
        </Link>

        <div className="flex items-center gap-3">
          <Button href="/dashboard" variant="nav">Dashboard</Button>
          <Button href="/courses" variant="nav">Courses</Button>
          <Button href="/students" variant="nav">Students</Button>
          <Button href="/analytics" variant="nav">Analytics</Button>
        </div>
      </nav>
    </header>
  )
}
