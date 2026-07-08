import { useEffect, useState } from "react"
import { getCourses, updateCourse } from "@/services"
import { Alert, PageHeader, Stack, Text, Button, ButtonGroup, CourseStatusListItem } from "@/components"

export const ActiveCourseListEditorPage = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [savingId, setSavingId] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses()
                setCourses(data)
            } catch (err) {
                setError(err.body?.message || err.message || "Unable to load courses.")
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    const toggleActive = async (course) => {
        setSavingId(course.id)
        setError(null)

        try {
            const changes = { is_active: !course.is_active }
            const response = await updateCourse(course.id, changes)
            // updateCourse may return null when the API responds with 204.
            const updatedCourse = response ?? { ...course, ...changes }

            setCourses(currentCourses =>
                currentCourses.map(currentCourse =>
                    currentCourse.id === course.id
                        ? { ...currentCourse, ...updatedCourse }
                        : currentCourse
                )
            )
        } catch (err) {
            setError(err.body?.message || err.message || "Unable to update the course.")
        } finally {
            setSavingId(null)
        }
    }

    return (
        <Stack gap="lg" className="mx-auto max-w-4xl">
            <PageHeader
                title="Manage Course Status"
                description="Choose which courses should be active or inactive. Active courses will be visible on the instructor dashboard, while inactive courses will not."
            />

            {error && <Alert variant="error">{error}</Alert>}

            {loading ? (
                <Text variant="muted">Loading courses...</Text>
            ) : courses.length === 0 ? (
                <Text variant="muted" className="rounded-lg border border-border p-4">
                    No courses to edit.
                </Text>
            ) : (
                <Stack gap="compact">
                    {courses.map(course => (
                        <CourseStatusListItem
                            key={course.id}
                            course={course}
                            isSaving={savingId === course.id}
                            disabled={savingId !== null}
                            onToggle={toggleActive}
                        />
                    ))}
                <ButtonGroup>               
                    <Button className="m-auto" type="button" variant="primary" to="/courses">
                    Back to Course Dashboard
                    </Button>
                </ButtonGroup>
                </Stack>
            )}
        </Stack>
    )
}
