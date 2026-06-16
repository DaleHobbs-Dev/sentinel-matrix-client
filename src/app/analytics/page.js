import { Layout, PageHeader, Card } from "@/components"

export default function AnalyticsPage() {
  return (
    <Layout>
      <PageHeader
        title="Analytics"
        description="Review aggregate course and student risk trends."
      />

      <Card>
        <p className="text-gray-500">Analytics widgets will appear here.</p>
      </Card>
    </Layout>
  )
}
