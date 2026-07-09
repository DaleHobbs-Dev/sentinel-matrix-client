import { Button, PageHeader, ButtonGroup } from "@/components"

export const CourseHomeHeader = ({ course, courseId }) => (
    <PageHeader
        title={course?.course_name || "Course Home"}
        description={course?.description}
        actions={
            <ButtonGroup>
                <Button type="button" variant="primary" to={`/courses/${courseId}/roster`}>
                    Edit Course Roster
                </Button>
                <Button type="button" variant="primary" to={`/courses/${courseId}/assessments`}>
                    Course Assessments
                </Button>
            </ButtonGroup>
        }
    />
)
