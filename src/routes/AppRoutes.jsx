import { Route, Routes } from "react-router-dom"
import { Login, Register, Dashboard, Courses, Students } from "@/pages"
import { Authorized } from "./Authorized"
import { Layout, CourseDashboard, CourseDetailsPage, CourseFormPage, ActiveCourseListEditorPage, StudentDirectory } from "@/components"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route element={<Layout />}>
          {/* Dashboard routes */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Courses routes */}
          <Route path="courses" element={<Courses />}>
            <Route index element={<CourseDashboard />} />
            <Route path=":courseId" element={<CourseDetailsPage />} />
            <Route path="new" element={<CourseFormPage />} />
            <Route path=":courseId/edit" element={<CourseFormPage />} />
            <Route path="courselisteditor" element={<ActiveCourseListEditorPage />} />
            {/* <Route path=":courseId/roster" element={<EditCourseRosterPage />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:studentId" element={<StudentDetail />} />
            <Route path="/analytics" element={<Analytics />} /> */}
          </Route>

          {/* Students routes */}
          <Route path="students" element={<Students />}>
            <Route index element={<StudentDirectory />} />
            {/* <Route path=":studentId" element={<StudentDetail />} /> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
