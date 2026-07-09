import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Alert,
    AssessmentPageHeader,
    AssessmentsList,
    AssessmentTypeFilter,
    CourseAssessmentWeightsModal,
    DeleteAssessmentConfirmationModal,
    Spinner,
    Stack,
    Text,
} from "@/components";
import { deleteAssessment, getAssessmentByCourseId, getCourseAssessmentTypes } from "@/services";

export const CourseAssessmentsPage = () => {
    const { courseId } = useParams();
    const [assessments, setAssessments] = useState([]);
    const [courseAssessmentTypes, setCourseAssessmentTypes] = useState([]);
    const [selectedAssessmentType, setSelectedAssessmentType] = useState("all");
    const [weightsModalOpen, setWeightsModalOpen] = useState(false);
    const [assessmentToDelete, setAssessmentToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchPageData = async () => {
            setLoading(true);

            try {
                const [assessmentsData, courseAssessmentTypesData] = await Promise.all([
                    getAssessmentByCourseId(courseId),
                    getCourseAssessmentTypes(courseId),
                ]);

                if (!ignore) {
                    setAssessments(assessmentsData);
                    setCourseAssessmentTypes(courseAssessmentTypesData);
                    setError(null);
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching assessments:", err);
                    setAssessments([]);
                    setCourseAssessmentTypes([]);
                    setError("Unable to load assessments for this course right now.");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        fetchPageData();

        return () => {
            ignore = true;
        }
    }, [courseId]);

    const filteredAssessments = selectedAssessmentType === "all"
        ? assessments
        : assessments.filter((assessment) => assessment.assessment_type_name === selectedAssessmentType);

    const handleWeightsUpdated = (updatedTypes) => {
        if (updatedTypes) {
            setCourseAssessmentTypes(updatedTypes.flat());
        }
    }

    const handleAssessmentDeleted = () => {
        setAssessments((currentAssessments) => (
            currentAssessments.filter((assessment) => assessment.id !== assessmentToDelete?.id)
        ));
        setAssessmentToDelete(null);
    }

    if (loading) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <Spinner size="lg" />
                <Text variant="muted">Loading assessments...</Text>
            </Stack>
        );
    }

    return (
        <Stack className="p-4" gap="lg">
            <AssessmentPageHeader
                courseId={courseId}
                onEditWeights={() => setWeightsModalOpen(true)}
            />

            {error && <Alert variant="error">{error}</Alert>}

            <AssessmentTypeFilter
                value={selectedAssessmentType}
                onChange={setSelectedAssessmentType}
            />

            {assessments.length === 0 ? (
                <Text variant="muted" className="text-lg">
                    You currently have no assessments for this course. Choose an option above to add a new assessment for students enrolled in the course.
                </Text>
            ) : (
                <AssessmentsList
                    courseId={courseId}
                    assessments={filteredAssessments}
                    onDeleteAssessment={setAssessmentToDelete}
                />
            )}

            <CourseAssessmentWeightsModal
                isOpen={weightsModalOpen}
                onClose={() => setWeightsModalOpen(false)}
                courseAssessmentTypes={courseAssessmentTypes}
                onUpdated={handleWeightsUpdated}
            />

            <DeleteAssessmentConfirmationModal
                isOpen={Boolean(assessmentToDelete)}
                onClose={() => setAssessmentToDelete(null)}
                deleteAssessment={deleteAssessment}
                assessmentId={assessmentToDelete?.id}
                assessmentName={assessmentToDelete?.title}
                onDeleted={handleAssessmentDeleted}
            />
        </Stack>
    );
}
