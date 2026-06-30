import { Layout, CourseList, CoursesHeader, EmptyCoursesView } from "@/components/ui";
import { CourseListEditor } from "@/components/courses/CourseListEditor";
import { CourseModal } from "@/components/courses/CourseModal";
import { useUser } from "@/contexts/userContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveCourses } from "@/services";

export const Courses = () => {
  const { user, loading } = useUser();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getActiveCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(currentCourses => {
      if (!updatedCourse.is_active) {
        return currentCourses.filter(course => course.id !== updatedCourse.id);
      }

      return currentCourses.map(course =>
        course.id === updatedCourse.id ? updatedCourse : course
      );
    });
  };

  return (
    <Layout>
        <main className="flex-1 p-4">
            <CoursesHeader
              onCreate={() => navigate("/courses/new")}
              onEdit={() => setIsEditorOpen(true)}
            />
            {loading || !user || loadingCourses ? (
                <p>Loading...</p>
            ) : courses.length === 0 ? (
                <EmptyCoursesView />
            ) :  (
                <CourseList courses={courses} user={user} />
            )}

            <CourseModal
              isOpen={isEditorOpen}
              title="Edit Course List"
              onClose={() => setIsEditorOpen(false)}
            >
              <CourseListEditor
                courses={courses}
                onCourseUpdated={handleCourseUpdated}
              />
            </CourseModal>
        </main>
    </Layout>
  );
}
