import { PageHeader, Stack, Text, CourseDashboardHeader, CourseList  } from "@/components";
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
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <PageHeader title="Loading Courses..." />
            </Stack>
        );
    }

    if (courses.length === 0) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <CourseDashboardHeader />
                <Text variant="muted" className="text-lg">You currently have no active courses. Choose an option above to add a new course or edit the active status of an existing course.</Text>
            </Stack>
        );
    }

    return (
        <Stack className="p-4">
            <CourseDashboardHeader />
            <CourseList courses={courses} />
        </Stack>
    );
}
