// Takes a course object as a prop and displays its name, description, instructor, and number of students in a card format.
import { Link } from "react-router-dom"

export const CourseCard = ({ course, user }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            {course.course_image_url && (
                <div className="mb-4">
                    <img src={course.course_image_url} alt="" className="w-full h-48 object-cover rounded-lg" />
                </div>
            )}
            <div className="flex justify-between items-center">
                {user && <span className="text-sm text-gray-500">Instructor: {user.first_name} {user.last_name}</span>}
                {/* <span className="text-sm text-gray-500">Students: {course.students_count}</span> */}
            </div>
            <Link
                to={`/courses/${course.id}`}
                className="mt-4 inline-block font-medium text-primary hover:text-primary-dark"
            >
                View Course Details
            </Link>
        </div>
    );
}
