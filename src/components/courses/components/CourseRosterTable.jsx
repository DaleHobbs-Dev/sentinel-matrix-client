import { useNavigate } from "react-router-dom"
import { StudentList } from "@/components/students/components/StudentList"
import { courseRosterColumns } from "../utils/courseRosterColumns"

export const CourseRosterTable = ({ courseId, students = [] }) => {
    const navigate = useNavigate()

    const navigateToStudentCourseDetails = (student) => {
        navigate(`/courses/${courseId}/students/${student.id}`)
    }

    return (
        <StudentList
            students={students}
            columns={courseRosterColumns}
            emptyMessage="There are no students enrolled in this course."
            onRowClick={navigateToStudentCourseDetails}
        />
    )
}
