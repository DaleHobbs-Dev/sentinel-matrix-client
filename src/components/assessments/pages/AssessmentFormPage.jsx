import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Alert, FormPage, Text, NewAssessmentForm, EditAssessmentForm } from "@/components"
import { getAssessmentById, getCourseAssessmentTypes } from "@/services"

export const AssessmentFormPage = () => {
    const navigate = useNavigate()
    const { courseId, assessmentId } = useParams()
    const isEditing = Boolean(assessmentId)
    const [assessment, setAssessment] = useState(null)
    const [assessmentTypes, setAssessmentTypes] = useState([])
    const [isLoadingPageData, setIsLoadingPageData] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const fetchPageData = async () => {
            setIsLoadingPageData(true)

            try {
                const [assessmentTypesData, assessmentData] = await Promise.all([
                    getCourseAssessmentTypes(courseId),
                    isEditing ? getAssessmentById(assessmentId) : Promise.resolve(null),
                ])

                if (!ignore) {
                    setAssessmentTypes(assessmentTypesData)
                    setAssessment(assessmentData)
                    setError(null)
                }
            } catch (err) {
                if (!ignore) {
                    setAssessment(null)
                    setAssessmentTypes([])
                    setError({
                        courseId,
                        assessmentId,
                        message: err.body?.message || err.message || "Unable to load course and/or assessment.",
                    })
                }
            } finally {
                if (!ignore) {
                    setIsLoadingPageData(false)
                }
            }
        }

        fetchPageData()

        return () => {
            ignore = true
        }
    }, [courseId, assessmentId, isEditing])

    const navigateToAssessments = () => navigate(`/courses/${courseId}/assessments`)
    const currentError = isEditing && error?.courseId === courseId && error?.assessmentId === assessmentId ? error.message : null
    const loading = isLoadingPageData || (isEditing && !assessment && !currentError)
    const formContent = loading ? (
        <Text variant="muted">Loading assessment...</Text>
    ) : currentError ? null : isEditing ? (
        <EditAssessmentForm
            assessment={assessment}
            assessmentTypes={assessmentTypes}
            onUpdated={navigateToAssessments}
            onCancel={navigateToAssessments}
            onDeleted={navigateToAssessments}
        />
    ) : (
        <NewAssessmentForm
            courseId={courseId}
            assessmentTypes={assessmentTypes}
            onCreated={navigateToAssessments}
            onCancel={navigateToAssessments}
        />
    )

    return (
        <FormPage title={isEditing ? "Edit Assessment" : "Create a New Assessment"}>
            {currentError && <Alert variant="error">{currentError}</Alert>}
            {formContent}
        </FormPage>
    )
}
