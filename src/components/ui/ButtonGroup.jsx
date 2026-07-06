// src/components/ui/ButtonGroup.jsx
const alignments = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function ButtonGroup({
  children,
  align = "start",
  wrap = true,
  className = "",
  ...props
}) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        wrap ? "flex-wrap" : "",
        alignments[align],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}