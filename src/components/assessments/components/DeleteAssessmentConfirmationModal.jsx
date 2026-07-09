import { DeleteConfirmationModal } from "@/components"

export const DeleteAssessmentConfirmationModal = ({
    isOpen,
    onClose,
    deleteAssessment,
    assessmentId,
    assessmentName,
    onDeleted,
}) => {
    return (
        <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            deleteItem={deleteAssessment}
            itemId={assessmentId}
            itemName={assessmentName}
            onDeleted={onDeleted}
            title="Delete Assessment"
            message={`This will remove the assessment and all student scores from your course. Are you sure you want to delete ${assessmentName || "this assessment"}?`}
            restoreMessage={null}
            confirmLabel="Delete Assessment"
            errorMessage="Unable to delete assessment."
        />
    )
}
