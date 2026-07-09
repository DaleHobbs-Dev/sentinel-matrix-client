import { Button, PageHeader, ButtonGroup } from "@/components"

export const AssessmentPageHeader = ({ courseId, onEditWeights }) => {

    return (
        <PageHeader
            title="Course Assessments"
            description="View, filter, and manage assessment records for this course."
            actions={
              <ButtonGroup>
                {onEditWeights && (
                    <Button type="button" variant="primary" onClick={onEditWeights}>
                        Edit Course Assessment Weights
                    </Button>
                )}
                <Button type="button" variant="primary" to={`/courses/${courseId}/assessments/new`}>
                    Record New Assessment Data
                </Button>
            </ButtonGroup>
            }
        />
    )
}
