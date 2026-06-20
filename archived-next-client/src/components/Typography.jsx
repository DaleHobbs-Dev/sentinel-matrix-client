export function PageTitle({ children, className = "" }) {
  return <h1 className={`text-3xl font-bold text-gray-950 ${className}`}>{children}</h1>
}

export function SectionTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h2>
}

export function MutedText({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}
