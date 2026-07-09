import { fetchJSON, patchJSON } from "@/services"

export const getAssessmentTypes = () => fetchJSON("assessment-types")

export const getCourseAssessmentTypes = (courseId) => fetchJSON(`course-assessment-types?course_id=${courseId}`)

export const updateCourseAssessmentType = (courseAssessmentTypeId, assessmentTypeData) => (
    patchJSON(`course-assessment-types/${courseAssessmentTypeId}`, assessmentTypeData)
)

export const updateCourseAssessmentTypes = (assessmentTypes) => Promise.all(
    assessmentTypes.map(({ id, ...assessmentTypeData }) => updateCourseAssessmentType(id, assessmentTypeData))
)
