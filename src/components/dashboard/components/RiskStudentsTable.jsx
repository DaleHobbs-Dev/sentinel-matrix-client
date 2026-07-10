import {
    StudentRiskBadge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Text,formatRiskScore,
    riskStudentHasCourseDetailsRoute
} from "@/components"

const getRiskStudentKey = (riskStudent, index) =>
    riskStudent.enrollment_id ??
    riskStudent.enrollment?.id ??
    riskStudent.id ??
    `${riskStudent.full_name}-${riskStudent.course}-${index}`

export const RiskStudentsTable = ({ riskStudents = [], onRiskStudentClick }) => {
    if (riskStudents.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                <Text variant="muted">
                    No high or moderate risk students right now.
                </Text>
            </div>
        )
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Risk Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {riskStudents.map((riskStudent, index) => {
                        const canOpenDetails =
                            onRiskStudentClick &&
                            riskStudentHasCourseDetailsRoute(riskStudent)

                        return (
                            <TableRow
                                key={getRiskStudentKey(riskStudent, index)}
                                onClick={
                                    canOpenDetails
                                        ? () => onRiskStudentClick(riskStudent)
                                        : undefined
                                }
                                className={
                                    canOpenDetails
                                        ? "cursor-pointer focus-within:bg-gray-50 dark:focus-within:bg-gray-800"
                                        : ""
                                }
                                tabIndex={canOpenDetails ? 0 : undefined}
                                onKeyDown={
                                    canOpenDetails
                                        ? (event) => {
                                            if (
                                                event.key === "Enter" ||
                                                event.key === " "
                                            ) {
                                                event.preventDefault()
                                                onRiskStudentClick(riskStudent)
                                            }
                                        }
                                        : undefined
                                }
                            >
                                <TableCell className="font-medium">
                                    {riskStudent.full_name}
                                </TableCell>
                                <TableCell>{riskStudent.course}</TableCell>
                                <TableCell>
                                    {formatRiskScore(riskStudent.risk_score)}
                                </TableCell>
                                <TableCell>
                                    <StudentRiskBadge
                                        riskBand={riskStudent.risk_band}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
