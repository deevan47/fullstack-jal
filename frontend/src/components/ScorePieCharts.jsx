import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export const sections = [
	{
		label: 'Water Management',
		keys: ['q1_1', 'q1_2', 'q1_3', 'q1_4'],
	},
	{
		label: 'Water Efficiency',
		keys: ['q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6'],
	},
	{
		label: 'Groundwater Sustainability',
		keys: ['q3_1', 'q3_2', 'q3_3'],
	},
	{
		label: 'Water Circularity',
		keys: ['q4_1', 'q4_2', 'q4_3'],
	},
	{
		label: 'Green Vegetation Cover',
		keys: ['q5_1', 'q5_2', 'q5_3', 'q5_4'],
	},
];

function getSectionScore(values, keys) {
	const scores = keys.map((k) => Number(values[k] || 0));
	const sum = scores.reduce((a, b) => a + b, 0);
	const max = keys.length * 3;
	return { sum, max, avg: sum / keys.length };
}

export function getAllSectionScores(values) {
	return sections.map((section) => {
		const { sum, max, avg } = getSectionScore(values, section.keys);
		return {
			label: section.label,
			sum,
			max,
			avg,
			count: section.keys.length,
		};
	});
}

function ScorePieCharts({ values }) {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '2rem',
				justifyContent: 'center',
			}}
		>
			{sections.map((section) => {
				const { sum, max } = getSectionScore(values, section.keys);
				const data = {
					labels: ['Score', 'Remaining'],
					datasets: [
						{
							data: [sum, max - sum],
							backgroundColor: ['#38b000', '#e53e3e'],
							borderWidth: 2,
						},
					],
				};
				return (
					<div
						key={section.label}
						style={{ width: 220, textAlign: 'center' }}
					>
						<Pie data={data} />
						<div style={{ marginTop: 10 }}>
							<b>{section.label}</b>
							<div>
								Score: {sum} / {max}
							</div>
							<div>
								Average: {(sum / section.keys.length).toFixed(2)}
							</div>
						</div>
					</div>
				);
			})}
			<table>
				<thead>
					<tr>
						<th>Section</th>
						<th>Average</th>
						<th>Performance</th>
					</tr>
				</thead>
				<tbody>
					{sections.map((sec) => {
						const { avg } = getSectionScore(values, sec.keys);
						return (
							<tr key={sec.label}>
								<td>{sec.label}</td>
								<td>{avg.toFixed(2)}</td>
								<td>{getPerformanceLabel(avg)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function getPerformanceLabel(avg) {
	if (avg >= 2.5) return 'Achiever';
	if (avg >= 1.5) return 'Performer';
	if (avg >= 1.0) return 'Front Runner';
	return 'Aspirant';
}

export default ScorePieCharts;