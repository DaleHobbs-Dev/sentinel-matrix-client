import { StudentRiskBadge } from "@/components";
import {
  formatAcademicStanding,
  getCurrentCourseCount,
  getStudentFullName,
} from "./studentFormatters";

export const studentDirectoryColumns = [
  {
    key: "name",
    header: "Student",
    render: (student) => (
      <div>
        <div className="font-medium">{getStudentFullName(student)}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {student.email}
        </div>
      </div>
    ),
  },
  {
    key: "student_id",
    header: "Student ID",
    render: (student) => student.student_id,
  },
  {
    key: "course_count",
    header: "Courses",
    render: (student) => getCurrentCourseCount(student),
  },
  {
    key: "prior_academic_standing",
    header: "Prior Standing",
    render: (student) => formatAcademicStanding(student.prior_academic_standing),
  },
  {
    key: "risk_band",
    header: "Risk Status",
    render: (student) => <StudentRiskBadge riskBand={student.risk_band} />,
  },
];
