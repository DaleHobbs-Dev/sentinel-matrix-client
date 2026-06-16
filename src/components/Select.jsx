export default function Select({ label, children, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>}
      <select
        className={`w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#005C72] focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
