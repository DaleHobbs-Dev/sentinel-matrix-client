import { useEffect, useMemo, useState } from "react"
import {
    Alert,
    Button,
    FormField,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Select,
    Spinner,
    Text,
} from "@/components"
import { createEnrollment, getStudents } from "@/services"
import { getStudentFullName } from "@/components/students/utils/studentFormatters"

export const AddStudentsToCourseModal = ({
    isOpen,
    onClose,
    courseId,
    enrolledStudentIds = [],
    onStudentAdded,
}) => {
    const [students, setStudents] = useState([])
    const [selectedStudentId, setSelectedStudentId] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isOpen) {
            return
        }

        let ignore = false

        const fetchStudents = async () => {
            setLoading(true)
            setError(null)

            try {
                const studentsData = await getStudents()

                if (!ignore) {
                    setStudents(studentsData)
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching students:", err)
                    setStudents([])
                    setError("Unable to load students right now.")
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        fetchStudents()

        return () => {
            ignore = true
        }
    }, [isOpen])

    const enrolledStudentIdSet = useMemo(
        () => new Set(enrolledStudentIds.map((studentId) => Number(studentId))),
        [enrolledStudentIds],
    )

    const availableStudents = useMemo(
        () =>
            students.filter(
                (student) => !enrolledStudentIdSet.has(Number(student.id)),
            ),
        [enrolledStudentIdSet, students],
    )

    const handleClose = () => {
        if (submitting) {
            return
        }

        setError(null)
        setSelectedStudentId("")
        onClose?.()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        if (!selectedStudentId) {
            setError("Choose a student to add to this course.")
            return
        }

        setSubmitting(true)

        try {
            const enrollment = await createEnrollment({
                course: Number(courseId),
                student: Number(selectedStudentId),
            })
            onStudentAdded?.(enrollment)
            setSelectedStudentId("")
            onClose?.()
        } catch (err) {
            setError(
                err.body?.detail ||
                err.body?.message ||
                err.message ||
                "Unable to add student to this course.",
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg">
            <form onSubmit={handleSubmit}>
                <ModalHeader onClose={handleClose}>
                    <Text as="h2" className="text-xl font-semibold">
                        Add Student to Course
                    </Text>
                </ModalHeader>

                <ModalBody>
                    {error && (
                        <Alert variant="error" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center gap-3 rounded-lg bg-surface-muted p-6">
                            <Spinner />
                            <Text variant="muted">Loading students...</Text>
                        </div>
                    ) : availableStudents.length === 0 ? (
                        <Text variant="muted">
                            Every available student is already enrolled in this course.
                        </Text>
                    ) : (
                        <FormField label="Student">
                            <Select
                                value={selectedStudentId}
                                onChange={(event) =>
                                    setSelectedStudentId(event.target.value)
                                }
                                required
                            >
                                <option value="">Choose a student</option>
                                {availableStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {getStudentFullName(student)}
                                    </option>
                                ))}
                            </Select>
                        </FormField>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={
                            loading ||
                            submitting ||
                            availableStudents.length === 0
                        }
                    >
                        {submitting ? "Adding..." : "Add Student"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}
