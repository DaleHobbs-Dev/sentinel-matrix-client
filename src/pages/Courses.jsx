import { Outlet } from "react-router-dom";

export const Courses = () => {
  // const { user, loading } = useUser();
  // const [courses, setCourses] = useState([]);
  // const [loadingCourses, setLoadingCourses] = useState(true);
  // const [isEditorOpen, setIsEditorOpen] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const data = await getActiveCourses();
  //       setCourses(data);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     } finally {
  //       setLoadingCourses(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // const handleCourseUpdated = (updatedCourse) => {
  //   setCourses(currentCourses => {
  //     if (!updatedCourse.is_active) {
  //       return currentCourses.filter(course => course.id !== updatedCourse.id);
  //     }

  //     return currentCourses.map(course =>
  //       course.id === updatedCourse.id ? updatedCourse : course
  //     );
  //   });
  // };

  return (
    <section>
      <Outlet />
    </section>
  );
}
