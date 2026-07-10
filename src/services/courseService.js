import { fetchJSON, postJSON, patchJSON, deleteJSON } from "@/services"

export const getCourses = () => fetchJSON("courses")

export const getActiveCourses = () => fetchJSON("courses?is_active=true")

export const getCourseById = (courseId) => fetchJSON(`courses/${courseId}`)

export const createCourse = (courseData) => postJSON("courses", courseData)

export const updateCourse = (courseId, courseData) => patchJSON(`courses/${courseId}`, courseData)

export const deleteCourse = (courseId) => deleteJSON(`courses/${courseId}`)
