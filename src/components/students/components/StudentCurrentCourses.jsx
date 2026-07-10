import { Text } from "@/components/ui/Text"

export const StudentCurrentCourses = ({ courses = [] }) => (
    <section>
        <Text as="h2" className="mb-3 text-xl font-semibold">
            Current Courses
        </Text>
        {courses.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                    >
                        <Text className="font-medium">
                            {course.course_name}
                        </Text>
                        <Text variant="muted">
                            {course.is_active ? "Active" : "Inactive"}
                        </Text>
                    </div>
                ))}
            </div>
        ) : (
            <Text variant="muted">
                This student is not currently enrolled in any courses.
            </Text>
        )}
    </section>
)
