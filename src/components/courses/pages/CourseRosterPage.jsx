import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import {
    AddStudentsToCourseModal,
    Alert,
    CourseRosterHeader,
    CourseRosterTable,
    DeleteStudentConfirmationModal,
    Spinner,
    Stack,
    Text,
} from "@/components"
import {
    deleteEnrollment,
    getCourseById,
    getEnrollmentByCourseId,
} from "@/services"
import { getStudentFullName } from "@/components/students/utils/studentFormatters"

export const CourseRosterPage = () => {
    const { courseId } = useParams()
    const [course, setCourse] = useState(null)
    const [enrollments, setEnrollments] = useState([])
    const [addStudentsModalOpen, setAddStudentsModalOpen] = useState(false)
    const [enrollmentToRemove, setEnrollmentToRemove] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const fetchPageData = async () => {
            setLoading(true)

            try {
                const [courseData, enrollmentData] = await Promise.all([
                    getCourseById(courseId),
                    getEnrollmentByCourseId(courseId),
                ])

                if (!ignore) {
                    setCourse(courseData)
                    setEnrollments(enrollmentData)
                    setError(null)
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching course roster:", err)
                    setCourse(null)
                    setEnrollments([])
                    setError("Unable to load the course roster right now.")
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        fetchPageData()

        return () => {
            ignore = true
        }
    }, [courseId])

    const enrolledStudentIds = useMemo(
        () => enrollments.map((enrollment) => enrollment.student?.id),
        [enrollments],
    )

    const handleStudentAdded = async (enrollment) => {
        try {
            const enrollmentData = await getEnrollmentByCourseId(courseId)
            setEnrollments(enrollmentData)
            setError(null)
        } catch (err) {
            console.error("Error refreshing course roster:", err)

            if (enrollment) {
                setEnrollments((currentEnrollments) => {
                    const alreadyAdded = currentEnrollments.some(
                        (currentEnrollment) =>
                            currentEnrollment.id === enrollment.id,
                    )

                    return alreadyAdded
                        ? currentEnrollments
                        : [...currentEnrollments, enrollment]
                })
            }

            setError("Student was added, but the roster could not be refreshed.")
        }
    }

    const handleStudentRemoved = () => {
        setEnrollments((currentEnrollments) =>
            currentEnrollments.filter(
                (enrollment) => enrollment.id !== enrollmentToRemove?.id,
            ),
        )
        setEnrollmentToRemove(null)
    }

    if (loading) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <Spinner size="lg" />
                <Text variant="muted">Loading course roster...</Text>
            </Stack>
        )
    }

    return (
        <Stack className="p-4" gap="lg">
            <CourseRosterHeader
                course={course}
                courseId={courseId}
                onAddStudents={() => setAddStudentsModalOpen(true)}
            />

            {error && <Alert variant="error">{error}</Alert>}

            <CourseRosterTable
                courseId={courseId}
                enrollments={enrollments}
                onRemoveStudent={setEnrollmentToRemove}
            />

            <AddStudentsToCourseModal
                isOpen={addStudentsModalOpen}
                onClose={() => setAddStudentsModalOpen(false)}
                courseId={courseId}
                enrolledStudentIds={enrolledStudentIds}
                onStudentAdded={handleStudentAdded}
            />

            <DeleteStudentConfirmationModal
                isOpen={Boolean(enrollmentToRemove)}
                onClose={() => setEnrollmentToRemove(null)}
                deleteEnrollment={deleteEnrollment}
                enrollmentId={enrollmentToRemove?.id}
                studentName={
                    enrollmentToRemove?.student
                        ? getStudentFullName(enrollmentToRemove.student)
                        : ""
                }
                onDeleted={handleStudentRemoved}
            />
        </Stack>
    )
}
