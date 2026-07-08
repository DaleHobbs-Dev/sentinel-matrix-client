import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/ButtonGroup"
import { PageHeader } from "@/components/ui/PageHeader"

export const CourseHomeHeader = ({ course, courseId }) => (
    <PageHeader
        title={course?.course_name || "Course Home"}
        description={course?.description}
        actions={
            <ButtonGroup>
                <Button type="button" to={`/courses/${courseId}/roster`}>
                    Edit Course Roster
                </Button>
                <Button type="button" variant="outline" to={`/courses/${courseId}/assessments/new`}>
                    Record New Assessment Data
                </Button>
            </ButtonGroup>
        }
    />
)
