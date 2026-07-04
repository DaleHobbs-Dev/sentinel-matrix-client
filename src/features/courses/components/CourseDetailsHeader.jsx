import { Button, PageHeader } from "@/components"

export const CourseDetailsHeader = ({ onCreate, onEdit }) => (
    <PageHeader
        title="Course Details"
        actions={
            <>
                <Button type="button" onClick={onCreate}>+ Add a Course</Button>
                <Button type="button" variant="outline" onClick={onEdit}>
                    Edit Course List
                </Button>
            </>
        }
    />
)
