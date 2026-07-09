import { formatCount } from "./dashboardFormatters"

export const getDashboardMetricCards = (dashboard = {}) => [
    {
        key: "total_course_count",
        title: "Active Courses",
        value: formatCount(dashboard.total_course_count),
        tone: "primary",
    },
    {
        key: "total_student_count",
        title: "Unique Students",
        value: formatCount(dashboard.total_student_count),
        tone: "default",
    },
    {
        key: "high_risk_student_count",
        title: "High Risk Students",
        value: formatCount(dashboard.high_risk_student_count),
        tone: "danger",
    },
    {
        key: "moderate_risk_student_count",
        title: "Moderate Risk Students",
        value: formatCount(dashboard.moderate_risk_student_count),
        tone: "warning",
    },
]
