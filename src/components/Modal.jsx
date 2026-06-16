import Button from "./Button"

export default function Modal({ title, children, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        {children}
      </div>
    </div>
  )
}
