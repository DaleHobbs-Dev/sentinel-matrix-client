import Badge from "./Badge"

export default function RiskBadge({ band }) {
  const normalized = band?.toLowerCase()

  if (normalized === "high") return <Badge variant="danger">High Risk</Badge>
  if (normalized === "moderate") return <Badge variant="warning">Moderate Risk</Badge>
  if (normalized === "low") return <Badge variant="success">Low Risk</Badge>

  return <Badge>Unknown</Badge>
}
