// Takes a course object as a prop and displays its name, description, instructor, and number of students in a card format.
import { Text, Button, ButtonGroup } from "@/components"

export const CourseCard = ({ course, user }) => {

    return (
        <div className="rounded-lg p-4 transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
            <Text variant="muted" className="mb-4">{course.description}</Text>
            {course.course_image_url && (
                <div className="mb-4">
                    <img src={course.course_image_url} alt="" className="w-full h-48 object-cover rounded-lg" />
                </div>
            )}
            <div className="flex justify-between items-center">
                {user && <span className="text-sm text-gray-500">Instructor: {user.first_name} {user.last_name}</span>}
                {/* <span className="text-sm text-gray-500">Students: {course.students_count}</span> */}
            </div>
            {/* Add buttons for viewing and editing the course */}
            <ButtonGroup className="mt-4">
                {/* Use stopPropagation to prevent the click event from bubbling up */}
                <Button type="button" variant="primary" to={`/courses/${course.id}`} onClick={(event) => { event.stopPropagation()}}>View Course</Button>
                <Button type="button" variant="primary" to={`/courses/${course.id}/edit`} onClick={(event) => { event.stopPropagation()}}>
                    Edit Course Information
                </Button>
            </ButtonGroup>
        </div>
    );
}
