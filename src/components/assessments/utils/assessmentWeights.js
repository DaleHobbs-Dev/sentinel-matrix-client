export const toEditableAssessmentWeight = (value) => {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    return Math.round(Number(value)).toString();
};

export const toAssessmentWeightNumber = (value) => Number(value || 0);

export const assessmentWeightTotalIsValid = (value) =>
    Math.abs(value - 100) < 0.01;

export const getEditableAssessmentWeightRows = (courseAssessmentTypes = []) =>
    courseAssessmentTypes.map((assessmentType) => ({
        ...assessmentType,
        weight: toEditableAssessmentWeight(assessmentType.weight),
        risk_score_weight: toEditableAssessmentWeight(
            assessmentType.risk_score_weight,
        ),
    }));

export const getAssessmentWeightTotals = (rows = []) =>
    rows.reduce(
        (currentTotals, row) => ({
            weight: currentTotals.weight + toAssessmentWeightNumber(row.weight),
            riskScoreWeight:
                currentTotals.riskScoreWeight +
                toAssessmentWeightNumber(row.risk_score_weight),
        }),
        { weight: 0, riskScoreWeight: 0 },
    );

export const assessmentWeightTotalsAreValid = (totals) =>
    assessmentWeightTotalIsValid(totals.weight) &&
    assessmentWeightTotalIsValid(totals.riskScoreWeight);

export const getAssessmentWeightPayload = (rows = []) =>
    rows.map((row) => ({
        id: row.id,
        weight: row.weight,
        risk_score_weight: row.risk_score_weight,
    }));
