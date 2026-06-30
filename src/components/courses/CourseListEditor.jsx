import { useState } from "react"
import { updateCourse } from "@/services"
import { Alert, Button } from "@/components/ui"

export const CourseListEditor = ({ courses = [], onCourseUpdated }) => {
    const [savingId, setSavingId] = useState(null)
    const [error, setError] = useState(null)

    const toggleActive = async (course) => {
        setSavingId(course.id)
        setError(null)

        try {
            const changes = { is_active: !course.is_active }
            const updatedCourse = await updateCourse(course.id, changes)
            // updateCourse may return null when the API responds with 204.
            onCourseUpdated?.(updatedCourse ?? { ...course, ...changes })
        } catch (err) {
            setError(err.body?.message || err.message)
        } finally {
            setSavingId(null)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            {error && <Alert variant="error">{error}</Alert>}

            {courses.length === 0 && <p className="text-gray-600">No courses to edit.</p>}

            {courses.map(course => (
                <div key={course.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
                    <div>
                        <h2 className="font-semibold">{course.course_name}</h2>
                        <p className="text-sm text-gray-500">{course.term}</p>
                    </div>
                    <Button
                        type="button"
                        variant={course.is_active ? "danger" : "secondary"}
                        disabled={savingId === course.id}
                        onClick={() => toggleActive(course)}
                    >
                        {savingId === course.id
                            ? "Saving..."
                            : course.is_active ? "Make Inactive" : "Make Active"}
                    </Button>
                </div>
            ))}
        </div>
    )
}
