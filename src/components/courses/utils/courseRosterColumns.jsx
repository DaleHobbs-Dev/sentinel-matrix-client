import { Button } from "@/components/ui/Button"
import { StudentRiskBadge } from "@/components/students/components/StudentRiskBadge"
import { getStudentFullName } from "@/components/students/utils/studentFormatters"

const formatPercent = (value) => {
    if (value === null || value === undefined) {
        return "N/A"
    }

    return `${Number(value).toFixed(1)}%`
}

const formatNumber = (value) => {
    if (value === null || value === undefined) {
        return "N/A"
    }

    return Number(value).toFixed(1)
}

const getRosterStudent = (enrollment) => enrollment.student ?? enrollment

const getRosterValue = (enrollment, key) => {
    const student = getRosterStudent(enrollment)

    return enrollment[key] ?? student[key]
}

export const getCourseRosterColumns = ({ onRemove } = {}) => [
    {
        key: "name",
        header: "Student",
        render: (enrollment) => {
            const student = getRosterStudent(enrollment)

            return (
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="font-medium">{getStudentFullName(student)}</div>
                        {student.student_id && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {student.student_id}
                            </div>
                        )}
                    </div>
                    {onRemove && enrollment.id && (
                        <Button
                            type="button"
                            variant="danger"
                            className="px-2 py-1 text-xs"
                            onClick={(event) => {
                                event.stopPropagation()
                                onRemove(enrollment)
                            }}
                        >
                            Remove
                        </Button>
                    )}
                </div>
            )
        },
    },
    {
        key: "grade_average",
        header: "Grade Average",
        render: (enrollment) => formatPercent(getRosterValue(enrollment, "grade_average")),
    },
    {
        key: "attendance_rate",
        header: "Attendance Rate",
        render: (enrollment) => formatPercent(getRosterValue(enrollment, "attendance_rate")),
    },
    {
        key: "missing_assignment_count",
        header: "Missing Assignments",
        render: (enrollment) => getRosterValue(enrollment, "missing_assignment_count") ?? "N/A",
    },
    {
        key: "risk_score",
        header: "Risk Score",
        render: (enrollment) => formatNumber(getRosterValue(enrollment, "risk_score")),
    },
    {
        key: "risk_band",
        header: "Risk Status",
        render: (enrollment) => (
            <StudentRiskBadge riskBand={getRosterValue(enrollment, "risk_band")} />
        ),
    },
]

export const courseRosterColumns = getCourseRosterColumns()
