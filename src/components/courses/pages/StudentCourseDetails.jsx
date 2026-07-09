import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Alert,
    Button,
    Spinner,
    Stack,
    StudentCourseAssessmentsTable,
    StudentAssessmentScoreModal,
    StudentDetailsCard,
    Text,
} from "@/components"
import {
    createStudentAssessment,
    getAssessmentByCourseId,
    getEnrollmentByCourseIdAndStudentId,
    getStudentAssessmentsByEnrollmentID,
    updateStudentAssessment,
} from "@/services"

export const StudentCourseDetails = () => {
    const { courseId, studentId } = useParams()
    const navigate = useNavigate()
    const [enrollment, setEnrollment] = useState(null)
    const [assessments, setAssessments] = useState([])
    const [studentAssessments, setStudentAssessments] = useState([])
    const [markingMissingId, setMarkingMissingId] = useState(null)
    const [selectedAssessmentScore, setSelectedAssessmentScore] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const fetchPageData = async () => {
            setLoading(true)

            try {
                const enrollmentData = await getEnrollmentByCourseIdAndStudentId(
                    courseId,
                    studentId,
                )
                const selectedEnrollment = Array.isArray(enrollmentData)
                    ? enrollmentData[0]
                    : enrollmentData
                const [courseAssessmentsData, studentAssessmentData] =
                    await Promise.all([
                        getAssessmentByCourseId(courseId),
                        selectedEnrollment
                            ? getStudentAssessmentsByEnrollmentID(
                                selectedEnrollment.id,
                            )
                            : Promise.resolve([]),
                    ])

                if (!ignore) {
                    setEnrollment(selectedEnrollment || null)
                    setAssessments(courseAssessmentsData)
                    setStudentAssessments(studentAssessmentData)
                    setError(
                        selectedEnrollment
                            ? null
                            : "This student is not enrolled in this course.",
                    )
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching course student details:", err)
                    setEnrollment(null)
                    setAssessments([])
                    setStudentAssessments([])
                    setError("Unable to load this course student right now.")
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
    }, [courseId, studentId])

    const assessmentScores = assessments.map((assessment) => ({
        assessment,
        studentAssessment: studentAssessments.find(
            (studentAssessment) =>
                studentAssessment.assessment?.id === assessment.id,
        ),
    }))

    const saveStudentAssessment = async ({
        assessmentScore,
        score,
        isMissing = false,
    }) => {
        const studentAssessmentPayload = {
            enrollment: enrollment.id,
            assessment: assessmentScore.assessment.id,
            score: isMissing ? null : score,
            is_missing: isMissing,
            completed_date: isMissing ? null : new Date().toISOString(),
        }

        return assessmentScore.studentAssessment
            ? updateStudentAssessment(
                assessmentScore.studentAssessment.id,
                studentAssessmentPayload,
            )
            : createStudentAssessment(studentAssessmentPayload)
    }

    const upsertStudentAssessment = (savedStudentAssessment) => {
        setStudentAssessments((currentStudentAssessments) => {
            const alreadyExists = currentStudentAssessments.some(
                (studentAssessment) =>
                    studentAssessment.id === savedStudentAssessment.id,
            )

            return alreadyExists
                ? currentStudentAssessments.map((studentAssessment) =>
                    studentAssessment.id === savedStudentAssessment.id
                        ? savedStudentAssessment
                        : studentAssessment,
                )
                : [...currentStudentAssessments, savedStudentAssessment]
        })
    }

    const handleSaveScore = async ({ assessmentScore, score }) => {
        const savedStudentAssessment = await saveStudentAssessment({
            assessmentScore,
            score,
            isMissing: false,
        })

        upsertStudentAssessment(savedStudentAssessment)
    }

    const markAssessmentScoreMissing = async (assessmentScore) => {
        const savedStudentAssessment = await saveStudentAssessment({
            assessmentScore,
            isMissing: true,
        })

        upsertStudentAssessment(savedStudentAssessment)
    }

    const handleMarkMissing = async (assessmentScore) => {
        setMarkingMissingId(assessmentScore.assessment.id)
        setError(null)

        try {
            await markAssessmentScoreMissing(assessmentScore)
        } catch (err) {
            setError(
                err.body?.detail ||
                err.body?.message ||
                err.message ||
                "Unable to mark this assessment as missing.",
            )
        } finally {
            setMarkingMissingId(null)
        }
    }

    if (loading) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <Spinner size="lg" />
                <Text variant="muted">Loading student course details...</Text>
            </Stack>
        )
    }

    return (
        <Stack className="p-4" gap="lg">
            {error && <Alert variant="error">{error}</Alert>}

            {enrollment && (
                <>
                    <StudentDetailsCard
                        student={enrollment.student}
                        metrics={enrollment}
                    />

                    <section>
                        <Text as="h2" className="mb-3 text-xl font-semibold">
                            Assessments
                        </Text>
                        <StudentCourseAssessmentsTable
                            assessmentScores={assessmentScores}
                            markingMissingId={markingMissingId}
                            onOpenScoreModal={setSelectedAssessmentScore}
                            onMarkMissing={handleMarkMissing}
                        />
                    </section>
                </>
            )}

            <div>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(`/courses/${courseId}/roster`)}
                >
                    Back to Course Roster
                </Button>
            </div>

            <StudentAssessmentScoreModal
                key={selectedAssessmentScore?.assessment?.id || "score-modal"}
                isOpen={Boolean(selectedAssessmentScore)}
                onClose={() => setSelectedAssessmentScore(null)}
                assessmentScore={selectedAssessmentScore}
                enrollment={enrollment}
                onSaveScore={handleSaveScore}
                onMarkMissing={markAssessmentScoreMissing}
            />
        </Stack>
    )
}
