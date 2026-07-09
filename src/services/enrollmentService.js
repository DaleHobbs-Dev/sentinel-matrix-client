import { fetchJSON, postJSON, deleteJSON } from "@/services"

export const getEnrollmentByCourseId = (courseId) => {
    return fetchJSON(`enrollments?course_id=${courseId}`);
}

export const getEnrollmentByCourseIdAndStudentId = (courseId, studentId) => {
    return fetchJSON(`enrollments?course_id=${courseId}&student_id=${studentId}`);
}

export const createEnrollment = (enrollment) => {
    return postJSON("enrollments", enrollment);
}

export const deleteEnrollment = (enrollmentId) => {
    return deleteJSON(`enrollments/${enrollmentId}`);
}
