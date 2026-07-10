import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Text,
    getStudentFullName,
} from "@/components";
import {
    findExistingScore,
    formatMaximumScore,
    getAssessmentScoreRecords,
} from "../utils/assessmentScoreUtils";

const getInitialScoreValue = (student, existingScore) =>
    existingScore?.score ?? student.score ?? "";

const getInitialMissingValue = (student, existingScore) =>
    Boolean(existingScore?.is_missing ?? student.is_missing);

const getInitialStudentAssessmentId = (student, existingScore) =>
    existingScore?.id ?? student.student_assessment_id;

export const StudentAssessmentScoresFields = ({
    assessment,
    students = [],
    maxScore,
    onScoresChange,
    onMarkMissing,
    markingMissingStudentId,
}) => {
    const [scoresByStudentId, setScoresByStudentId] = useState(() => {
        const scoreRecords = getAssessmentScoreRecords(assessment);

        return students.reduce((scoresByStudentId, student) => {
            const existingScore = findExistingScore(student, scoreRecords);

            scoresByStudentId[student.id] = getInitialScoreValue(
                student,
                existingScore,
            );
            return scoresByStudentId;
        }, {});
    });
    const [missingByStudentId, setMissingByStudentId] = useState(() => {
        const scoreRecords = getAssessmentScoreRecords(assessment);

        return students.reduce((missingByStudentId, student) => {
            const existingScore = findExistingScore(student, scoreRecords);

            missingByStudentId[student.id] = getInitialMissingValue(
                student,
                existingScore,
            );
            return missingByStudentId;
        }, {});
    });
    const [studentAssessmentIdsByStudentId, setStudentAssessmentIdsByStudentId] =
        useState(() => {
            const scoreRecords = getAssessmentScoreRecords(assessment);

            return students.reduce((studentAssessmentIdsByStudentId, student) => {
                const existingScore = findExistingScore(student, scoreRecords);

                studentAssessmentIdsByStudentId[student.id] =
                    getInitialStudentAssessmentId(student, existingScore);
                return studentAssessmentIdsByStudentId;
            }, {});
        });

    useEffect(() => {
        const existingScoreRecords = getAssessmentScoreRecords(assessment);
        const scoreRecords = students.map((student) => ({
            student_id: student.id,
            enrollment_id: student.enrollment_id ?? student.enrollment?.id,
            student_assessment_id:
                studentAssessmentIdsByStudentId[student.id] ??
                findExistingScore(student, existingScoreRecords)?.id,
            is_missing: Boolean(missingByStudentId[student.id]),
            score:
                scoresByStudentId[student.id] === ""
                    ? null
                    : scoresByStudentId[student.id],
        }));

        onScoresChange?.(scoreRecords);
    }, [
        assessment,
        missingByStudentId,
        onScoresChange,
        scoresByStudentId,
        studentAssessmentIdsByStudentId,
        students,
    ]);

    const handleScoreChange = (studentId, value) => {
        setScoresByStudentId((currentScores) => ({
            ...currentScores,
            [studentId]: value,
        }));

        if (value !== "") {
            setMissingByStudentId((currentMissing) => ({
                ...currentMissing,
                [studentId]: false,
            }));
        }
    };

    const handleMissingClick = async (studentScoreRecord) => {
        const updatedStudentAssessment = await onMarkMissing(studentScoreRecord);

        if (!updatedStudentAssessment) {
            return;
        }

        setMissingByStudentId((currentMissing) => ({
            ...currentMissing,
            [studentScoreRecord.student_id]: Boolean(
                updatedStudentAssessment.is_missing,
            ),
        }));
        setStudentAssessmentIdsByStudentId((currentIds) => ({
            ...currentIds,
            [studentScoreRecord.student_id]:
                updatedStudentAssessment.id ??
                updatedStudentAssessment.student_assessment_id,
        }));

        if (updatedStudentAssessment.is_missing) {
            setScoresByStudentId((currentScores) => ({
                ...currentScores,
                [studentScoreRecord.student_id]: "",
            }));
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4">
                <Text as="h2" className="text-lg font-semibold">
                    Student Scores
                </Text>
                <Text variant="muted">
                    Enter a score for each student enrolled in this course.
                </Text>
                <Text variant="muted" className="mt-1">
                    Maximum score allowed: {formatMaximumScore(maxScore)}
                </Text>
            </div>

            {students.length === 0 ? (
                <Text variant="muted">
                    There are no students enrolled in this course.
                </Text>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Score</TableHead>
                            {onMarkMissing && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => {
                            const existingScore = findExistingScore(
                                student,
                                getAssessmentScoreRecords(assessment),
                            );
                            const studentScoreRecord = {
                                student_id: student.id,
                                enrollment_id:
                                    student.enrollment_id ??
                                    student.enrollment?.id,
                                student_assessment_id:
                                    studentAssessmentIdsByStudentId[
                                        student.id
                                    ] ?? existingScore?.id,
                                is_missing: Boolean(
                                    missingByStudentId[student.id],
                                ),
                                score:
                                    scoresByStudentId[student.id] === ""
                                        ? null
                                        : scoresByStudentId[student.id],
                            };

                            return (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {getStudentFullName(student)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            min="0"
                                            max={maxScore || undefined}
                                            step="0.01"
                                            value={scoresByStudentId[student.id] ?? ""}
                                            onChange={(event) =>
                                                handleScoreChange(student.id, event.target.value)
                                            }
                                            placeholder="Score"
                                        />
                                    </TableCell>
                                    {onMarkMissing && (
                                        <TableCell>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="px-2 py-1 text-xs"
                                                disabled={
                                                    markingMissingStudentId ===
                                                    student.id
                                                }
                                                onClick={() =>
                                                    handleMissingClick(studentScoreRecord)
                                                }
                                            >
                                                {markingMissingStudentId ===
                                                student.id
                                                    ? "Marking..."
                                                    : studentScoreRecord.is_missing
                                                        ? "Unmark as Missing"
                                                        : "Mark as Missing"}
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
