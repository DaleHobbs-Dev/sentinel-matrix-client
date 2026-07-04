const gaps = {
  sm: "gap-2",
  compact: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

export function Stack({
  gap = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`flex flex-col ${gaps[gap]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
