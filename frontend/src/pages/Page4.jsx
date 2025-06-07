import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const questions = [
  {
    key: 'q1_1',
    label: '1.1 Status of Water Policy',
    options: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Water policy making in progress' },
      { value: 2, label: 'Water Policy drafted' },
      { value: 3, label: 'Water Policy drafted & communicated to staff & tenants' },
    ],
  },
  {
    key: 'q1_2',
    label: '1.2 Status of Water Pledge',
    options: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Management have taken a water pledge' },
      { value: 2, label: 'Management + Facility Staff have taken a water pledge' },
      { value: 3, label: 'Management + Facility Staff + Tenants have taken a water pledge' },
    ],
  },
  {
    key: 'q1_3',
    label: '1.3 Status of Water Charter',
    options: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Water Charter drafting in progress' },
      { value: 2, label: 'Water Charter finalized' },
      { value: 3, label: 'Water Charter finalized and displayed in public' },
    ],
  },
  {
    key: 'q1_4',
    label: '1.4 Status of Water Saving Goals & Targets',
    options: [
      { value: 0, label: 'None' },
      { value: 1, label: 'Work in progress' },
      { value: 2, label: 'Water saving goals & targets have been set' },
      { value: 3, label: 'Water saving goals & targets communicated to staff & tenants' },
    ],
  },
];

function Page4({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q1_1: form.q1_1 ?? '',
    q1_2: form.q1_2 ?? '',
    q1_3: form.q1_3 ?? '',
    q1_4: form.q1_4 ?? '',
  });
  const [error, setError] = useState({});

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    let err = {};
    questions.forEach(q => {
      if (data[q.key] === '') err[q.key] = 'Required';
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'left' }}>
      <Typography variant="h5" gutterBottom color="primary">
        1) Water Management
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map(q => (
          <FormControl
            key={q.key}
            component="fieldset"
            sx={{ mt: 3, mb: 2, width: '100%', textAlign: 'left' }}
            error={!!error[q.key]}
          >
            <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1, textAlign: 'left' }}>
              {q.label}
            </FormLabel>
            <RadioGroup
              name={q.key}
              value={data[q.key]}
              onChange={handleChange}
              sx={{ textAlign: 'left' }}
            >
              {q.options.map(opt => (
                <FormControlLabel
                  key={opt.value}
                  value={String(opt.value)}
                  control={<Radio />}
                  label={`${opt.value} - ${opt.label}`}
                  sx={{ display: 'block', ml: 0, my: 0.5, textAlign: 'left' }}
                />
              ))}
            </RadioGroup>
            {error[q.key] && (
              <Typography color="error" variant="caption">
                {error[q.key]}
              </Typography>
            )}
          </FormControl>
        ))}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onBack}>Back</Button>
          <Button variant="contained" type="submit">Next</Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Page4;