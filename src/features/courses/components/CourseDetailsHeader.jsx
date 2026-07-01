import { Button } from "@/components"
import { CoursePageHeader } from "@/features"

export const CourseDetailsHeader = ({ onCreate, onEdit }) => (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <CoursePageHeader title="Course Details" />
        <div className="flex gap-3">
            <Button type="button" onClick={onCreate}>+ Add a Course</Button>
            <Button type="button" variant="outline" onClick={onEdit}>
                Edit Course List
            </Button>
        </div>
    </header>
)
