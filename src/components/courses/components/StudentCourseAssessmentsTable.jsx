import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table"
import { Button } from "@/components/ui/Button"
import { Text } from "@/components/ui/Text"

const formatScore = (score, maxScore) => {
    if (score === null || score === undefined || score === "") {
        return "Missing"
    }

    const formattedScore = Number(score).toFixed(2)

    if (!maxScore) {
        return formattedScore
    }

    return `${formattedScore} / ${Number(maxScore).toFixed(2)}`
}

const formatDate = (date) => {
    if (!date) {
        return "N/A"
    }

    return new Date(date).toLocaleDateString()
}

export const StudentCourseAssessmentsTable = ({
    assessmentScores = [],
    markingMissingId,
    onOpenScoreModal,
    onMarkMissing,
}) => {
    if (assessmentScores.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                <Text variant="muted">
                    This course does not have assessments yet.
                </Text>
            </div>
        )
    }

    const sortedAssessmentScores = [...assessmentScores].sort((a, b) => {
        const typeComparison = String(
            a.assessment?.assessment_type_name || "",
        ).localeCompare(String(b.assessment?.assessment_type_name || ""))

        if (typeComparison !== 0) {
            return typeComparison
        }

        return String(a.assessment?.title || "").localeCompare(
            String(b.assessment?.title || ""),
        )
    })

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Assessment Type</TableHead>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Completed</TableHead>
                        {onMarkMissing && <TableHead>Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedAssessmentScores.map((assessmentScore) => (
                        <TableRow key={assessmentScore.assessment.id}>
                            <TableCell>
                                {assessmentScore.assessment?.assessment_type_name ||
                                    "N/A"}
                            </TableCell>
                            <TableCell>
                                {assessmentScore.assessment?.title || "N/A"}
                            </TableCell>
                            <TableCell>
                                {assessmentScore.studentAssessment?.is_missing
                                    ? "Missing"
                                    : assessmentScore.studentAssessment
                                        ? formatScore(
                                            assessmentScore.studentAssessment.score,
                                            assessmentScore.assessment?.max_score,
                                        )
                                        : "No score recorded"}
                            </TableCell>
                            <TableCell>
                                {formatDate(
                                    assessmentScore.studentAssessment
                                        ?.completed_date,
                                )}
                            </TableCell>
                            {(onOpenScoreModal || onMarkMissing) && (
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="px-2 py-1 text-xs"
                                            onClick={() =>
                                                onOpenScoreModal?.(assessmentScore)
                                            }
                                        >
                                            {assessmentScore.studentAssessment?.score
                                                ? "Edit Score"
                                                : "Record Score"}
                                        </Button>
                                        {assessmentScore.studentAssessment
                                            ?.is_missing ? (
                                            <Text variant="muted">
                                                Marked missing
                                            </Text>
                                        ) : assessmentScore.studentAssessment?.score ? null : (
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="px-2 py-1 text-xs"
                                                disabled={
                                                    markingMissingId ===
                                                    assessmentScore.assessment.id
                                                }
                                                onClick={() =>
                                                    onMarkMissing?.(
                                                        assessmentScore,
                                                    )
                                                }
                                            >
                                                {markingMissingId ===
                                                assessmentScore.assessment.id
                                                    ? "Marking..."
                                                    : "Mark as Missing"}
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
