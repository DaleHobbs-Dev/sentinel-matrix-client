import { useNavigate } from "react-router-dom"
import { Layout } from "@/components/ui"
import { NewCourseForm } from "@/components/courses/NewCourseForm"

export const NewCourse = () => {
    const navigate = useNavigate()

    return (
        <Layout>
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 text-2xl font-bold">Create a New Course</h1>
                <NewCourseForm
                    onCreated={() => navigate("/courses")}
                    onCancel={() => navigate("/courses")}
                />
            </div>
        </Layout>
    )
}
