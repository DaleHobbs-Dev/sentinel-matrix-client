export default function Container({ children, className = "" }) {
  return <main className={`mx-auto w-full max-w-7xl px-6 py-6 ${className}`}>{children}</main>
}
