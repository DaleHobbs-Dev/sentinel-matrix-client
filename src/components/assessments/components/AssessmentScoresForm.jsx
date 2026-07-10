import { useState } from "react"
import { Alert, Button, StudentAssessmentScoresFields } from "@/components"
import { updateAssessmentForStudentAssessments } from "@/services"

export const AssessmentScoresForm = ({
    assessment,
    students = [],
    onSaved,
    onCancel,
}) => {
    const [studentScores, setStudentScores] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const getStudentAssessmentPayload = (scoreRecord) => {
        const payload = {
            enrollment: scoreRecord.enrollment_id,
            ...(scoreRecord.is_missing
                ? { is_missing: true }
                : {
                    score:
                        scoreRecord.score === null ||
                        scoreRecord.score === undefined
                            ? ""
                            : scoreRecord.score,
                    is_missing: false,
                }),
        }

        if (scoreRecord.student_assessment_id) {
            payload.id = scoreRecord.student_assessment_id
        }

        return payload
    }

    const handleMarkMissing = (scoreRecord) => {
        if (!scoreRecord.enrollment_id) {
            setError("Unable to mark missing because this student is missing an enrollment record.")
            return null
        }

        setError(null)

        return {
            ...scoreRecord,
            is_missing: !scoreRecord.is_missing,
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const updatedStudentAssessments =
                await updateAssessmentForStudentAssessments(
                    assessment.id,
                    {
                        student_assessments: studentScores.map(
                            getStudentAssessmentPayload,
                        ),
                    },
                )

            onSaved?.({
                ...assessment,
                student_assessments: updatedStudentAssessments,
            })
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
