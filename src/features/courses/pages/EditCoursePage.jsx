import { useNavigate } from "react-router-dom"
import { CoursePageHeader, EditCourseForm } from "@/features"

export const EditCoursePage = () => {
    const navigate = useNavigate()

    return (
            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <CoursePageHeader title="Edit Course" />
                </div>
                <EditCourseForm
                    onUpdated={() => navigate("/courses")}
                    onCancel={() => navigate("/courses")}
                />
            </div>
    )
}
