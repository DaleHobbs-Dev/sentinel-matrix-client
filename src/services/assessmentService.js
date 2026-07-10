import { fetchJSON, postJSON, patchJSON, deleteJSON } from "@/services"

export const getAssessments = () => fetchJSON("assessments")

export const getAssessmentById = (assessmentId) => fetchJSON(`assessments/${assessmentId}`)

export const getAssessmentByCourseId = (courseId) => fetchJSON(`assessments?course_id=${courseId}`)

export const createAssessment = (assessmentData) => postJSON("assessments", assessmentData)

export const updateAssessment = (assessmentId, assessmentData) => patchJSON(`assessments/${assessmentId}`, assessmentData)


export const deleteAssessment = (assessmentId) => deleteJSON(`assessments/${assessmentId}`)