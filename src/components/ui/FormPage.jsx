// src/components/ui/FormPage.jsx
import { PageHeader } from "./PageHeader";

export function FormPage({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <main className={`mx-auto max-w-2xl ${className}`}>
      <div className="mb-4">
        <PageHeader title={title} description={description} />
      </div>

      {children}
    </main>
  );
}