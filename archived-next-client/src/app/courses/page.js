import { Layout, PageHeader, EmptyState } from "../../components"

export default function CoursesPage() {
  return (
    <Layout>
      <PageHeader
        title="Courses"
        description="Create and manage instructor-owned courses."
        actionLabel="Create Course"
        actionHref="/courses/new"
      />

      <EmptyState
        title="No courses yet"
        message="Create your first course to start enrolling students."
        actionLabel="Create Course"
        actionHref="/courses/new"
      />
    </Layout>
  )
}
