import React, { useState } from 'react';
import { Typography, Paper, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const questions = [
  {
    key: 'q5_1',
    label: '5.1 Status of Green Cover Policy',
    options: [
      { value: 0, label: '0 - None' },
      { value: 1, label: '1 - Green Cover Policy drafting in progress' },
      { value: 2, label: '2 - Green Cover Policy finalized' },
      { value: 3, label: '3 - Green Cover Policy finalized and shared with stakeholders' },
    ],
  },
  {
    key: 'q5_2',
    label: '5.2 Status of Green Coverage Area',
    options: [
      { value: 0, label: '0 - (<10%)' },
      { value: 1, label: '1 - (10-25%)' },
      { value: 2, label: '2 - (25-50%)' },
      { value: 3, label: '3 - (>50%)' },
    ],
  },
  {
    key: 'q5_3',
    label: '5.3 Status of Green Landscapes',
    options: [
      { value: 0, label: '0 - High water using non-native species + no smart irrigation' },
      { value: 1, label: '1 - High water using non-native species + smart irrigation' },
      { value: 2, label: '2 - Native species + no smart irrigation' },
      { value: 3, label: '3 - Native species + smart irrigation' },
    ],
  },
  {
    key: 'q5_4',
    label: '5.4 Status of Green Roofs & Green Walls',
    options: [
      { value: 0, label: '0 - None' },
      { value: 1, label: '1 - Plans for Green Roofs & Green Walls in place' },
      { value: 2, label: '2 - Green Roofs operational' },
      { value: 3, label: '3 - Green Roofs + Green Walls operational' },
    ],
  },
];

function Page8({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q5_1: form.q5_1 || '',
    q5_2: form.q5_2 || '',
    q5_3: form.q5_3 || '',
    q5_4: form.q5_4 || '',
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
      <Typography variant="h5" gutterBottom color="primary">5) Status of Green Vegetation Cover</Typography>
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
          <Button variant="contained" type="submit">Finish</Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Page8;