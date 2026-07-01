import { Button } from "@/components"
import { CoursePageHeader } from "@/features"
import { useNavigate } from "react-router-dom"

export const CourseDashboardHeader = () => {
    const navigate = useNavigate()

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <CoursePageHeader title="Current Courses" />
            <div className="flex gap-3">
                <Button type="button" onClick={() => navigate("/courses/new")}>+ Add a Course</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/courses/courselisteditor")}>
                Edit Course List
            </Button>
        </div>
    </header>
)
}
