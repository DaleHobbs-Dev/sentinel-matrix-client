import { useState } from "react"
import { Alert, Button, FormField, Input, Select } from "@/components"

const emptyAssessment = {
    title: "",
    max_score: "",
    due_date: "",
    assessment_type_id: "",
}

const toDateTimeInputValue = (value) => {
    if (!value) {
        return ""
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

const toApiDateValue = (value) => {
    if (!value) {
        return null
    }

    const date = new Date(value)

    return Number.isNaN(date.getTime()) ? value : date.toISOString()
}

const normalizeInitialValues = (initialValues) => ({
    ...emptyAssessment,
    ...initialValues,
    assessment_type_id: initialValues.assessment_type_id ?? "",
    due_date: toDateTimeInputValue(initialValues.due_date),
})

export const AssessmentForm = ({
    initialValues = emptyAssessment,
    courseId,
    assessmentTypes = [],
    onSubmit,
    onCancel,
    submitLabel = "Save Assessment",
    submitting = false,
    error = null,
}) => {
    const [formData, setFormData] = useState(() => normalizeInitialValues(initialValues))

    const updateField = (event) => {
        const { name, value } = event.target
        setFormData(current => ({ ...current, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const assessmentData = {
            title: formData.title,
            max_score: formData.max_score,
            due_date: toApiDateValue(formData.due_date),
            assessment_type_id: Number(formData.assessment_type_id),
            course_id: Number(courseId ?? initialValues.course_id),
        }

        onSubmit(assessmentData)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <Alert variant="error">{error}</Alert>}

            <FormField label="Select Assessment Type" htmlFor="assessment_type_id">
                <Select
                    id="assessment_type_id"
                    name="assessment_type_id"
                    value={formData.assessment_type_id}
                    onChange={updateField}
                    required
                >
                    <option value="">Select an assessment type</option>
                    {assessmentTypes.map((assessmentType) => (
                        <option key={assessmentType.id} value={assessmentType.assessment_type}>
                            {assessmentType.assessment_type_name}
                        </option>
                    ))}
                </Select>
            </FormField>

            <FormField label="Assessment Title" htmlFor="title">
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={updateField}
                    placeholder="Homework / Attendance 1"
                    required
                />
            </FormField>

            <FormField label="Max Score" htmlFor="max_score">
                <Input
                    id="max_score"
                    name="max_score"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.max_score}
                    onChange={updateField}
                    placeholder="100"
                    required
                />
            </FormField>

            <FormField label="Due Date" htmlFor="due_date">
                <Input
                    id="due_date"
                    name="due_date"
                    type="datetime-local"
                    value={formData.due_date}
                    onChange={updateField}
                    required
                />
            </FormField>

            <div className="flex justify-end gap-3 pt-2">
                {onCancel && (
                    <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    )
}
