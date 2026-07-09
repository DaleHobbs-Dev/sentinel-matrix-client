import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Alert,
    Button,
    Spinner,
    Stack,
    StudentDetailsCard,
    Text,
} from "@/components"
import { getStudentById } from "@/services"

export const StudentDirectoryDetails = () => {
    const { studentId } = useParams()
    const navigate = useNavigate()
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const fetchStudent = async () => {
            setLoading(true)

            try {
                const studentData = await getStudentById(studentId)

                if (!ignore) {
                    setStudent(studentData)
                    setError(null)
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching student:", err)
                    setStudent(null)
                    setError("Unable to load this student right now.")
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        fetchStudent()

        return () => {
            ignore = true
        }
    }, [studentId])

    if (loading) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <Spinner size="lg" />
                <Text variant="muted">Loading student...</Text>
            </Stack>
        )
    }

    return (
        <Stack className="p-4" gap="lg">
            {error && <Alert variant="error">{error}</Alert>}

            {student && (
                <>
                    <StudentDetailsCard student={student} />

                    <section>
                        <Text as="h2" className="mb-3 text-xl font-semibold">
                            Current Courses
                        </Text>
                        {student.current_courses?.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {student.current_courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                                    >
                                        <Text className="font-medium">
                                            {course.course_name}
                                        </Text>
                                        <Text variant="muted">
                                            {course.is_active ? "Active" : "Inactive"}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Text variant="muted">
                                This student is not currently enrolled in any courses.
                            </Text>
                        )}
                    </section>
                </>
            )}

            <div>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/students")}
                >
                    Back to Student List
                </Button>
            </div>
        </Stack>
    )
}
