import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Text,
} from "@/components";
import { updateCourseAssessmentTypes } from "@/services";
import { AssessmentWeightFieldsCard } from "./AssessmentWeightFieldsCard";
import { AssessmentWeightTotalsSummary } from "./AssessmentWeightTotalsSummary";
import {
    assessmentWeightTotalsAreValid,
    getAssessmentWeightPayload,
    getAssessmentWeightTotals,
    getEditableAssessmentWeightRows,
} from "../utils/assessmentWeights";

const CourseAssessmentWeightsForm = ({
    courseAssessmentTypes,
    onClose,
    onUpdated,
}) => {
    const [formRows, setFormRows] = useState(() =>
        getEditableAssessmentWeightRows(courseAssessmentTypes),
    );
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const totals = useMemo(() => {
        return getAssessmentWeightTotals(formRows);
    }, [formRows]);

    const updateRow = (id, field, value) => {
        setFormRows((currentRows) =>
            currentRows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row,
            ),
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!assessmentWeightTotalsAreValid(totals)) {
            setError(
                "Assessment weights and risk score weights must each add up to 100.",
            );
            return;
        }

        setSubmitting(true);

        try {
            const updatedTypes = await updateCourseAssessmentTypes(
                getAssessmentWeightPayload(formRows),
            );
            onUpdated?.(updatedTypes);
            onClose?.();
        } catch (err) {
            setError(
                err.body?.message ||
                err.message ||
                "Unable to update course assessment weights.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ModalHeader onClose={onClose}>
                <Text as="h2" className="text-xl font-semibold">
                    Edit Course Assessment Weights
                </Text>
            </ModalHeader>

            <ModalBody>
                {error && (
                    <Alert variant="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                    {formRows.map((row) => (
                        <AssessmentWeightFieldsCard
                            key={row.id}
                            assessmentType={row}
                            onChange={updateRow}
                        />
                    ))}
                </div>

                <AssessmentWeightTotalsSummary totals={totals} />
            </ModalBody>

            <ModalFooter>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={submitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Weights"}
                </Button>
            </ModalFooter>
        </form>
    );
};

export const CourseAssessmentWeightsModal = ({
    isOpen,
    onClose,
    courseAssessmentTypes = [],
    onUpdated,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <CourseAssessmentWeightsForm
                key={courseAssessmentTypes
                    .map((assessmentType) => assessmentType.id)
                    .join("-")}
                courseAssessmentTypes={courseAssessmentTypes}
                onClose={onClose}
                onUpdated={onUpdated}
            />
        </Modal>
    );
};
