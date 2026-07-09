import { useState } from "react"
import {
    Alert,
    Button,
    FormField,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Text,
} from "@/components"
import { getStudentFullName } from "@/components/students/utils/studentFormatters"

const getInitialScore = (studentAssessment) => {
    if (!studentAssessment || studentAssessment.is_missing) {
        return ""
    }

    return studentAssessment.score ?? ""
}

export const StudentAssessmentScoreModal = ({
    isOpen,
    onClose,
    assessmentScore,
    enrollment,
    onSaveScore,
    onMarkMissing,
}) => {
    const [score, setScore] = useState(() =>
        getInitialScore(assessmentScore?.studentAssessment),
    )
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const assessment = assessmentScore?.assessment

    const handleClose = () => {
        if (submitting) {
            return
        }

        setError(null)
        onClose?.()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            await onSaveScore?.({
                assessmentScore,
                score,
            })
            setError(null)
            onClose?.()
        } catch (err) {
            setError(
                err.body?.detail ||
                err.body?.message ||
                err.message ||
                "Unable to save this score.",
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleMarkMissing = async () => {
        setSubmitting(true)
        setError(null)

        try {
            await onMarkMissing?.(assessmentScore)
            setError(null)
            onClose?.()
        } catch (err) {
            setError(
                err.body?.detail ||
                err.body?.message ||
                err.message ||
                "Unable to mark this assessment as missing.",
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg">
            <form onSubmit={handleSubmit}>
                <ModalHeader onClose={handleClose}>
                    <Text as="h2" className="text-xl font-semibold">
                        {assessmentScore?.studentAssessment
                            ? "Edit Score"
                            : "Record Score"}
                    </Text>
                </ModalHeader>

                <ModalBody>
                    {error && (
                        <Alert variant="error" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <div className="mb-4 rounded-lg bg-surface-muted p-3">
                        <Text className="font-medium">
                            {getStudentFullName(enrollment?.student)}
                        </Text>
                        <Text variant="muted">
                            {assessment?.title || "Assessment"}
                        </Text>
                        <Text variant="muted">
                            Maximum score:{" "}
                            {assessment?.max_score
                                ? Number(assessment.max_score).toFixed(2)
                                : "N/A"}
                        </Text>
                    </div>

                    <FormField label="Score">
                        <Input
                            type="number"
                            min="0"
                            max={assessment?.max_score || undefined}
                            step="0.01"
                            value={score}
                            onChange={(event) => setScore(event.target.value)}
                            required
                        />
                    </FormField>
                </ModalBody>

                <ModalFooter>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={handleMarkMissing}
                        disabled={submitting}
                    >
                        Mark as Missing
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Saving..." : "Save Score"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}
