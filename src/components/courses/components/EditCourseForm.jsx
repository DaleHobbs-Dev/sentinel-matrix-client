import { useState } from "react"
import { Button } from "@/components"
import { deleteCourse, updateCourse } from "@/services"
import { CourseForm } from "./CourseForm"
import { DeleteCourseConfirmationModal } from "./DeleteCourseConfirmationModal"

export const EditCourseForm = ({ course, onUpdated, onCancel, onDeleted }) => {
    const [submitting, setSubmitting] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (courseData) => {
        setSubmitting(true)
        setError(null)

        try {
            const updatedCourse = await updateCourse(course.id, courseData)
            onUpdated?.(updatedCourse ?? { ...course, ...courseData })
        } catch (err) {
            setError(err.body?.message || err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (!course) {
        return <p>Loading...</p>
    }

    return (
        <>
            <CourseForm
                key={course.id}
                initialValues={course}
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
                    Delete Course
                </Button>
            </div>

            <DeleteCourseConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                deleteCourse={deleteCourse}
                courseId={course.id}
                courseName={course.course_name}
                onDeleted={onDeleted}
            />
        </>
    )
}
