import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Alert, FormPage, Text } from "@/components"
import { EditCourseForm } from "@/features/courses/components/EditCourseForm"
import { NewCourseForm } from "@/features/courses/components/NewCourseForm"
import { getCourseById } from "@/services"

export const CourseFormPage = () => {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const isEditing = Boolean(courseId)
    const [course, setCourse] = useState(null)
    const [error, setError] = useState(null)
    const [loadedCourseId, setLoadedCourseId] = useState(null)

    useEffect(() => {
        if (!isEditing) {
            return
        }

        let ignore = false

        const fetchCourse = async () => {
            try {
                const courseData = await getCourseById(courseId)
                if (!ignore) {
                    setCourse(courseData)
                    setLoadedCourseId(courseId)
                    setError(null)
                }
            } catch (err) {
                if (!ignore) {
                    setCourse(null)
                    setLoadedCourseId(courseId)
                    setError({
                        courseId,
                        message: err.body?.message || err.message || "Unable to load course.",
                    })
                }
            }
        }

        fetchCourse()

        return () => {
            ignore = true
        }
    }, [courseId, isEditing])

    const navigateToCourses = () => navigate("/courses")
    const currentError = isEditing && error?.courseId === courseId ? error.message : null
    const loading = isEditing && loadedCourseId !== courseId && !currentError
    const formContent = loading ? (
        <Text variant="muted">Loading course...</Text>
    ) : currentError ? null : isEditing ? (
        <EditCourseForm
            course={course}
            onUpdated={navigateToCourses}
            onCancel={navigateToCourses}
            onDeleted={navigateToCourses}
        />
    ) : (
        <NewCourseForm
            onCreated={navigateToCourses}
            onCancel={navigateToCourses}
        />
    )

    return (
        <FormPage title={isEditing ? "Edit Course" : "Create a New Course"}>
            {currentError && <Alert variant="error">{currentError}</Alert>}
            {formContent}
        </FormPage>
    )
}
