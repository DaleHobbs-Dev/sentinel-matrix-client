export default function FormField({ label, children, helperText }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      {children}
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  )
}
