import Navbar from "./Navbar"
import Footer from "./Footer"
import Container from "./Container"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f1f4fa]">
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}
