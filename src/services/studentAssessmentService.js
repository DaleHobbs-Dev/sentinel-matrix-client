import { fetchJSON, postJSON, patchJSON, deleteJSON } from "@/services"

export const getStudentAssessmentsByEnrollmentID = (enrollmentId) => {
    return fetchJSON(`student-assessments?enrollment_id=${enrollmentId}`);
}

export const getStudentAssessmentById = (studentAssessmentId) => {
    return fetchJSON(`student-assessments/${studentAssessmentId}`);
}

export const getAssessmentByIdForStudentAssessments = (assessmentId) => fetchJSON(`assessments/${assessmentId}/student-assessments`)

export const createStudentAssessment = (studentAssessment) => {
    return postJSON("student-assessments", studentAssessment);
}

export const updateStudentAssessment = (studentAssessmentId, studentAssessment) => {
    return patchJSON(`student-assessments/${studentAssessmentId}`, studentAssessment);
}

export const updateAssessmentForStudentAssessments = (assessmentId, assessmentData) => patchJSON(`assessments/${assessmentId}/student-assessments`, assessmentData)

export const deleteStudentAssessment = (studentAssessmentId) => {
    return deleteJSON(`student-assessments/${studentAssessmentId}`);
}
