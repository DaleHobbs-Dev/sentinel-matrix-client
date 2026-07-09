import { Button, PageHeader, ButtonGroup } from "@/components"

export const CourseRosterHeader = ({ course, courseId, onAddStudents }) => (
    <PageHeader
        title={course?.course_name || "Course Roster"}
        description={course?.description}
        actions={
            <ButtonGroup>
                <Button type="button" variant="secondary" to={`/courses/${courseId}`}>
                    Course Home
                </Button>
                <Button type="button" variant="primary" onClick={onAddStudents}>
                    Add Students to Course
                </Button>
            </ButtonGroup>
        }
    />
)
