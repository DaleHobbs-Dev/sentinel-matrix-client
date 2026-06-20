import { Route, Routes } from "react-router-dom"
import { SampleLandingPage } from "../pages/LandingPageTest"
// import { Login } from "../pages/Login"
// import { Register } from "../pages/Register"
// import { Dashboard } from "../pages/Dashboard"
// import { Courses } from "../pages/Courses"
// import { CourseDetail } from "../pages/CourseDetail"
// import { Students } from "../pages/Students"
// import { StudentDetail } from "../pages/StudentDetail"
// import { Analytics } from "../pages/Analytics"
// import { Authorized } from "./Authorized"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="*" element={<SampleLandingPage />} />
      {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Authorized />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:studentId" element={<StudentDetail />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route> */}
    </Routes>
  )
}
