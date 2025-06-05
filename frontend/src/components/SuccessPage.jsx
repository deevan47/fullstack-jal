import React from 'react';

const sections = [
	{
		key: 'score_water_management',
		label: '1. Water Management',
		questions: [
			{ key: 'q1_1', label: '1.1 Water Policy' },
			{ key: 'q1_2', label: '1.2 Water Pledge' },
			{ key: 'q1_3', label: '1.3 Water Charter' },
			{ key: 'q1_4', label: '1.4 Water Saving Goals & Targets' },
		],
	},
	{
		key: 'score_water_efficiency',
		label: '2. Water Efficiency',
		questions: [
			{ key: 'q2_1', label: '2.1 Water Metering' },
			{ key: 'q2_2', label: '2.2 Water Audits' },
			{ key: 'q2_3', label: '2.3 Leak Detection' },
			{ key: 'q2_4', label: '2.4 Efficient Fixtures' },
			{ key: 'q2_5', label: '2.5 Water Use Monitoring' },
			{ key: 'q2_6', label: '2.6 Awareness Programs' },
		],
	},
	{
		key: 'score_groundwater',
		label: '3. Groundwater Sustainability',
		questions: [
			{ key: 'q3_1', label: '3.1 Borewell Management' },
			{ key: 'q3_2', label: '3.2 Groundwater Recharge' },
			{ key: 'q3_3', label: '3.3 Monitoring' },
		],
	},
	{
		key: 'score_circularity',
		label: '4. Water Circularity',
		questions: [
			{ key: 'q4_1', label: '4.1 Greywater Reuse' },
			{ key: 'q4_2', label: '4.2 Rainwater Harvesting' },
			{ key: 'q4_3', label: '4.3 Treated Water Use' },
		],
	},
	{
		key: 'score_green_cover',
		label: '5. State of Green Cover',
		questions: [
			{ key: 'q5_1', label: '5.1 Green Cover Policy' },
			{ key: 'q5_2', label: '5.2 Green Coverage Area' },
			{ key: 'q5_3', label: '5.3 Green Landscapes' },
			{ key: 'q5_4', label: '5.4 Green Roofs & Walls' },
		],
	},
];

function getMaturity(avg) {
	avg = Number(avg);
	if (avg >= 2.5) return { label: 'Achiever', color: '#4caf50' }; // Green
	if (avg >= 1.5) return { label: 'Performer', color: '#ffeb3b' }; // Yellow
	if (avg >= 1.0) return { label: 'Front Runner', color: '#ff9800' }; // Orange
	return { label: 'Aspirant', color: '#f44336' }; // Red
}

function SuccessPage({ values, onRestart }) {
	// Calculate overall average (ignore 'NA' and empty)
	const sectionScores = sections
		.map(s => values[s.key])
		.filter(v => v !== undefined && v !== '' && v !== 'NA')
		.map(Number);
	const overallAvg = sectionScores.length
		? (sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length).toFixed(2)
		: 'NA';
	const overallMaturity = getMaturity(overallAvg);

	return (
		<div style={{ maxWidth: 900, margin: '0 auto' }}>
			{/* Overall Score Table */}
			<div
				style={{
					margin: '32px auto 24px auto',
					maxWidth: 400,
					borderRadius: 12,
					overflow: 'hidden',
					boxShadow: '0 2px 12px #0002',
				}}
			>
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 20 }}>
					<thead>
						<tr>
							<th
								style={{
									background: '#e0eafc',
									padding: 14,
									border: 'none',
									textAlign: 'center',
								}}
							>
								Overall Current Score
							</th>
							<th
								style={{
									background: '#e0eafc',
									padding: 14,
									border: 'none',
									textAlign: 'center',
								}}
							>
								Maturity Level (Current)
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								style={{
									padding: 16,
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 28,
								}}
							>
								{overallAvg}
							</td>
							<td
								style={{
									padding: 16,
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 22,
									background: overallMaturity.color,
									color: '#222',
								}}
							>
								{overallMaturity.label}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2 style={{ textAlign: 'center', marginBottom: 24 }}>
				Component Scores & Maturity
			</h2>
			{sections.map(section => {
				const maturity = getMaturity(values[section.key]);
				return (
					<div
						key={section.key}
						style={{
							marginBottom: 32,
							border: '1px solid #b6c6e6',
							borderRadius: 8,
							background: '#f7faff',
						}}
					>
						<div
							style={{
								background: maturity.color,
								color: '#222',
								fontWeight: 'bold',
								padding: '10px 16px',
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
								fontSize: 20,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<span>{section.label}</span>
							<span>
								Score: {values[section.key]} &nbsp;|&nbsp; {maturity.label}
							</span>
						</div>
						<table
							style={{
								width: '100%',
								borderCollapse: 'collapse',
								fontSize: 16,
							}}
						>
							<thead>
								<tr style={{ background: '#e0eafc' }}>
									<th
										style={{
											padding: 8,
											border: '1px solid #b6c6e6',
										}}
									>
										Question
									</th>
									<th
										style={{
											padding: 8,
											border: '1px solid #b6c6e6',
										}}
									>
										Current Rating (0–3)
									</th>
								</tr>
							</thead>
							<tbody>
								{section.questions.map(q => (
									<tr key={q.key}>
										<td
											style={{
												padding: 8,
												border: '1px solid #b6c6e6',
											}}
										>
											{q.label}
										</td>
										<td
											style={{
												padding: 8,
												border: '1px solid #b6c6e6',
												textAlign: 'center',
											}}
										>
											{values[q.key]}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				);
			})}
			<div style={{ marginTop: 32, textAlign: 'center' }}>
				<p>Thank you for your submission! Your results have been saved.</p>
				<button
					style={{
						marginTop: 16,
						padding: '10px 24px',
						fontSize: 18,
						background: '#1976d2',
						color: '#fff',
						border: 'none',
						borderRadius: 6,
						cursor: 'pointer',
					}}
					onClick={onRestart}
				>
					Submit another response
				</button>
			</div>
		</div>
	);
}

export default SuccessPage;