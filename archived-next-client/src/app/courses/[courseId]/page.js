import { Layout, PageHeader, Card } from "../../../components"

export default function CourseDetailPage() {
  return (
    <Layout>
      <PageHeader
        title="Course Detail"
        description="View enrolled students and course risk indicators."
      />

      <Card>
        <p className="text-gray-500">Course roster will appear here.</p>
      </Card>
    </Layout>
  )
}
