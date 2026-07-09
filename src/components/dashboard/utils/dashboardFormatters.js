export const formatCount = (value) => value ?? 0

export const formatRiskScore = (value) => {
    if (value === null || value === undefined) {
        return "N/A"
    }

    return Number(value).toFixed(1)
}

export const getRiskStudentCourseId = (riskStudent) =>
    riskStudent.course_id ??
    riskStudent.courseId ??
    riskStudent.course?.id ??
    riskStudent.enrollment?.course_id ??
    riskStudent.enrollment?.course?.id

export const getRiskStudentStudentId = (riskStudent) =>
    riskStudent.student?.id ??
    riskStudent.student_id ??
    riskStudent.studentId ??
    riskStudent.id ??
    riskStudent.enrollment?.student_id ??
    riskStudent.enrollment?.student?.id

export const riskStudentHasCourseDetailsRoute = (riskStudent) =>
    Boolean(
        getRiskStudentCourseId(riskStudent) &&
            getRiskStudentStudentId(riskStudent),
    )
