export const getStudentFullName = (student) => {
  return [student.first_name, student.last_name].filter(Boolean).join(" ");
};

export const formatAcademicStanding = (standing) => {
  if (!standing) {
    return "Unknown";
  }

  return standing
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getCurrentCourseCount = (student) => {
  return student.current_courses?.filter((course) => course.is_active).length ?? 0;
};

export const studentMatchesSearch = (student, searchTerm) => {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return true;
  }

  const searchableValues = [
    getStudentFullName(student),
    student.student_id,
    student.email,
    student.prior_academic_standing,
    student.risk_band,
  ];

  return searchableValues.some((value) =>
    String(value || "").toLowerCase().includes(query)
  );
};
