// Barrel file to re-export all services from the src/services directory

// API configuration
export { API_BASE_URL, TOKEN_KEY, fetchJSON, postJSON, patchJSON, deleteJSON } from './api.config.js'

// Profile services
export { getUserProfile } from './userService.js'

// Course services
export { getCourses, getActiveCourses, getCourseById, getCourseDashboard, createCourse, updateCourse, deleteCourse } from './courseService.js'

// Student services
export { getStudents, getStudentByStudentId } from './studentService.js'

// Assessment-Types services
export { getAssessmentTypes, getCourseAssessmentTypes, updateCourseAssessmentType, updateCourseAssessmentTypes } from './assessmentTypeService.js'

// Assessment services
export { getAssessments, getAssessmentById, getAssessmentByCourseId, createAssessment, updateAssessment, deleteAssessment } from './assessmentService.js'
