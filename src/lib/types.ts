export interface CoastFIInputs {
	currentAge: number;
	currentSavings: number;
	desiredRetirementIncome: number;
	retirementAge: number;
	monthlyContributions: number;
	expectedReturn: number;
	inflationRate: number;
	safeWithdrawalRate: number;
}

export interface CoastFIResult {
	coastFINumber: number;
	isCoastFI: boolean;
	yearsToCoastFI: number;
	ageWhenCoastFI: number;
	projectedRetirementValue: number;
	actualRetirementIncome: number;
	timeToCoastFI: string;
}

export interface InvestmentProjection {
	age: number;
	year: number;
	value: number;
	contributionsToDate: number;
	realValue: number;
}

export interface ChartDataPoint {
	x: number;
	y: number;
	label?: string;
}
