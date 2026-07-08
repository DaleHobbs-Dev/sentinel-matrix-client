import { useParams } from "react-router-dom"
import { FormPage } from "@/components/ui/FormPage"
import { Text } from "@/components/ui/Text"

export const CourseRosterPage = () => {
    const { courseId } = useParams()

    return (
        <FormPage title="Edit Course Roster">
            <Text variant="muted">
                Roster editing for course {courseId} will be added here.
            </Text>
        </FormPage>
    )
}
