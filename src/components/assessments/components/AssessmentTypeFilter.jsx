import { Button, ButtonGroup } from "@/components"

const filterOptions = [
    { label: "All", value: "all" },
    { label: "Homework", value: "Homework" },
    { label: "Attendance", value: "Attendance" },
]

export const AssessmentTypeFilter = ({ value, onChange }) => (
    <ButtonGroup>
        {filterOptions.map((option) => (
            <Button
                key={option.value}
                type="button"
                variant={value === option.value ? "primary" : "outline"}
                onClick={() => onChange(option.value)}
            >
                {option.label}
            </Button>
        ))}
    </ButtonGroup>
)
