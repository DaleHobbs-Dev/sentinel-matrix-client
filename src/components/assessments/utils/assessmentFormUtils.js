export const emptyAssessment = {
    title: "",
    max_score: "",
    due_date: "",
    assessment_type_id: "",
}

// Takes in a date value from the API, like an ISO date string.
// Returns a datetime-local friendly value that can be shown inside the form input.
export const toDateTimeInputValue = (value) => {
    if (!value) {
        return ""
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
}

// Takes in a date value from the form input.
// Returns null for a blank date, or an ISO date string that can be sent to the API.
export const toApiDateValue = (value) => {
    if (!value) {
        return null
    }

    const date = new Date(value)

    return Number.isNaN(date.getTime()) ? value : date.toISOString()
}

// Takes in the starting assessment values for the form.
// Returns a complete form object with blanks filled in and the date formatted for the input.
export const normalizeInitialValues = (initialValues = emptyAssessment) => ({
    ...emptyAssessment,
    ...initialValues,
    assessment_type_id: initialValues.assessment_type_id ?? "",
    due_date: toDateTimeInputValue(initialValues.due_date),
})
