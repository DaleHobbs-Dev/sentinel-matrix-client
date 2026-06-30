import { CourseCard } from "./CourseCard"

export const CourseList = ({ courses = [], user, onCourseClick }) => {
    if (courses.length === 0) {
        return <p className="text-gray-600">You do not have any active courses yet.</p>
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
