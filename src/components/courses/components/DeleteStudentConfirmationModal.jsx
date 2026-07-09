import { DeleteConfirmationModal } from "@/components"

export const DeleteStudentConfirmationModal = ({
    isOpen,
    onClose,
    deleteEnrollment,
    enrollmentId,
    studentName,
    onDeleted,
}) => {
    return (
        <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            deleteItem={deleteEnrollment}
            itemId={enrollmentId}
            itemName={studentName}
            onDeleted={onDeleted}
            title="Remove Student from Course"
            message="Are you sure you want to remove this student from the course roster?"
            restoreMessage={null}
            confirmLabel="Remove Student"
            deletingLabel="Removing..."
            errorMessage="Unable to remove student from course roster."
        />
    )
}
