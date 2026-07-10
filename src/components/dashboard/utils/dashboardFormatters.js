export const formatCount = (value) => value ?? 0

export const formatRiskScore = (value) => {
    if (value === null || value === undefined) {
        return "N/A"
    }

    return Number(value).toFixed(1)
}

export const getRiskStudentCourseId = (riskStudent) => riskStudent.course_id

export const getRiskStudentStudentId = (riskStudent) => riskStudent.id

export const riskStudentHasCourseDetailsRoute = (riskStudent) =>
    Boolean(
        getRiskStudentCourseId(riskStudent) &&
        getRiskStudentStudentId(riskStudent),
    )
