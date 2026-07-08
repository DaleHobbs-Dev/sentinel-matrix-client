const formatPercent = (value) => {
    if (value === null || value === undefined) {
        return "N/A"
    }

    return `${Number(value).toFixed(1)}%`
}

export const getCourseMetricCards = (metrics = {}) => [
    {
        key: "average_grade",
        title: "Average Course Grade",
        value: formatPercent(metrics.average_grade),
        tone: "primary",
    },
    {
        key: "attendance_rate",
        title: "Attendance Rate",
        value: formatPercent(metrics.attendance_rate),
        tone: "success",
    },
    {
        key: "high_risk_student_count",
        title: "High Risk Students",
        value: metrics.high_risk_student_count ?? 0,
        tone: "danger",
    },
    {
        key: "moderate_risk_student_count",
        title: "Moderate Risk Students",
        value: metrics.moderate_risk_student_count ?? 0,
        tone: "warning",
    },
]
