import { MetricCard } from "@/components/ui/MetricCard"
import { Grid } from "@/components/ui/Grid"
import { getCourseMetricCards } from "../utils/courseMetrics"

export const CourseMetricsGrid = ({ metrics }) => {
    const metricCards = getCourseMetricCards(metrics)

    return (
        <Grid cols={4}>
            {metricCards.map((metric) => (
                <MetricCard
                    key={metric.key}
                    title={metric.title}
                    value={metric.value}
                    tone={metric.tone}
                >
                    {metric.children}
                </MetricCard>
            ))}
        </Grid>
    )
}
