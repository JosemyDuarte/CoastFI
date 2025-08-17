<script lang="ts">
	import { Button, Label, Input, Tooltip } from 'flowbite-svelte';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import { calculateCoastFI, generateProjections } from '$lib/calculator.js';
	import type { CoastFIInputs, CoastFIResult, InvestmentProjection } from '$lib/types.js';
	import Chart from '$lib/components/Chart.svelte';

	let inputs: CoastFIInputs = {
		currentAge: 30,
		currentSavings: 100000,
		desiredRetirementIncome: 2500,
		retirementAge: 65,
		monthlyContributions: 500,
		expectedReturn: 7,
		inflationRate: 3,
		safeWithdrawalRate: 4
	};

	let result: CoastFIResult | null = null;
	let projections: InvestmentProjection[] = [];
	let showResults = false;

	function calculate() {
		result = calculateCoastFI(inputs);
		projections = generateProjections(inputs);
		showResults = true;
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	}

	function formatNumber(num: number): string {
		return new Intl.NumberFormat('de-DE').format(num);
	}

	// Reactive formatted display values
	$: formattedCurrentSavings = formatNumber(inputs.currentSavings);
	$: formattedDesiredRetirementIncome = formatNumber(inputs.desiredRetirementIncome);
	$: formattedMonthlyContributions = formatNumber(inputs.monthlyContributions);
</script>

<svelte:head>
	<title>Coast FI Calculator</title>
	<meta
		name="description"
		content="Calculate your Coast FI number and visualize your path to financial independence"
	/>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
>
	<!-- Hero Section -->
	<div class="container mx-auto max-w-7xl px-4 pt-12 pb-8">
		<div class="mb-12 text-center">
			<div class="mb-6">
				<span
					class="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
				>
					💰 Financial Independence Calculator
				</span>
			</div>
			<h1 class="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl dark:text-white">
				Coast FI Calculator
			</h1>
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
				Calculate when you'll reach Coast FI based on your current savings, desired retirement
				income, and monthly contributions.
			</p>
		</div>

		<!-- Main Calculator Section -->
		<div class="mb-12 grid grid-cols-1 gap-8 xl:grid-cols-3">
			<!-- Input Form -->
			<div class="xl:col-span-2">
				<div
					class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-8">
						<h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
							Your Financial Details
						</h2>
						<p class="text-gray-600 dark:text-gray-400">
							Enter your information to calculate your Coast FI number
						</p>
					</div>

					<div class="space-y-8">
						<!-- Age Section -->
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div class="space-y-2">
								<Label
									for="currentAge"
									class="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Age</Label
								>
								<Input
									id="currentAge"
									type="number"
									bind:value={inputs.currentAge}
									min="18"
									max="100"
									class="h-12 rounded-xl border-gray-200 text-center text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
									placeholder="30"
								/>
							</div>
							<div class="space-y-2">
								<Label
									for="retirementAge"
									class="text-sm font-semibold text-gray-700 dark:text-gray-300"
									>Retirement Age</Label
								>
								<Input
									id="retirementAge"
									type="number"
									bind:value={inputs.retirementAge}
									min="50"
									max="100"
									class="h-12 rounded-xl border-gray-200 text-center text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
									placeholder="65"
								/>
							</div>
						</div>

						<!-- Financial Details -->
						<div class="space-y-6">
							<div class="space-y-2">
								<Label
									for="currentSavings"
									class="text-sm font-semibold text-gray-700 dark:text-gray-300"
									>Current Savings (€)</Label
								>
								<div class="relative">
									<Input
										id="currentSavings"
										type="text"
										value={formattedCurrentSavings}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											const value = target.value.replace(/[^\d]/g, '');
											inputs.currentSavings = parseInt(value) || 0;
										}}
										class="h-12 rounded-xl border-gray-200 pr-8 text-right text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
										placeholder="100.000"
									/>
									<span class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
										>€</span
									>
								</div>
							</div>

							<div class="space-y-2">
								<Label
									for="desiredRetirementIncome"
									class="text-sm font-semibold text-gray-700 dark:text-gray-300"
									>Desired Monthly Retirement Income (€)</Label
								>
								<div class="relative">
									<Input
										id="desiredRetirementIncome"
										type="text"
										value={formattedDesiredRetirementIncome}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											const value = target.value.replace(/[^\d]/g, '');
											inputs.desiredRetirementIncome = parseInt(value) || 0;
										}}
										class="h-12 rounded-xl border-gray-200 pr-8 text-right text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
										placeholder="2.500"
									/>
									<span class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
										>€</span
									>
								</div>
							</div>

							<div class="space-y-2">
								<Label
									for="monthlyContributions"
									class="text-sm font-semibold text-gray-700 dark:text-gray-300"
									>Monthly Contributions (€)</Label
								>
								<div class="relative">
									<Input
										id="monthlyContributions"
										type="text"
										value={formattedMonthlyContributions}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											const value = target.value.replace(/[^\d]/g, '');
											inputs.monthlyContributions = parseInt(value) || 0;
										}}
										class="h-12 rounded-xl border-gray-200 pr-8 text-right text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
										placeholder="500"
									/>
									<span class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
										>€</span
									>
								</div>
							</div>
						</div>

						<!-- Advanced Settings -->
						<div class="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
							<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
								Advanced Settings
							</h3>
							<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div class="space-y-2">
									<Label
										for="expectedReturn"
										class="text-sm font-semibold text-gray-700 dark:text-gray-300"
										>Expected Return (%)</Label
									>
									<Input
										id="expectedReturn"
										type="number"
										bind:value={inputs.expectedReturn}
										min="1"
										max="20"
										step="0.1"
										class="h-11 rounded-lg border-gray-200 text-center focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
										placeholder="7.0"
									/>
								</div>
								<div class="space-y-2">
									<Label
										for="inflationRate"
										class="text-sm font-semibold text-gray-700 dark:text-gray-300"
										>Inflation Rate (%)</Label
									>
									<Input
										id="inflationRate"
										type="number"
										bind:value={inputs.inflationRate}
										min="0"
										max="10"
										step="0.1"
										class="h-11 rounded-lg border-gray-200 text-center focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
										placeholder="3.0"
									/>
								</div>
								<div class="space-y-2">
									<Label
										for="safeWithdrawalRate"
										class="text-sm font-semibold text-gray-700 dark:text-gray-300"
										>Withdrawal Rate (%)</Label
									>
									<Input
										id="safeWithdrawalRate"
										type="number"
										bind:value={inputs.safeWithdrawalRate}
										min="1"
										max="10"
										step="0.1"
										class="h-11 rounded-lg border-gray-200 text-center focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
										placeholder="4.0"
									/>
								</div>
							</div>
						</div>

						<Button
							type="button"
							onclick={calculate}
							class="h-14 w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
						>
							<span class="mr-2">🚀</span>
							Calculate Coast FI
						</Button>
					</div>
				</div>
			</div>

			<!-- Results Sidebar -->
			{#if showResults && result}
				<div class="space-y-6">
					<div
						class="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="mb-6 text-center">
							{#if result.isCoastFI}
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
								>
									<span class="text-2xl">🎉</span>
								</div>
								<h3 class="mb-2 text-xl font-bold text-green-600 dark:text-green-400">
									Congratulations!
								</h3>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									You've already reached Coast FI!
								</p>
							{:else}
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900"
								>
									<span class="text-2xl">🚀</span>
								</div>
								<h3 class="mb-2 text-xl font-bold text-blue-600 dark:text-blue-400">
									You're on your way!
								</h3>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Here's what you need to reach Coast FI
								</p>
							{/if}
						</div>

						<div class="space-y-4">
							<!-- Coast FI Number -->
							<div
								class="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20"
							>
								<div
									class="mb-1 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400"
								>
									Coast FI Number
									<InfoCircleOutline class="h-4 w-4 cursor-help" id="coastfi-tooltip" />
									<Tooltip triggeredBy="#coastfi-tooltip" class="w-64 text-sm">
										The amount you need to save today so that, without adding any more money, it
										will grow to support your retirement.
									</Tooltip>
								</div>
								<div class="text-2xl font-bold text-blue-900 dark:text-blue-100">
									{formatCurrency(result.coastFINumber)}
								</div>
							</div>

							<!-- Current vs Target -->
							<div class="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
								<div class="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
									Current Progress
								</div>
								<div class="space-y-2">
									<div class="flex items-center justify-between">
										<span class="text-sm text-gray-600 dark:text-gray-400">Current Savings</span>
										<span class="font-semibold text-gray-900 dark:text-white"
											>{formatCurrency(inputs.currentSavings)}</span
										>
									</div>
									<div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
										<div
											class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
											style="width: {Math.min(
												(inputs.currentSavings / result.coastFINumber) * 100,
												100
											)}%"
										></div>
									</div>
									<div class="text-xs text-gray-500 dark:text-gray-400">
										{((inputs.currentSavings / result.coastFINumber) * 100).toFixed(1)}% to Coast FI
									</div>
								</div>
							</div>

							{#if !result.isCoastFI}
								<div class="grid grid-cols-1 gap-3">
									<div
										class="rounded-xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20"
									>
										<div
											class="mb-1 flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400"
										>
											Time to Coast FI
											<InfoCircleOutline class="h-4 w-4 cursor-help" id="time-tooltip" />
											<Tooltip triggeredBy="#time-tooltip" class="w-64 text-sm">
												How long it will take to reach Coast FI with your current monthly
												contributions.
											</Tooltip>
										</div>
										<div class="text-lg font-bold text-amber-900 dark:text-amber-100">
											{result.timeToCoastFI}
										</div>
									</div>
									<div
										class="rounded-xl border border-purple-100 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20"
									>
										<div
											class="mb-1 flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400"
										>
											Age at Coast FI
											<InfoCircleOutline class="h-4 w-4 cursor-help" id="age-tooltip" />
											<Tooltip triggeredBy="#age-tooltip" class="w-64 text-sm">
												The age at which you'll reach Coast FI and can stop making additional
												contributions.
											</Tooltip>
										</div>
										<div class="text-lg font-bold text-purple-900 dark:text-purple-100">
											{result.ageWhenCoastFI.toFixed(1)} years old
										</div>
									</div>
								</div>
							{/if}

							<div class="grid grid-cols-1 gap-3">
								<div
									class="rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
								>
									<div
										class="mb-1 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
									>
										Retirement Portfolio Value
										<InfoCircleOutline class="h-4 w-4 cursor-help" id="retirement-tooltip" />
										<Tooltip triggeredBy="#retirement-tooltip" class="w-64 text-sm">
											The projected total value of your investments at retirement age with your
											monthly contributions.
										</Tooltip>
									</div>
									<div class="text-lg font-bold text-green-900 dark:text-green-100">
										{formatCurrency(result.projectedRetirementValue)}
									</div>
								</div>
								<div
									class="rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20"
								>
									<div
										class="mb-1 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
									>
										Actual Monthly Retirement Income
										<InfoCircleOutline class="h-4 w-4 cursor-help" id="income-tooltip" />
										<Tooltip triggeredBy="#income-tooltip" class="w-64 text-sm">
											The actual monthly income you'll be able to withdraw in retirement (adjusted
											for inflation and expressed in today's purchasing power).
										</Tooltip>
									</div>
									<div class="text-lg font-bold text-emerald-900 dark:text-emerald-100">
										{formatCurrency(result.actualRetirementIncome)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Chart Section -->
		{#if showResults && projections.length > 0}
			<div class="grid grid-cols-1 gap-8">
				<div
					class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-6">
						<h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
							Investment Growth Projection
						</h2>
						<p class="text-gray-600 dark:text-gray-400">
							Visualize how your investments will grow over time
						</p>
					</div>
					<Chart {projections} />
				</div>
			</div>
		{/if}

		<!-- Information Section -->
		<div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div
				class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="mb-6">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900"
					>
						<span class="text-2xl">💡</span>
					</div>
					<h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">What is Coast FI?</h2>
				</div>
				<div class="space-y-4 leading-relaxed text-gray-600 dark:text-gray-400">
					<p>
						Coast FI (Coast Financial Independence) is the amount of money you need to have saved
						today so that, without adding any more money, it will grow to support your retirement at
						your desired retirement age.
					</p>
					<p>
						Once you reach Coast FI, you can "coast" to retirement knowing that your current savings
						will grow enough to support you in retirement, even if you never save another dollar.
					</p>
					<p>
						This calculator uses the safe withdrawal rate (typically 4%) to determine how much
						you'll need in retirement, then works backwards to find your Coast FI number.
					</p>
				</div>
			</div>

			<div
				class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="mb-6">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900"
					>
						<span class="text-2xl">🎯</span>
					</div>
					<h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">How It Works</h2>
				</div>
				<div class="space-y-4">
					<div class="flex items-start space-x-3">
						<div
							class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white"
						>
							1
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">Calculate Future Needs</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								Determine how much you'll need in retirement based on your expenses and inflation
							</p>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div
							class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white"
						>
							2
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">Work Backwards</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								Calculate what you need today for that amount to grow with compound interest
							</p>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div
							class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white"
						>
							3
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">Coast to FI</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								Once you reach that number, you can coast to financial independence
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
