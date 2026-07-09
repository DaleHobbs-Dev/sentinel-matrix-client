import { useNavigate } from "react-router-dom"
import { StudentList } from "@/components"
import { getCourseRosterColumns } from "../utils/courseRosterColumns.jsx"

export const CourseRosterTable = ({
    courseId,
    enrollments,
    students,
    onRemoveStudent,
}) => {
    const navigate = useNavigate()
    const rosterRows = enrollments ?? students ?? []
    const columns = getCourseRosterColumns({ onRemove: onRemoveStudent })

    const navigateToStudentCourseDetails = (enrollment) => {
        const student = enrollment.student ?? enrollment
        navigate(`/courses/${courseId}/students/${student.id}`)
    }

    return (
        <StudentList
            students={rosterRows}
            columns={columns}
            emptyMessage="There are no students enrolled in this course."
            onRowClick={navigateToStudentCourseDetails}
        />
    )
}
