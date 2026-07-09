import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, AssessmentForm, DeleteAssessmentConfirmationModal} from "@/components"
import { deleteAssessment, updateAssessment } from "@/services"

export const EditAssessmentForm = ({
    assessment,
    assessmentTypes = [],
    onUpdated,
    onCancel,
    onDeleted,
}) => {
    const { courseId, assessmentId } = useParams()
    const [submitting, setSubmitting] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (assessmentData) => {
        setSubmitting(true)
        setError(null)

        try {
            const updatedAssessment = await updateAssessment(assessmentId, assessmentData)
            onUpdated?.(updatedAssessment ?? { ...assessment, ...assessmentData })
        } catch (err) {
            setError(err.body?.detail || err.body?.message || err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (!assessment) {
        return <p>Loading...</p>
    }

    return (
        <>
            <AssessmentForm
                key={assessment.id}
                initialValues={assessment}
                courseId={courseId}
                assessmentTypes={assessmentTypes}
                onSubmit={handleSubmit}
                onCancel={onCancel}
                submitLabel="Save Changes"
                submitting={submitting}
                error={error}
            />

            <div className="mt-6 flex justify-center border-t border-gray-200 pt-6">
                <Button
                    type="button"
                    variant="danger"
                    onClick={() => setDeleteModalOpen(true)}
                    disabled={submitting}
                >
                    Delete Assessment
                </Button>
            </div>

            <DeleteAssessmentConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                deleteAssessment={deleteAssessment}
                assessmentId={assessmentId}
                assessmentName={assessment.title}
                onDeleted={onDeleted}
            />
        </>
    )
}
