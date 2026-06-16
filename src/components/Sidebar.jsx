import Link from "next/link"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/students", label: "Students" },
  { href: "/analytics", label: "Analytics" },
]

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-gray-200 bg-white p-4">
      <h2 className="mb-6 text-lg font-bold text-[#005C72]">Sentinel Matrix</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-[#e1f3f7] hover:text-[#005C72]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
