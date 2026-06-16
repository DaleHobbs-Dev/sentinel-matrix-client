import "./globals.css"

export const metadata = {
  title: "Sentinel Matrix",
  description: "Student risk dashboard for instructors",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
