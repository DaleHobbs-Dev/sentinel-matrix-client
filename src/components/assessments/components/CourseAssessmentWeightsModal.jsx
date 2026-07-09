import { useMemo, useState } from "react"
import { Alert, Button, FormField, Input, Modal, ModalBody, ModalFooter, ModalHeader, Text } from "@/components"
import { updateCourseAssessmentTypes } from "@/services"

const toEditableValue = (value) => {
    if (value === null || value === undefined || value === "") {
        return ""
    }

    return Math.round(Number(value)).toString()
}
const toNumber = (value) => Number(value || 0)
const totalIsValid = (value) => Math.abs(value - 100) < 0.01

const getInitialRows = (courseAssessmentTypes) => (
    courseAssessmentTypes.map((assessmentType) => ({
        ...assessmentType,
        weight: toEditableValue(assessmentType.weight),
        risk_score_weight: toEditableValue(assessmentType.risk_score_weight),
    }))
)

const CourseAssessmentWeightsForm = ({ courseAssessmentTypes, onClose, onUpdated }) => {
    const [formRows, setFormRows] = useState(() => getInitialRows(courseAssessmentTypes))
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const totals = useMemo(() => {
        return formRows.reduce((currentTotals, row) => ({
            weight: currentTotals.weight + toNumber(row.weight),
            riskScoreWeight: currentTotals.riskScoreWeight + toNumber(row.risk_score_weight),
        }), { weight: 0, riskScoreWeight: 0 })
    }, [formRows])

    const updateRow = (id, field, value) => {
        setFormRows((currentRows) => currentRows.map((row) => (
            row.id === id ? { ...row, [field]: value } : row
        )))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)

        if (!totalIsValid(totals.weight) || !totalIsValid(totals.riskScoreWeight)) {
            setError("Assessment weights and risk score weights must each add up to 100.")
            return
        }

        setSubmitting(true)

        try {
            const updatedTypes = await updateCourseAssessmentTypes(formRows.map((row) => ({
                id: row.id,
                weight: row.weight,
                risk_score_weight: row.risk_score_weight,
            })))
            onUpdated?.(updatedTypes)
            onClose?.()
        } catch (err) {
            setError(err.body?.message || err.message || "Unable to update course assessment weights.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <ModalHeader onClose={onClose}>
                <Text as="h2" className="text-xl font-semibold">Edit Course Assessment Weights</Text>
            </ModalHeader>

            <ModalBody>
                {error && <Alert variant="error" className="mb-4">{error}</Alert>}

                <div className="grid gap-4 sm:grid-cols-2">
                    {formRows.map((row) => (
                        <div key={row.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <Text as="h3" className="mb-3 font-semibold">{row.assessment_type_name}</Text>
                            <FormField label="Grade Weight">
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={row.weight}
                                    onChange={(event) => updateRow(row.id, "weight", event.target.value)}
                                    required
                                />
                            </FormField>
                            <FormField label="Risk Score Weight">
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={row.risk_score_weight}
                                    onChange={(event) => updateRow(row.id, "risk_score_weight", event.target.value)}
                                    required
                                />
                            </FormField>
                        </div>
                    ))}
                </div>

                <div className="mt-4 rounded-lg bg-surface-muted p-3 text-sm">
                    <div>Grade weight total: {Math.round(totals.weight)}%</div>
                    <div>Risk score weight total: {Math.round(totals.riskScoreWeight)}%</div>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Weights"}
                </Button>
            </ModalFooter>
        </form>
    )
}

export const CourseAssessmentWeightsModal = ({
    isOpen,
    onClose,
    courseAssessmentTypes = [],
    onUpdated,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <CourseAssessmentWeightsForm
                key={courseAssessmentTypes.map((assessmentType) => assessmentType.id).join("-")}
                courseAssessmentTypes={courseAssessmentTypes}
                onClose={onClose}
                onUpdated={onUpdated}
            />
        </Modal>
    )
}
