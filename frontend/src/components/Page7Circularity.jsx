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
    name: 'q4_1',
    label: '4.1 Status of Rainwater Harvesting',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Roofwater harvesting from <50% of roof' },
      { value: '2', label: '2 - Roofwater harvesting from >50% of roof' },
      { value: '3', label: '3 - Roofwater harvesting + Non roof water harvesting' },
    ],
  },
  {
    name: 'q4_2',
    label: '4.2 Status of Greywater/Sewage Water Recycling or Reuse',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Footprint area available for siting a facility' },
      { value: '2', label: '2 - Work in progress - designed and waiting to be constructed' },
      { value: '3', label: '3 - Greywater/Sewage recycling is operational' },
    ],
  },
  {
    name: 'q4_3',
    label: '4.3 Status of Collective Reverse Osmosis Treated Water',
    options: [
      { value: '0', label: '0 - No Reuse - Reject Water is Discharged' },
      { value: '1', label: '1 - Technically feasible to organize for non potable reuse' },
      { value: '2', label: '2 - Plans in place and to be executed' },
      { value: '3', label: '3 - Reject Water is being reused for non potable use' },
    ],
  },
];

function Page7Circularity() {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <Box className="centered-container">
      <Typography variant="h5" sx={{ mb: 2 }}>4) Water Circularity Status</Typography>
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

export default Page7Circularity;