import { Button } from "@/components/ui"

export const CoursesHeader = ({ onCreate, onEdit }) => (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Current Courses</h1>
        <div className="flex gap-3">
            <Button type="button" onClick={onCreate}>+ Add a Course</Button>
            <Button type="button" variant="outline" onClick={onEdit}>
                Edit Course List
            </Button>
        </div>
    </header>
)
