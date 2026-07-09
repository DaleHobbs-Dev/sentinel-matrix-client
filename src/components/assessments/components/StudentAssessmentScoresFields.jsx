import { useEffect, useState } from "react"
import { Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from "@/components"
import { getStudentFullName } from "@/components/students/utils/studentFormatters"

const getExistingScoreRecords = (assessment) => (
    assessment?.student_scores
    || assessment?.student_assessments
    || assessment?.scores
    || []
)

const findExistingScore = (student, scoreRecords) => {
    return scoreRecords.find((scoreRecord) => {
        const recordStudentId = scoreRecord.student_id ?? scoreRecord.student?.id ?? scoreRecord.enrollment?.student?.id
        const recordEnrollmentId = scoreRecord.enrollment_id ?? scoreRecord.enrollment?.id

        return recordStudentId === student.id || recordEnrollmentId === student.enrollment_id
    })
}

const formatMaximumScore = (value) => {
    if (value === null || value === undefined || value === "") {
        return "N/A"
    }

    return Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })
}

export const StudentAssessmentScoresFields = ({
    assessment,
    students = [],
    maxScore,
    onScoresChange,
}) => {
    const [scoresByStudentId, setScoresByStudentId] = useState(() => {
        const scoreRecords = getExistingScoreRecords(assessment)

        return students.reduce((scoresByStudentId, student) => {
            const existingScore = findExistingScore(student, scoreRecords)

            scoresByStudentId[student.id] = existingScore?.score ?? ""
            return scoresByStudentId
        }, {})
    })

    useEffect(() => {
        const scoreRecords = students.map((student) => ({
            student_id: student.id,
            enrollment_id: student.enrollment_id ?? student.enrollment?.id,
            score: scoresByStudentId[student.id] === "" ? null : scoresByStudentId[student.id],
        }))

        onScoresChange?.(scoreRecords)
    }, [onScoresChange, scoresByStudentId, students])

    const handleScoreChange = (studentId, value) => {
        setScoresByStudentId((currentScores) => ({
            ...currentScores,
            [studentId]: value,
        }))
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4">
                <Text as="h2" className="text-lg font-semibold">Student Scores</Text>
                <Text variant="muted">Enter a score for each student enrolled in this course.</Text>
                <Text variant="muted" className="mt-1">
                    Maximum score allowed: {formatMaximumScore(maxScore)}
                </Text>
            </div>

            {students.length === 0 ? (
                <Text variant="muted">There are no students enrolled in this course.</Text>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>
                                    <div className="font-medium">{getStudentFullName(student)}</div>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        min="0"
                                        max={maxScore || undefined}
                                        step="0.01"
                                        value={scoresByStudentId[student.id] ?? ""}
                                        onChange={(event) => handleScoreChange(student.id, event.target.value)}
                                        placeholder="Score"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
