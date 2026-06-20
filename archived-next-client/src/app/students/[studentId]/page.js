import { Layout, PageHeader, Card } from "../../../components"

export default function StudentDetailPage() {
  return (
    <Layout>
      <PageHeader
        title="Student Detail"
        description="View academic standing, enrollments, and risk indicators."
      />

      <Card>
        <p className="text-gray-500">Student profile details will appear here.</p>
      </Card>
    </Layout>
  )
}
