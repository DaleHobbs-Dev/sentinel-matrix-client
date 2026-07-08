import { Button, PageHeader, ButtonGroup } from "@/components"

export const CourseDashboardHeader = () => {

    return (
        <PageHeader
            title="Current Courses"
            actions={
              <ButtonGroup>
                <Button type="button" to="/courses/new">+ Add a Course</Button>
                <Button type="button" variant="primary" to="/courses/courselisteditor">
                    Edit Course List
                </Button>
              </ButtonGroup>
            }
        />
    )
}
