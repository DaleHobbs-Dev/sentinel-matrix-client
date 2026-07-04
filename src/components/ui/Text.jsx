// src/components/ui/Text.jsx
const variants = {
  body: "text-text",
  muted: "text-text-muted",
  description: "mt-1 text-text-muted",
  subtle: "text-sm text-text-subtle",
  error: "text-sm text-danger",
};

export function Text({
  as: Component = "p",
  variant = "body",
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}