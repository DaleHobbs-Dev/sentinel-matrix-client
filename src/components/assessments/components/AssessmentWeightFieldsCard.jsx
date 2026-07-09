import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

export const AssessmentWeightFieldsCard = ({ assessmentType, onChange }) => (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <Text as="h3" className="mb-3 font-semibold">
            {assessmentType.assessment_type_name}
        </Text>
        <FormField label="Grade Weight">
            <Input
                type="number"
                min="0"
                max="100"
                step="1"
                value={assessmentType.weight}
                onChange={(event) =>
                    onChange(assessmentType.id, "weight", event.target.value)
                }
                required
            />
        </FormField>
        <FormField label="Risk Score Weight">
            <Input
                type="number"
                min="0"
                max="100"
                step="1"
                value={assessmentType.risk_score_weight}
                onChange={(event) =>
                    onChange(
                        assessmentType.id,
                        "risk_score_weight",
                        event.target.value,
                    )
                }
                required
            />
        </FormField>
    </div>
);
