import Button from "./Button"

export default function PageHeader({ title, description, actionLabel, actionHref }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-950">{title}</h1>
        {description && <p className="mt-1 text-gray-600">{description}</p>}
      </div>

      {actionLabel && actionHref && (
        <Button href={actionHref}>{actionLabel}</Button>
      )}
    </div>
  )
}
