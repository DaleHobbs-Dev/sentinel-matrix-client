// features/courses/components/CourseStatusListItem.jsx
import { Badge, Button, Text } from "@/components";

export function CourseStatusListItem({
  course,
  isSaving,
  disabled,
  onToggle
}) {
  const status = course.is_active ? "Active" : "Inactive";

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-text">
            {course.course_name}
          </h2>

          <Badge variant={course.is_active ? "success" : "inactive"}>
            {status}
          </Badge>
        </div>

        <Text variant="subtle" className="mt-1">
          {course.term}
        </Text>
      </div>

      <Button
        type="button"
        variant={course.is_active ? "danger" : "primary"}
        disabled={disabled}
        onClick={() => onToggle(course)}
      >
        {isSaving
          ? "Saving..."
          : course.is_active
            ? "Make Inactive"
            : "Make Active"}
      </Button>
    </div>
  );
}