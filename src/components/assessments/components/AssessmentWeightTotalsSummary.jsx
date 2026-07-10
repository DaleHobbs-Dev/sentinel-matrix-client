export const AssessmentWeightTotalsSummary = ({ totals }) => (
    <div className="mt-4 rounded-lg bg-surface-muted p-3 text-sm">
        <div>Grade weight total: {Math.round(totals.weight)}%</div>
    </div>
);
