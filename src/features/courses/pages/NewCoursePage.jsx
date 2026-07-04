import { useNavigate } from "react-router-dom"
import { NewCourseForm } from "@/features"
import { FormPage } from "@/components"

export const NewCoursePage = () => {
    const navigate = useNavigate()

    return (
            <FormPage title="Create a New Course">
                <NewCourseForm
                    onCreated={() => navigate("/courses")}
                    onCancel={() => navigate("/courses")}
                />
            </FormPage>
    )
}
