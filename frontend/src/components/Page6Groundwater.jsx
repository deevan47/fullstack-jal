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
    name: 'q3_1',
    label: '3.1 Status of Groundwater dependency expressed as percentage of total annual water consumed',
    options: [
      { value: '0', label: '0 - (>50 %)' },
      { value: '1', label: '1 - (20-50%)' },
      { value: '2', label: '2 - (5-20%)' },
      { value: '3', label: '3 - (<5%)' },
    ],
  },
  {
    name: 'q3_2',
    label: '3.2 Status of Groundwater Extraction',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Manual monitoring of pumped hours' },
      { value: '2', label: '2 - Manual metering' },
      { value: '3', label: '3 - Smart metering' },
    ],
  },
  {
    name: 'q3_3',
    label: '3.3 Status of Groundwater Recharge expressed as percentage of Groundwater extraction',
    options: [
      { value: '0', label: '0 - (<20%)' },
      { value: '1', label: '1 - (20-40%)' },
      { value: '2', label: '2 - (40-50%)' },
      { value: '3', label: '3 - (>50%)' },
    ],
  },
];

function Page6Groundwater() {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <Box className="centered-container">
      <Typography variant="h5" sx={{ mb: 2 }}>3) Groundwater Sustainability</Typography>
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

export default Page6Groundwater;