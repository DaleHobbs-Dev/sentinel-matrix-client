import { Grid, MetricCard } from "@/components"
import { getDashboardMetricCards } from "../utils/dashboardMetrics"

export const DashboardMetricsGrid = ({ dashboard }) => {
    const metricCards = getDashboardMetricCards(dashboard)

    return (
        <Grid cols={4}>
            {metricCards.map((metric) => (
                <MetricCard
                    key={metric.key}
                    title={metric.title}
                    value={metric.value}
                    tone={metric.tone}
                />
            ))}
        </Grid>
    )
}
