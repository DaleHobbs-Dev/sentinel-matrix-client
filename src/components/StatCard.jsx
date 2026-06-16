import Card from "./Card"

export default function StatCard({ label, value, helperText }) {
  return (
    <Card>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-[#005C72]">{value}</p>
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </Card>
  )
}
