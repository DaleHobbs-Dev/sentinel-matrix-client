import { CourseCard } from "./CourseCard"
import { Text } from "@/components"

export const CourseList = ({ courses = [], user, onCourseClick }) => {
    if (courses.length === 0) {
        return <Text variant="muted">You do not have any active courses yet.</Text>
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map(course => (
                <div
                    key={course.id}
                    onClick={() => onCourseClick?.(course)}
                    className={onCourseClick ? "cursor-pointer" : ""}
                >
                    <CourseCard course={course} user={user} />
                </div>
            ))}
        </div>
    )
}
