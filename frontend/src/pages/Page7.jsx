import React, { useState } from 'react';
import { Typography, Paper, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const questions = [
  {
    key: 'q4_1',
    label: '4.1 Status of Rainwater Harvesting',
    options: [
      { value: 0, label: '0 - None' },
      { value: 1, label: '1 - Roofwater harvesting from <50% of roof' },
      { value: 2, label: '2 - Roofwater harvesting from >50% of roof' },
      { value: 3, label: '3 - Roofwater harvesting + Non roof water harvesting' },
    ],
  },
  {
    key: 'q4_2',
    label: '4.2 Status of Greywater/Sewage Water Recycling or Reuse',
    options: [
      { value: 0, label: '0 - None' },
      { value: 1, label: '1 - Footprint area available for siting a facility' },
      { value: 2, label: '2 - Work in progress - designed and waiting to be constructed' },
      { value: 3, label: '3 - Greywater/Sewage recycling is operational' },
    ],
  },
  {
    key: 'q4_3',
    label: '4.3 Status of Collective Reverse Osmosis Treated Water',
    options: [
      { value: 0, label: '0 - No Reuse - Reject Water is Discharged' },
      { value: 1, label: '1 - Technically feasible to organize for non potable reuse' },
      { value: 2, label: '2 - Plans in place and to be executed' },
      { value: 3, label: '3 - Reject Water is being reused for non potable use' },
    ],
  },
];

function Page7({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q4_1: form.q4_1 ?? '',
    q4_2: form.q4_2 ?? '',
    q4_3: form.q4_3 ?? '',
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
      <Typography variant="h5" gutterBottom color="primary">4) Water Circularity Status</Typography>
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

export default Page7;