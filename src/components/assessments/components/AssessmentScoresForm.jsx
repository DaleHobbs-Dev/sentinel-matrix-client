import { useState } from "react"
import { Alert, Button, StudentAssessmentScoresFields } from "@/components"
import { updateAssessment } from "@/services"

export const AssessmentScoresForm = ({
    assessment,
    students = [],
    onSaved,
    onCancel,
}) => {
    const [studentScores, setStudentScores] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const updatedAssessment = await updateAssessment(assessment.id, {
                student_scores: studentScores,
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
