import React, { useState } from 'react';
import { Typography, Paper, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const questions = [
  {
    key: 'q3_1',
    label: '3.1 Status of Groundwater dependency expressed as percentage of total annual water consumed',
    options: [
      { value: 0, label: '0 - (>50%)' },
      { value: 1, label: '1 - (20-50%)' },
      { value: 2, label: '2 - (5-20%)' },
      { value: 3, label: '3 - (<5%)' },
    ],
  },
  {
    key: 'q3_2',
    label: '3.2 Status of Groundwater Extraction',
    options: [
      { value: 0, label: '0 - None' },
      { value: 1, label: '1 - Manual monitoring of pumped hours' },
      { value: 2, label: '2 - Manual metering' },
      { value: 3, label: '3 - Smart metering' },
    ],
  },
  {
    key: 'q3_3',
    label: '3.3 Status of Groundwater Recharge expressed as percentage of Groundwater extraction',
    options: [
      { value: 0, label: '0 - (<20%)' },
      { value: 1, label: '1 - (20-40%)' },
      { value: 2, label: '2 - (40-50%)' },
      { value: 3, label: '3 - (>50%)' },
    ],
  },
];

function Page6({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q3_1: form.q3_1 ?? '',
    q3_2: form.q3_2 ?? '',
    q3_3: form.q3_3 ?? '',
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
      <Typography variant="h5" gutterBottom color="primary">3) Groundwater Sustainability</Typography>
      <form onSubmit={handleSubmit}>
        {questions.map(q => (
          <FormControl key={q.key} component="fieldset" sx={{ mt: 2, width: '100%', textAlign: 'left' }} error={!!error[q.key]}>
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
                  label={opt.label}
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

export default Page6;