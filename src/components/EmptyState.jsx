import Button from "./Button"

export default function EmptyState({ title, message, actionLabel, actionHref }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
      {actionLabel && actionHref && (
        <div className="mt-4">
          <Button href={actionHref}>{actionLabel}</Button>
        </div>
      )}
    </div>
  )
}
