import { useState } from "react"
import { createAssessment } from "@/services"
import { AssessmentForm } from "@/components"

export const NewAssessmentForm = ({ courseId, assessmentTypes = [], onCreated, onCancel }) => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (assessmentData) => {
        setSubmitting(true)
        setError(null)

        try {
            // The API supplies instructor_id and defaults is_active to true.
            const createdAssessment = await createAssessment(assessmentData)
            onCreated?.(createdAssessment)
        } catch (err) {
            setError(err.body?.detail || err.body?.message || err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AssessmentForm
            courseId={courseId}
            assessmentTypes={assessmentTypes}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            submitLabel="Create Assessment"
            submitting={submitting}
            error={error}
        />
    )
}
