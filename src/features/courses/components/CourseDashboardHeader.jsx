import { Button, PageHeader } from "@/components"
import { useNavigate } from "react-router-dom"

export const CourseDashboardHeader = () => {
    const navigate = useNavigate()

    return (
        <PageHeader
            title="Current Courses"
            actions={
              <>
                <Button type="button" onClick={() => navigate("/courses/new")}>+ Add a Course</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/courses/courselisteditor")}>
                    Edit Course List
                </Button>
              </>
            }
        />
    )
}
