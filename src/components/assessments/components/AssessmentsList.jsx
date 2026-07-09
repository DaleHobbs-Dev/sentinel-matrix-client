import {
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Text,
} from "@/components";
import { useNavigate } from "react-router-dom";

const formatDate = (value) => {
    if (!value) {
        return "N/A";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(value));
};

const formatWholeNumber = (value) => {
    if (value === null || value === undefined || value === "") {
        return "N/A";
    }

    return Math.round(Number(value)).toString();
};

export const AssessmentsList = ({
    assessments = [],
    courseId,
    onDeleteAssessment,
}) => {
    const navigate = useNavigate();

    if (assessments.length === 0) {
        return (
            <Text variant="muted">
                There are no assessments matching this filter.
            </Text>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Max Score</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Weights</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                        <TableCell>
                            <div className="font-medium">{assessment.title}</div>
                        </TableCell>
                        <TableCell>{assessment.assessment_type_name}</TableCell>
                        <TableCell>{formatWholeNumber(assessment.max_score)}</TableCell>
                        <TableCell>{formatDate(assessment.due_date)}</TableCell>
                        <TableCell>
                            <div>{formatWholeNumber(assessment.weight)}% grade</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {formatWholeNumber(assessment.risk_score_weight)}% risk
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <ButtonGroup align="end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        navigate(
                                            `/courses/${courseId}/assessments/${assessment.id}/scores`,
                                        )
                                    }
                                >
                                    Record Scores
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        navigate(
                                            `/courses/${courseId}/assessments/${assessment.id}/edit`,
                                        )
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => onDeleteAssessment?.(assessment)}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
