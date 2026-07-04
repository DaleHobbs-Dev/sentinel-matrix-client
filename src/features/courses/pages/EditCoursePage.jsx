import { useNavigate } from "react-router-dom"
import { EditCourseForm } from "@/features"
import { FormPage } from "@/components"

export const EditCoursePage = () => {
    const navigate = useNavigate()

    return (
            <FormPage title="Edit Course">
                <EditCourseForm
                    onUpdated={() => navigate("/courses")}
                    onCancel={() => navigate("/courses")}
                />
            </FormPage>
    )
}
