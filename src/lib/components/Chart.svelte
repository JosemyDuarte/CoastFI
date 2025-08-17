<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		LineElement,
		PointElement,
		LineController,
		CategoryScale,
		LinearScale,
		Title,
		Tooltip,
		Legend
	} from 'chart.js';
	import type { InvestmentProjection } from '$lib/types.js';

	export let projections: InvestmentProjection[];

	// Find retirement age from projections to split data
	let retirementAge = 65; // default fallback
	if (projections.length > 0) {
		// Retirement age is roughly when contributions stop growing
		for (let i = 1; i < projections.length; i++) {
			if (projections[i].contributionsToDate === projections[i - 1].contributionsToDate) {
				retirementAge = projections[i].age;
				break;
			}
		}
	}

	let chartCanvas: HTMLCanvasElement;
	let chartInstance: Chart | null = null;

	onMount(() => {
		Chart.register(
			LineElement,
			PointElement,
			LineController,
			CategoryScale,
			LinearScale,
			Title,
			Tooltip,
			Legend
		);
		createChart();
		return () => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	});

	$: if (chartInstance && projections) {
		updateChart();
	}

	function createChart() {
		const ctx = chartCanvas.getContext('2d');
		if (!ctx) return;

		// Create continuous data arrays with null values for non-applicable phases
		const accumulationData = projections.map((p) => (p.age <= retirementAge ? p.value : null));
		const withdrawalData = projections.map((p) => (p.age >= retirementAge ? p.value : null));

		chartInstance = new Chart(ctx, {
			type: 'line',
			data: {
				labels: projections.map((p) => p.age),
				datasets: [
					{
						label: 'Portfolio Value (Accumulation)',
						data: accumulationData,
						borderColor: 'rgb(59, 130, 246)',
						backgroundColor: 'rgba(59, 130, 246, 0.1)',
						borderWidth: 3,
						pointRadius: 4,
						pointHoverRadius: 6,
						tension: 0.4,
						spanGaps: false
					},
					{
						label: 'Portfolio Value (Withdrawal)',
						data: withdrawalData,
						borderColor: 'rgb(245, 101, 101)',
						backgroundColor: 'rgba(245, 101, 101, 0.1)',
						borderWidth: 3,
						pointRadius: 4,
						pointHoverRadius: 6,
						tension: 0.4,
						borderDash: [5, 5],
						spanGaps: false
					},
					{
						label: 'Real Value (Inflation Adjusted)',
						data: projections.map((p) => p.realValue),
						borderColor: 'rgb(16, 185, 129)',
						backgroundColor: 'rgba(16, 185, 129, 0.1)',
						borderWidth: 2,
						pointRadius: 3,
						pointHoverRadius: 5,
						tension: 0.4,
						borderDash: [10, 5]
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					intersect: false,
					mode: 'index'
				},
				plugins: {
					title: {
						display: true,
						text: 'Investment Growth Over Time',
						font: {
							size: 16,
							weight: 'bold'
						}
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								const value = context.parsed.y;
								const label = context.dataset.label;
								return `${label}: ${formatCurrency(value)}`;
							},
							afterLabel: function (context) {
								const index = context.dataIndex;
								const projection = projections[index];
								if (context.datasetIndex === 0 || context.datasetIndex === 1) {
									const phase = projection.age <= retirementAge ? 'Accumulation' : 'Withdrawal';
									return [`Age: ${projection.age} | Year: ${projection.year}`, `Phase: ${phase}`];
								}
								return '';
							}
						}
					},
					legend: {
						display: true,
						position: 'top'
					}
				},
				scales: {
					x: {
						title: {
							display: true,
							text: 'Age'
						},
						grid: {
							display: true,
							color: 'rgba(0, 0, 0, 0.1)'
						}
					},
					y: {
						title: {
							display: true,
							text: 'Portfolio Value (€)'
						},
						ticks: {
							callback: function (value) {
								return formatCurrency(Number(value));
							}
						},
						grid: {
							display: true,
							color: 'rgba(0, 0, 0, 0.1)'
						}
					}
				}
			}
		});
	}

	function updateChart() {
		if (!chartInstance) return;

		// Update retirement age detection
		for (let i = 1; i < projections.length; i++) {
			if (projections[i].contributionsToDate === projections[i - 1].contributionsToDate) {
				retirementAge = projections[i].age;
				break;
			}
		}

		const accumulationData = projections.map((p) => (p.age <= retirementAge ? p.value : null));
		const withdrawalData = projections.map((p) => (p.age >= retirementAge ? p.value : null));

		chartInstance.data.labels = projections.map((p) => p.age);
		chartInstance.data.datasets[0].data = accumulationData;
		chartInstance.data.datasets[1].data = withdrawalData;
		chartInstance.data.datasets[2].data = projections.map((p) => p.realValue);
		chartInstance.update();
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	}
</script>

<div class="relative h-96 w-full">
	<canvas bind:this={chartCanvas} class="h-full w-full"></canvas>
</div>
