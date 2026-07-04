import { Card, CardContent } from "./Card"
import { Text } from "./Text"

export function AuthCard({ subtitle, children, footer }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-800">Sentinel Matrix</h1>
                    {subtitle && (
                        <Text variant="description" className="mt-2">{subtitle}</Text>
                    )}
                </div>
                <Card>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
                {footer && (
                    <div className="text-center mt-4 text-sm text-gray-600">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
