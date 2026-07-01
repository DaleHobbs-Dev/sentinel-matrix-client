import { useNavigate } from "react-router-dom"
import { CoursePageHeader, NewCourseForm } from "@/features"

export const NewCoursePage = () => {
    const navigate = useNavigate()

    return (
            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <CoursePageHeader title="Create a New Course" />
                </div>
                <NewCourseForm
                    onCreated={() => navigate("/courses")}
                    onCancel={() => navigate("/courses")}
                />
            </div>
    )
}
