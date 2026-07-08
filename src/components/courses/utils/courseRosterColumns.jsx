import { StudentRiskBadge } from "@/components/students/components/StudentRiskBadge"
import { getStudentFullName } from "@/components/students/utils/studentFormatters"

const formatPercent = (value) => {
    if (value === null || value === undefined) {
        return "N/A"
    }

    return `${Number(value).toFixed(1)}%`
}

export const courseRosterColumns = [
    {
        key: "name",
        header: "Student",
        render: (student) => (
            <div>
                <div className="font-medium">{getStudentFullName(student)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    {student.student_id}
                </div>
            </div>
        ),
    },
    {
        key: "grade_average",
        header: "Grade Average",
        render: (student) => formatPercent(student.grade_average),
    },
    {
        key: "attendance_rate",
        header: "Attendance Rate",
        render: (student) => formatPercent(student.attendance_rate),
    },
    {
        key: "missing_assignment_count",
        header: "Missing Assignments",
        render: (student) => student.missing_assignment_count ?? 0,
    },
    {
        key: "risk_band",
        header: "Risk Status",
        render: (student) => <StudentRiskBadge riskBand={student.risk_band} />,
    },
]
