import { Text, CourseCard } from "@/components"
import { useNavigate } from "react-router-dom"

export const CourseList = ({ courses = [], user, onCourseClick }) => {
    const navigate = useNavigate()

    if (courses.length === 0) {
        return <Text variant="muted">You do not have any active courses yet.</Text>
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map(course => (
                <div
                    key={course.id}
                    onClick={() => onCourseClick ? onCourseClick(course) : navigate(`/courses/${course.id}`)}
                    className={"cursor-pointer rounded-lg bg-surface-muted p-4 shadow-md transition-transform hover:scale-[1.02]"}
                >
                    <CourseCard course={course} user={user} />
                </div>
            ))}
        </div>
    )
}
