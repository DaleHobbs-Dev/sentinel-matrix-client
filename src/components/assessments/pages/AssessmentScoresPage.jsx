import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Alert, AssessmentScoresForm, FormPage, Text } from "@/components"
import { getAssessmentById, getCourseDashboard } from "@/services"

export const AssessmentScoresPage = () => {
    const navigate = useNavigate()
    const { courseId, assessmentId } = useParams()
    const [assessment, setAssessment] = useState(null)
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const fetchPageData = async () => {
            setLoading(true)

            try {
                const [assessmentData, courseDashboardData] = await Promise.all([
                    getAssessmentById(assessmentId),
                    getCourseDashboard(courseId),
                ])

                if (!ignore) {
                    setAssessment(assessmentData)
                    setStudents(courseDashboardData.students ?? [])
                    setError(null)
                }
            } catch (err) {
                if (!ignore) {
                    setAssessment(null)
                    setStudents([])
                    setError(err.body?.detail || err.body?.message || err.message || "Unable to load assessment scores.")
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
    }, [assessmentId, courseId])

    const navigateToAssessments = () => navigate(`/courses/${courseId}/assessments`)

    const content = loading ? (
        <Text variant="muted">Loading score sheet...</Text>
    ) : error ? (
        <Alert variant="error">{error}</Alert>
    ) : (
        <AssessmentScoresForm
            assessment={assessment}
            students={students}
            onSaved={navigateToAssessments}
            onCancel={navigateToAssessments}
        />
    )

    return (
        <FormPage title={assessment?.title ? `Record Scores: ${assessment.title}` : "Record Scores"}>
            {content}
        </FormPage>
    )
}
