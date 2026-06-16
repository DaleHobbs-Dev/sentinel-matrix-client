import { Layout, PageHeader, EmptyState } from "@/components"

export default function StudentsPage() {
  return (
    <Layout>
      <PageHeader
        title="Students"
        description="Manage student records and enrollments."
        actionLabel="Add Student"
        actionHref="/students/new"
      />

      <EmptyState
        title="No students yet"
        message="Add students before enrolling them in courses."
        actionLabel="Add Student"
        actionHref="/students/new"
      />
    </Layout>
  )
}
