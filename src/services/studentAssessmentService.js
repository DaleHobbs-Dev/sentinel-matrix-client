import { fetchJSON, postJSON, patchJSON, deleteJSON } from "@/services"

export const getStudentAssessmentsByEnrollmentID = (enrollmentId) => {
    return fetchJSON(`student-assessments?enrollment_id=${enrollmentId}`);
}

export const createStudentAssessment = (studentAssessment) => {
    return postJSON("student-assessments", studentAssessment);
}

export const updateStudentAssessment = (studentAssessmentId, studentAssessment) => {
    return patchJSON(`student-assessments/${studentAssessmentId}`, studentAssessment);
}

export const deleteStudentAssessment = (studentAssessmentId) => {
    return deleteJSON(`student-assessments/${studentAssessmentId}`);
}