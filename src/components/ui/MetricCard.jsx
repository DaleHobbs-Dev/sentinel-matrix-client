import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Text } from "./Text"

export function MetricCard({ title, value, description, tone = "default", children }) {
    const toneClasses = {
        default: "text-gray-900 dark:text-gray-100",
        success: "text-green-700 dark:text-green-300",
        warning: "text-yellow-700 dark:text-yellow-300",
        danger: "text-red-700 dark:text-red-300",
        primary: "text-primary dark:text-primary-lighter",
    }

    return (
        <Card className="h-full">
            <CardHeader className="mb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="gap-2">
                <div className={`text-3xl font-bold ${toneClasses[tone] || toneClasses.default}`}>
                    {value}
                </div>
                {description && <Text variant="subtle">{description}</Text>}
                {children}
            </CardContent>
        </Card>
    )
}
