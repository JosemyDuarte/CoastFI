import type { CoastFIInputs, CoastFIResult, InvestmentProjection } from './types.js';

export function calculateCoastFI(inputs: CoastFIInputs): CoastFIResult {
	const {
		currentAge,
		currentSavings,
		desiredRetirementIncome,
		retirementAge,
		monthlyContributions,
		expectedReturn,
		inflationRate,
		safeWithdrawalRate
	} = inputs;

	const yearsToRetirement = retirementAge - currentAge;
	const annualReturn = expectedReturn / 100;
	const annualInflation = inflationRate / 100;
	const withdrawalRate = safeWithdrawalRate / 100;
	const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;

	// Calculate required retirement amount (adjusted for inflation)
	const futureDesiredIncome =
		desiredRetirementIncome * 12 * Math.pow(1 + annualInflation, yearsToRetirement);
	const requiredRetirementAmount = futureDesiredIncome / withdrawalRate;

	// Calculate Coast FI number (what they need today to coast to retirement)
	const coastFINumber = requiredRetirementAmount / Math.pow(1 + annualReturn, yearsToRetirement);

	// Check if they're already at Coast FI
	const isCoastFI = currentSavings >= coastFINumber;

	let yearsToCoastFI = 0;
	let ageWhenCoastFI = currentAge;
	let timeToCoastFI = 'Already achieved!';

	if (!isCoastFI) {
		// Optimize for zero monthly contributions case
		if (monthlyContributions === 0) {
			timeToCoastFI = 'Never (no contributions)';
			ageWhenCoastFI = retirementAge;
			yearsToCoastFI = yearsToRetirement;
		} else {
			// Calculate when they'll reach Coast FI with their monthly contributions
			let currentValue = currentSavings;

			for (let months = 1; months <= yearsToRetirement * 12; months++) {
				// Add monthly contribution and growth
				currentValue = currentValue * (1 + monthlyReturn) + monthlyContributions;

				// Calculate required Coast FI amount at this point in time
				const yearsFromNow = months / 12;
				const remainingYearsToRetirement = yearsToRetirement - yearsFromNow;

				if (remainingYearsToRetirement > 0) {
					const requiredAtThisTime =
						requiredRetirementAmount / Math.pow(1 + annualReturn, remainingYearsToRetirement);

					if (currentValue >= requiredAtThisTime) {
						yearsToCoastFI = yearsFromNow;
						ageWhenCoastFI = currentAge + yearsFromNow;

						const years = Math.floor(yearsToCoastFI);
						const months_remaining = Math.round((yearsToCoastFI - years) * 12);

						if (years === 0) {
							timeToCoastFI = `${months_remaining} months`;
						} else if (months_remaining === 0) {
							timeToCoastFI = `${years} ${years === 1 ? 'year' : 'years'}`;
						} else {
							timeToCoastFI = `${years} ${years === 1 ? 'year' : 'years'} and ${months_remaining} ${months_remaining === 1 ? 'month' : 'months'}`;
						}
						break;
					}
				}
			}

			// If they never reach Coast FI before retirement
			if (yearsToCoastFI === 0) {
				timeToCoastFI = 'Beyond retirement age';
				ageWhenCoastFI = retirementAge;
				yearsToCoastFI = yearsToRetirement;
			}
		}
	}

	// Calculate projected retirement value with contributions
	let projectedRetirementValue = currentSavings;
	for (let months = 1; months <= yearsToRetirement * 12; months++) {
		projectedRetirementValue =
			projectedRetirementValue * (1 + monthlyReturn) + monthlyContributions;
	}

	// Calculate actual monthly retirement income (in future dollars, then convert to today's purchasing power)
	const futureMonthlyIncome = (projectedRetirementValue * withdrawalRate) / 12;
	const actualRetirementIncome =
		futureMonthlyIncome / Math.pow(1 + annualInflation, yearsToRetirement);

	return {
		coastFINumber,
		isCoastFI,
		yearsToCoastFI,
		ageWhenCoastFI,
		projectedRetirementValue,
		actualRetirementIncome,
		timeToCoastFI
	};
}

export function generateProjections(inputs: CoastFIInputs): InvestmentProjection[] {
	const {
		currentAge,
		currentSavings,
		retirementAge,
		expectedReturn,
		inflationRate,
		monthlyContributions,
		desiredRetirementIncome
	} = inputs;
	const projections: InvestmentProjection[] = [];

	const annualReturn = expectedReturn / 100;
	const annualInflation = inflationRate / 100;
	const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;

	let currentValue = currentSavings;
	let totalContributions = 0;

	// Calculate monthly withdrawal amount (inflation-adjusted)
	const yearsToRetirement = retirementAge - currentAge;
	const futureDesiredMonthlyIncome =
		desiredRetirementIncome * Math.pow(1 + annualInflation, yearsToRetirement);
	const monthlyWithdrawal = futureDesiredMonthlyIncome;

	// Project through retirement age + 25 years to show full retirement period
	const endAge = Math.min(retirementAge + 25, 100);

	for (let age = currentAge; age <= endAge; age++) {
		if (age > currentAge && age <= retirementAge) {
			// Accumulation phase - add contributions and growth
			for (let month = 0; month < 12; month++) {
				currentValue = currentValue * (1 + monthlyReturn) + monthlyContributions;
				totalContributions += monthlyContributions;
			}
		} else if (age > retirementAge) {
			// Withdrawal phase - withdraw monthly and apply growth
			for (let month = 0; month < 12; month++) {
				currentValue = Math.max(0, currentValue * (1 + monthlyReturn) - monthlyWithdrawal);
			}
		}

		const yearsFromStart = age - currentAge;
		const realValue = currentValue / Math.pow(1 + annualInflation, yearsFromStart);

		projections.push({
			age,
			year: new Date().getFullYear() + yearsFromStart,
			value: currentValue,
			contributionsToDate: totalContributions,
			realValue
		});
	}

	return projections;
}
