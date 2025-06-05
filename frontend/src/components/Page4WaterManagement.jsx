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
    name: 'q1_1',
    label: '1.1 Status of Water Policy',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Water policy making in progress' },
      { value: '2', label: '2 - Water Policy drafted' },
      { value: '3', label: '3 - Water Policy drafted & communicated to staff & tenants' },
    ],
  },
  {
    name: 'q1_2',
    label: '1.2 Status of Water Pledge',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Management have taken a water pledge' },
      { value: '2', label: '2- Management + Facility Staff have taken a water pledge' },
      { value: '3', label: '3- Management + Facility Staff+Tenants have taken a water pledge' },
    ],
  },
  {
    name: 'q1_3',
    label: '1.3 Status of Water Charter',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Water Charter drafting in progress' },
      { value: '2', label: '2 - Water Charter finalized' },
      { value: '3', label: '3 - Water Charter finalized and displayed in public' },
    ],
  },
  {
    name: 'q1_4',
    label: '1.4 Status of Water Saving Goals & Targets',
    options: [
      { value: '0', label: '0 - None' },
      { value: '1', label: '1 - Work in progress' },
      { value: '2', label: '2 - Water saving goals & targets have been set' },
      { value: '3', label: '3 - Water saving goals & targets communicated to staff & tenants' },
    ],
  },
];

function Page4WaterManagement() {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>1) Water Management</Typography>
      {questions.map(q => (
        <FormControl key={q.name} component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">{q.label}</FormLabel>
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

export default Page4WaterManagement;