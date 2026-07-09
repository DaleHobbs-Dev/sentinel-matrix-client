import { useState } from "react"
import { Alert, Button, StudentAssessmentScoresFields } from "@/components"
import {
    createStudentAssessment,
    updateAssessment,
    updateStudentAssessment,
} from "@/services"

const isPastDue = (date) => {
    if (!date) {
        return false
    }

    const dueDate = new Date(date)

    return !Number.isNaN(dueDate.getTime()) && dueDate < new Date()
}

const getAssessmentScoreRecords = (assessment) =>
    assessment?.student_scores ||
    assessment?.student_assessments ||
    assessment?.scores ||
    []

const findAssessmentScoreRecord = (scoreRecord, assessmentScoreRecords) =>
    assessmentScoreRecords.find((assessmentScoreRecord) => {
        const recordStudentId =
            assessmentScoreRecord.student_id ??
            assessmentScoreRecord.student?.id ??
            assessmentScoreRecord.enrollment?.student?.id
        const recordEnrollmentId =
            assessmentScoreRecord.enrollment_id ??
            assessmentScoreRecord.enrollment?.id

        return (
            recordStudentId === scoreRecord.student_id ||
            recordEnrollmentId === scoreRecord.enrollment_id
        )
    })

const markBlankPastDueScoresMissing = async ({ assessment, scoreRecords }) => {
    if (!isPastDue(assessment.due_date)) {
        return
    }

    const assessmentScoreRecords = getAssessmentScoreRecords(assessment)
    const missingScoreRecords = scoreRecords.filter(
        (scoreRecord) =>
            scoreRecord.enrollment_id &&
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

export const AssessmentScoresForm = ({
    assessment,
    students = [],
    onSaved,
    onCancel,
}) => {
    const [studentScores, setStudentScores] = useState([])
    const [markingMissingStudentId, setMarkingMissingStudentId] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const saveMissingStudentAssessment = async (scoreRecord) => {
        const studentAssessment = {
            enrollment: scoreRecord.enrollment_id,
            assessment: assessment.id,
            score: null,
            is_missing: true,
            completed_date: null,
        }

        return scoreRecord.student_assessment_id
            ? updateStudentAssessment(
                scoreRecord.student_assessment_id,
                studentAssessment,
            )
            : createStudentAssessment(studentAssessment)
    }

    const handleMarkMissing = async (scoreRecord) => {
        if (!scoreRecord.enrollment_id) {
            setError("Unable to mark missing because this student is missing an enrollment record.")
            return
        }

        setMarkingMissingStudentId(scoreRecord.student_id)
        setError(null)

        try {
            await saveMissingStudentAssessment(scoreRecord)
        } catch (err) {
            setError(
                err.body?.detail ||
                err.body?.message ||
                err.message ||
                "Unable to mark this score as missing.",
            )
        } finally {
            setMarkingMissingStudentId(null)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const updatedAssessment = await updateAssessment(assessment.id, {
                student_scores: studentScores,
            })
            await markBlankPastDueScoresMissing({
                assessment: {
                    ...assessment,
                    ...updatedAssessment,
                    due_date: updatedAssessment?.due_date ?? assessment.due_date,
                },
                scoreRecords: studentScores,
            })
            onSaved?.(updatedAssessment)
        } catch (err) {
            setError(err.body?.detail || err.body?.message || err.message || "Unable to save student scores.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <Alert variant="error">{error}</Alert>}

            <StudentAssessmentScoresFields
                key={assessment.id}
                assessment={assessment}
                students={students}
                maxScore={assessment.max_score}
                onScoresChange={setStudentScores}
                onMarkMissing={handleMarkMissing}
                markingMissingStudentId={markingMissingStudentId}
            />

            <div className="flex justify-end gap-3 pt-2">
                {onCancel && (
                    <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Scores"}
                </Button>
            </div>
        </form>
    )
}
