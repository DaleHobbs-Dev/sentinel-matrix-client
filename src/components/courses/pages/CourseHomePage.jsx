import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CourseHomeHeader } from "../components/CourseHomeHeader"
import { CourseMetricsGrid } from "../components/CourseMetricsGrid"
import { CourseRosterTable } from "../components/CourseRosterTable"
import { Spinner } from "@/components/ui/Spinner"
import { Stack } from "@/components/ui/Stack"
import { Text } from "@/components/ui/Text"
import { getCourseDashboard } from "@/services"

export const CourseHomePage = () => {
  const { courseId } = useParams()
  const [courseDashboard, setCourseDashboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchCourseDashboard = async () => {
      setIsLoading(true)

      try {
        const data = await getCourseDashboard(courseId)

        if (!ignore) {
          setCourseDashboard(data)
          setError(null)
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching course dashboard:", err)
          setCourseDashboard(null)
          setError("Unable to load this course dashboard right now.")
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchCourseDashboard()

    return () => {
      ignore = true
    }
  }, [courseId])

  if (isLoading) {
    return (
      <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
        <Spinner size="lg" />
        <Text variant="muted">Loading course dashboard...</Text>
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack className="p-4">
        <CourseHomeHeader courseId={courseId} />
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <Text variant="error">{error}</Text>
        </div>
      </Stack>
    )
  }

  return (
    <Stack className="p-4" gap="lg">
      <CourseHomeHeader course={courseDashboard} courseId={courseId} />
      <CourseMetricsGrid metrics={courseDashboard.metrics} />
      <Stack gap="compact">
        <Text as="h2" className="text-xl font-semibold">
          Course Roster
        </Text>
        <CourseRosterTable
          courseId={courseId}
          students={courseDashboard.students}
        />
      </Stack>
    </Stack>
  )
}
