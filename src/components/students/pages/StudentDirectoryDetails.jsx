import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Alert,
    Button,
    Spinner,
    Stack,
    StudentCurrentCourses,
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
                    <StudentCurrentCourses courses={student.current_courses} />
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
