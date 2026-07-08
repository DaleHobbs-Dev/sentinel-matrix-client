import { Badge } from "@/components/ui/Badge";

const riskBadgeVariants = {
  "Low Risk": "success",
  "Moderate Risk": "warning",
  "Medium Risk": "warning",
  "High Risk": "danger",
};

export const StudentRiskBadge = ({ riskBand }) => {
  const label = riskBand || "Unknown";
  const variant = riskBadgeVariants[label] || "default";

  return (
    <Badge variant={variant} size="md">
      {label}
    </Badge>
  );
};
