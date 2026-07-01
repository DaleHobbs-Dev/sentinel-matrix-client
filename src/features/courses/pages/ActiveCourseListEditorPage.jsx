import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCourses, updateCourse } from "@/services"
import { Alert, Button } from "@/components"
import { CoursePageHeader } from "@/features"

export const ActiveCourseListEditorPage = () => {
    const navigate = useNavigate()
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
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <div>
                <CoursePageHeader title="Manage Course Status" />
                <p className="mt-1 text-slate-600">
                    Choose which courses should be active or inactive.
                </p>
            </div>

            {error && <Alert variant="error">{error}</Alert>}

            {loading ? (
                <p className="text-slate-600">Loading courses...</p>
            ) : courses.length === 0 ? (
                <p className="rounded-lg border border-slate-200 p-4 text-slate-600">
                    No courses to edit.
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {courses.map(course => (
                        <div
                            key={course.id}
                            className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
                        >
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="font-semibold text-slate-800">{course.course_name}</h2>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                            course.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-slate-200 text-slate-600"
                                        }`}
                                    >
                                        {course.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-slate-500">{course.term}</p>
                            </div>
                            <Button
                                type="button"
                                variant={course.is_active ? "danger" : "primary"}
                                disabled={savingId !== null}
                                onClick={() => toggleActive(course)}
                            >
                                {savingId === course.id
                                    ? "Saving..."
                                    : course.is_active ? "Make Inactive" : "Make Active"}
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <Button type="button" variant="secondary" onClick={() => navigate("/courses")}>
                    Cancel
                </Button>
                <Button type="button" onClick={() => navigate("/courses")}>
                    Back to Course Home
                </Button>
            </div>
        </div>
    )
}
