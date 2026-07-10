import { useState } from "react"
import { Alert, Button, StudentAssessmentScoresFields, markBlankPastDueScoresMissing } from "@/components"
import {
    createStudentAssessment,
    updateAssessment,
    updateStudentAssessment,
} from "@/services"

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

    // Function to save a missing student assessment
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
