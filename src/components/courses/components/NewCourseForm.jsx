import { useState } from "react"
import { createCourse } from "@/services"
import { CourseForm } from "@/components"

export const NewCourseForm = ({ onCreated, onCancel }) => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (courseData) => {
        setSubmitting(true)
        setError(null)

        try {
            // The API supplies instructor_id and defaults is_active to true.
            const createdCourse = await createCourse(courseData)
            onCreated?.(createdCourse)
        } catch (err) {
            setError(err.body?.message || err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <CourseForm
            onSubmit={handleSubmit}
            onCancel={onCancel}
            submitLabel="Create Course"
            submitting={submitting}
            error={error}
        />
    )
}
