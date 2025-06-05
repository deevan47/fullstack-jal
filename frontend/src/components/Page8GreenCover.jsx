import React from 'react';
import { useFormikContext } from 'formik';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

const questions = [
	{
		name: 'q5_1',
		label: '5.1 Status of Green Cover Policy',
		options: [
			{ value: '0', label: '0 - None' },
			{ value: '1', label: '1 - Green Cover Policy drafting in progress' },
			{ value: '2', label: '2 - Green Cover Policy finalized' },
			{
				value: '3',
				label: '3 - Green Cover Policy finalized and shared with stakeholders',
			},
		],
	},
	{
		name: 'q5_2',
		label: '5.2 Status of Green Coverage Area',
		options: [
			{ value: '0', label: '0 - (<10%)' },
			{ value: '1', label: '1 - (10-25%)' },
			{ value: '2', label: '2 - (25-50%)' },
			{ value: '3', label: '3 - (>50%)' },
		],
	},
	{
		name: 'q5_3',
		label: '5.3 Status of Green Landscapes',
		options: [
			{
				value: '0',
				label: '0 - High water using non-native species + no smart irrigation',
			},
			{
				value: '1',
				label: '1 - High water using non-native species + smart irrigation',
			},
			{ value: '2', label: '2 - Native species + no smart irrigation' },
			{ value: '3', label: '3 - Native species + smart irrigation' },
		],
	},
	{
		name: 'q5_4',
		label: '5.4 Status of Green Roofs & Green Walls',
		options: [
			{ value: '0', label: '0 - None' },
			{ value: '1', label: '1 - Plans for Green Roofs & Green Walls in place' },
			{ value: '2', label: '2 - Green Roofs operational' },
			{ value: '3', label: '3 - Green Roofs + Green Walls operational' },
		],
	},
];

function Page8GreenCover() {
	const { values, setFieldValue, errors, touched } = useFormikContext();

	return (
		<Box>
			<Typography variant="h5" sx={{ mb: 2 }}>
				5) Green Cover
			</Typography>
			{questions.map((q) => (
				<FormControl
					key={q.name}
					component="fieldset"
					sx={{ mb: 3, width: '100%' }}
				>
					<FormLabel component="legend">
						{q.label} <span className="asterisk">*</span>
					</FormLabel>
					<RadioGroup
						value={values[q.name] || ''}
						onChange={(e) => setFieldValue(q.name, e.target.value)}
					>
						{q.options.map((opt) => (
							<FormControlLabel
								key={opt.value}
								value={opt.value}
								control={<Radio />}
								label={opt.label}
							/>
						))}
					</RadioGroup>
					{touched[q.name] && errors[q.name] && (
						<Typography color="error" variant="caption">
							{errors[q.name]}
						</Typography>
					)}
				</FormControl>
			))}
		</Box>
	);
}

export default Page8GreenCover;