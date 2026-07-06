import { DeleteConfirmationModal } from "@/components"

export const DeleteCourseConfirmationModal = ({
    isOpen,
    onClose,
    deleteCourse,
    courseId,
    courseName,
    onDeleted,
}) => {
    return (
        <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            deleteItem={deleteCourse}
            itemId={courseId}
            itemName={courseName}
            onDeleted={onDeleted}
            title="Delete Course"
            message="Are you sure you want to delete this course? Only a system admin can restore the course once it is deleted."
            restoreMessage={null}
            confirmLabel="Delete Course"
            errorMessage="Unable to delete course."
        />
    )
}
