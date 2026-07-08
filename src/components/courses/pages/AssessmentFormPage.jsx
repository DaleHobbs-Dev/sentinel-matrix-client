import { useParams } from "react-router-dom"
import { FormPage } from "@/components/ui/FormPage"
import { Text } from "@/components/ui/Text"

export const AssessmentFormPage = () => {
    const { courseId } = useParams()

    return (
        <FormPage title="Record New Assessment Data">
            <Text variant="muted">
                Assessment recording for course {courseId} will be added here.
            </Text>
        </FormPage>
    )
}
