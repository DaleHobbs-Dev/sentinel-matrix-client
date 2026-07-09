import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Alert,
    Button,
    DashboardMetricsGrid,
    PageHeader,
    RiskStudentsTable,
    Spinner,
    Stack,
    Text,
} from "@/components"
import { useUser } from "@/contexts/userContext"
import { getDashboard } from "@/services"
import {
    getRiskStudentCourseId,
    getRiskStudentStudentId,
} from "../utils/dashboardFormatters"

export const InstructorDashboardPage = () => {
    const navigate = useNavigate()
    const { user, loading: userLoading } = useUser()
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false

        const fetchDashboard = async () => {
            setLoading(true)
            setError(null)

            try {
                const dashboardData = await getDashboard()

                if (!ignore) {
                    setDashboard(dashboardData)
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching instructor dashboard:", err)
                    setDashboard(null)
                    setError("Unable to load your dashboard right now.")
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        fetchDashboard()

        return () => {
            ignore = true
        }
    }, [])

    const handleRiskStudentClick = (riskStudent) => {
        const courseId = getRiskStudentCourseId(riskStudent)
        const studentId = getRiskStudentStudentId(riskStudent)

        if (courseId && studentId) {
            navigate(`/courses/${courseId}/students/${studentId}`)
        }
    }

    if (loading || userLoading) {
        return (
            <Stack className="items-center justify-center rounded-lg bg-surface-muted p-8 shadow-md">
                <Spinner size="lg" />
                <Text variant="muted">Loading dashboard...</Text>
            </Stack>
        )
    }

    return (
        <Stack className="p-4" gap="lg">
            <PageHeader
                title="Dashboard"
                description={
                    user
                        ? `Welcome back, ${user.first_name}. Monitor active courses and students who need attention.`
                        : "Monitor active courses and students who need attention."
                }
                actions={
                    <Button to="/courses" variant="secondary">
                        View Courses
                    </Button>
                }
            />

            {error && <Alert variant="error">{error}</Alert>}

            {dashboard && (
                <>
                    <DashboardMetricsGrid dashboard={dashboard} />

                    <section>
                        <div className="mb-3">
                            <Text
                                as="h2"
                                className="text-xl font-semibold text-primary-dark dark:text-primary-light"
                            >
                                At-Risk Students
                            </Text>
                            <Text variant="muted">
                                High risk students are listed first, followed by
                                moderate risk students.
                            </Text>
                        </div>
                        <RiskStudentsTable
                            riskStudents={dashboard.risk_students ?? []}
                            onRiskStudentClick={handleRiskStudentClick}
                        />
                    </section>
                </>
            )}
        </Stack>
    )
}
