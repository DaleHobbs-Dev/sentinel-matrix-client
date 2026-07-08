import { fetchJSON } from "@/services"

export const getStudents = () => fetchJSON("students")

export const getStudentByStudentId = (studentId) => fetchJSON(`students?student_id=${studentId}`)