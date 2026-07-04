import { H1 } from "./Heading.jsx";
import { Text } from "./Text.jsx";

export function PageHeader({
  title,
  description,
  actions,
  center = false,
  className = "",
}) {
  return (
    <header
      role="region"
      aria-labelledby="page-header-title"
      className={`mb-1 ${className}`}
    >
      <div
        className={center ? "text-center" : "flex items-center justify-between"}
      >
        <div className={center ? "mx-auto" : ""}>
          <H1 id="page-header-title">{title}</H1>
          {description && (
            <Text variant="description" className="mt-2">
              {description}
            </Text>
          )}
        </div>

        {!center && actions && <div className="flex gap-3">{actions}</div>}
      </div>
    </header>
  );
}
