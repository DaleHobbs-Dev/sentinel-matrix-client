import { CourseDashboardHeader, CourseList, CoursePageHeader } from "@/features";
import { useState, useEffect } from "react";
import { getActiveCourses } from "@/services";

export const CourseDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getActiveCourses();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-100 rounded-lg shadow-md">
                <CoursePageHeader title="Loading Courses..." />
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-100 rounded-lg shadow-md">
                <CourseDashboardHeader />
                <p className="text-lg text-slate-600">You currently have no active courses. Choose an option above to add a new course or edit the active status of an existing course.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <CourseDashboardHeader />
            <CourseList courses={courses} />
        </div>
    );
}