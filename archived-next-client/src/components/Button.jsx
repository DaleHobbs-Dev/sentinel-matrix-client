import Link from "next/link"

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition cursor-pointer focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-[#005C72] text-white hover:bg-[#00485a]",
    accent: "bg-teal-500 text-white hover:bg-teal-600",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-[#005C72] text-[#005C72] hover:bg-[#e1f3f7]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-[#005C72] hover:bg-[#e1f3f7]",
    nav: "bg-transparent text-white hover:bg-white/10",
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
