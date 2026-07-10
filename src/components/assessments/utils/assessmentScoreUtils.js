import {
    createStudentAssessment,
    updateStudentAssessment,
} from "@/services"

// Takes in a due date string or Date value.
// Returns true when the date is valid and before the current date.
export const isPastDue = (date) => {
    if (!date) {
        return false
    }

    const dueDate = new Date(date)

    return !Number.isNaN(dueDate.getTime()) && dueDate < new Date()
}

// Takes in an assessment object from the API.
// Returns the list of student score records, even if the backend names that list a few different ways.
export const getAssessmentScoreRecords = (assessment) =>
    assessment?.student_scores ||
    assessment?.student_assessments ||
    assessment?.scores ||
    []

// Takes in one student object and the existing score records for an assessment.
// Returns the existing score record for that student or enrollment, or undefined if none exists.
export const findExistingScore = (student, scoreRecords) => {
    return scoreRecords.find((scoreRecord) => {
        const recordStudentId =
            scoreRecord.student_id ??
            scoreRecord.student?.id ??
            scoreRecord.enrollment?.student?.id
        const recordEnrollmentId =
            scoreRecord.enrollment_id ??
            (typeof scoreRecord.enrollment === "number"
                ? scoreRecord.enrollment
                : scoreRecord.enrollment?.id)

        return (
            recordStudentId === student.id ||
            recordEnrollmentId === student.enrollment_id
        )
    })
}

// Takes in one score row from the form and the existing score records for the assessment.
// Returns the matching existing score record for that student or enrollment, or undefined if none exists.
export const findAssessmentScoreRecord = (scoreRecord, assessmentScoreRecords) =>
    assessmentScoreRecords.find((assessmentScoreRecord) => {
        const recordStudentId =
            assessmentScoreRecord.student_id ??
            assessmentScoreRecord.student?.id ??
            assessmentScoreRecord.enrollment?.student?.id
        const recordEnrollmentId =
            assessmentScoreRecord.enrollment_id ??
            (typeof assessmentScoreRecord.enrollment === "number"
                ? assessmentScoreRecord.enrollment
                : assessmentScoreRecord.enrollment?.id)

        return (
            recordStudentId === scoreRecord.student_id ||
            recordEnrollmentId === scoreRecord.enrollment_id
        )
    })

// Takes in the maximum possible score for an assessment.
// Returns a display-friendly number string, or "N/A" when no score is available.
export const formatMaximumScore = (value) => {
    if (value === null || value === undefined || value === "") {
        return "N/A"
    }

    return Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })
}

// Takes in an assessment and the score rows currently shown in the score form.
// If the assessment is past due, this saves blank enrolled student scores as missing and returns when all saves finish.
export const markBlankPastDueScoresMissing = async ({
    assessment,
    scoreRecords,
}) => {
    if (!isPastDue(assessment.due_date)) {
        return
    }

    const assessmentScoreRecords = getAssessmentScoreRecords(assessment)
    const missingScoreRecords = scoreRecords.filter(
        (scoreRecord) =>
            scoreRecord.enrollment_id &&
            !scoreRecord.is_missing &&
            (scoreRecord.score === null ||
                scoreRecord.score === undefined ||
                scoreRecord.score === ""),
    )

    await Promise.all(
        missingScoreRecords.map((scoreRecord) => {
            const assessmentScoreRecord = findAssessmentScoreRecord(
                scoreRecord,
                assessmentScoreRecords,
            )
            const studentAssessment = {
                enrollment: scoreRecord.enrollment_id,
                assessment: assessment.id,
                score: null,
                is_missing: true,
                completed_date: null,
            }
            const studentAssessmentId =
                assessmentScoreRecord?.id || scoreRecord.student_assessment_id

            return studentAssessmentId
                ? updateStudentAssessment(
                    studentAssessmentId,
                    studentAssessment,
                )
                : createStudentAssessment(studentAssessment)
        }),
    )
}
