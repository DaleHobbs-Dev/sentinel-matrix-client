import { useState } from "react"
import { Alert, Button, FormField, Input, Textarea } from "@/components/ui"

const emptyCourse = {
    course_name: "",
    description: "",
    term: "",
    course_image_url: "",
}

export const CourseForm = ({
    initialValues = emptyCourse,
    onSubmit,
    onCancel,
    submitLabel = "Save Course",
    submitting = false,
    error = null,
}) => {
    const [formData, setFormData] = useState(() => ({ ...emptyCourse, ...initialValues }))

    const updateField = (event) => {
        const { name, value } = event.target
        setFormData(current => ({ ...current, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit({
            ...formData,
            course_image_url: formData.course_image_url || null,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <Alert variant="error">{error}</Alert>}

            <FormField label="Course Name" htmlFor="course_name">
                <Input
                    id="course_name"
                    name="course_name"
                    value={formData.course_name}
                    onChange={updateField}
                    placeholder="Math 1130"
                    required
                />
            </FormField>

            <FormField label="Description" htmlFor="description">
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={updateField}
                    placeholder="Brief description of the course"
                    rows={3}
                />
            </FormField>

            <FormField label="Term" htmlFor="term">
                <Input
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={updateField}
                    placeholder="Spring 2026"
                    required
                />
            </FormField>

            <FormField label="Course Image URL" htmlFor="course_image_url">
                <Input
                    id="course_image_url"
                    name="course_image_url"
                    type="url"
                    value={formData.course_image_url ?? ""}
                    onChange={updateField}
                    placeholder="https://example.com/image.jpg (optional)"
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
