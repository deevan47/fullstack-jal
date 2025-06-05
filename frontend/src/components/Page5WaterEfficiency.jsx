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
    name: 'q2_1',
    label: '2.1 Status of Water Metering',
    options: [
      { value: '0', label: '0 - Bulk water meter' },
      { value: '1', label: '1 - Bulk meter+submeter' },
      { value: '2', label: '2 - Bulk meter+submeter+monthly or weekly monitoring' },
      { value: '3', label: '3 - Smart water sub meters' },
    ],
  },
  {
    name: 'q2_2',
    label: '2.2 Status of Water Fixtures (Average)Flow Rate in liters per minute (lpm)',
    options: [
      { value: '0', label: '0 - (>15 lpm)' },
      { value: '1', label: '1 - (10-15 lpm)' },
      { value: '2', label: '2 - (5-10 lpm)' },
      { value: '3', label: '3 - (<5 lpm)' },
    ],
  },
  {
    name: 'q2_3',
    label: '2.3 Status of Toilet Flushing',
    options: [
      { value: '0', label: '0 - Single flush (>12 litres)' },
      { value: '1', label: '1 - Single flush (10-12 litres)' },
      { value: '2', label: '2 - Dual flush (12 /6 litres)' },
      { value: '3', label: '3 - Dual flush (8 /4 litres)' },
    ],
  },
  {
    name: 'q2_4',
    label: '2.4 Status of Water Conservation Signage & Communication',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Signage in washrooms' },
      { value: '2', label: '2 - Signage in washrooms and other areas' },
      { value: '3', label: '3 - Signage plus monthly staff and tenant awareness sessions' },
    ],
  },
  {
    name: 'q2_5',
    label: '2.5 Status of Water Use in Cooling Tower',
    options: [
      { value: 'NA', label:'Not Applicable' },
      { value: '0', label: '0 - No submeter and/or single pass use' },
      { value: '1', label: '1 - Submeter and single pass use' },
      { value: '2', label: '2 - Submeter and water recirculation factor <3' },
      { value: '3', label: '3 - Submeter & water recirculation factor >3' },
    ],
  },
  {
    name: 'q2_6',
    label: '2.6 Status of Water Use Intensity',
    options: [
      { value: '0', label: '0 - (>60% more than best practice benchmark)' },
      { value: '1', label: '1 - (51-60% more than best practice benchmark)' },
      { value: '2', label: '2 - (11-40% more than best practice benchmark)' },
      { value: '3', label: '3 - (Within 10 % of best practice benchmark)' },
    ],
  },
];

function Page5WaterEfficiency() {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <Box className="centered-container">
      <Typography variant="h5" sx={{ mb: 2 }}>2) Water Efficiency</Typography>
      {questions.map(q => (
        <FormControl key={q.name} component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">{q.label} <span className="asterisk">*</span></FormLabel>
          <RadioGroup
            value={values[q.name] || ''}
            onChange={e => setFieldValue(q.name, e.target.value)}
          >
            {q.options.map(opt => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
          {touched[q.name] && errors[q.name] && (
            <Typography color="error" variant="caption">{errors[q.name]}</Typography>
          )}
        </FormControl>
      ))}
    </Box>
  );
}

export default Page5WaterEfficiency;