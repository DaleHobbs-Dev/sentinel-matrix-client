import { useState } from "react"
import { updateCourse } from "@/services"
import { CourseForm } from "./CourseForm"

export const EditCourseForm = ({ course, onUpdated, onCancel }) => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (courseData) => {
        setSubmitting(true)
        setError(null)

        try {
            const updatedCourse = await updateCourse(course.id, courseData)
            // Some PATCH endpoints return 204 No Content, so keep a local fallback.
            onUpdated?.(updatedCourse ?? { ...course, ...courseData })
        } catch (err) {
            setError(err.body?.message || err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <CourseForm
            initialValues={course}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            submitLabel="Save Changes"
            submitting={submitting}
            error={error}
        />
    )
}
