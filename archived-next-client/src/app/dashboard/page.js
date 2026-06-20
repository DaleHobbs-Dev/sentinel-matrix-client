import { Layout, PageHeader, StatCard, DashboardSection, Card } from "../../components"

export default function DashboardPage() {
  return (
    <Layout>
      <PageHeader
        title="Dashboard"
        description="Monitor course-level student risk indicators."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Courses" value="0" />
        <StatCard label="Total Students" value="0" />
        <StatCard label="High Risk" value="0" />
        <StatCard label="Moderate Risk" value="0" />
      </div>

      <div className="mt-8">
        <DashboardSection title="At-Risk Students">
          <Card>
            <p className="text-gray-500">Student risk data will appear here after connecting the Django API.</p>
          </Card>
        </DashboardSection>
      </div>
    </Layout>
  )
}
