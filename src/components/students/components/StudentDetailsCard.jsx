import { Text, formatAcademicStanding, getStudentFullName } from "@/components"

const getInitials = (student = {}) =>
    [student.first_name, student.last_name]
        .filter(Boolean)
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()

const DetailItem = ({ label, value }) => (
    <div>
        <Text variant="subtle">{label}</Text>
        <Text className="font-medium">{value || "N/A"}</Text>
    </div>
)

export const StudentDetailsCard = ({ student }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-3xl font-semibold text-text-muted">
                {getInitials(student) || "ST"}
            </div>
            <div>
                <Text as="h1" className="text-2xl font-semibold">
                    {getStudentFullName(student)}
                </Text>
                {student.student_id && (
                    <Text variant="muted">Student ID: {student.student_id}</Text>
                )}
                {student.email && <Text variant="muted">{student.email}</Text>}
            </div>
        </div>
                <div className="mt-6">
                    <Text as="h2" variant="primary">Overall Academic Details</Text>
                </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem
                label="Prior Standing"
                value={formatAcademicStanding(
                    student?.prior_academic_standing ??
                    student.prior_academic_standing,
                )}
            />
            <DetailItem label="Enrollment Date" value={student.enrollment_date?.split("T")[0]} />
            {student?.grade_average !== undefined && (
                <DetailItem
                    label="Grade Average"
                    value={`${Number(student.grade_average).toFixed(1)}%`}
                />
            )}
            {student?.attendance_rate !== undefined && (
                <DetailItem
                    label="Attendance Rate"
                    value={`${Number(student.attendance_rate).toFixed(1)}%`}
                />
            )}
            {student?.missing_assignment_rate !== undefined && (
                <DetailItem
                    label="Missing Assignment Rate"
                    value={`${Number(student.missing_assignment_rate).toFixed(1)}%`}
                />
            )}
            {student?.risk_score !== undefined && (
                <DetailItem
                    label="Risk Score"
                    value={Number(student.risk_score).toFixed(1)}
                />
            )}
            {student?.risk_band && (
                <DetailItem label="Risk Status" value={student.risk_band} />
            )}
        </div>
    </div>
)
