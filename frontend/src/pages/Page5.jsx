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
    key: 'q2_1',
    label: '2.1 Status of Water Metering',
    options: [
      { value: 0, label: '0 - Bulk water meter' },
      { value: 1, label: '1 - Bulk meter + submeter' },
      { value: 2, label: '2 - Bulk meter + submeter + monthly or weekly monitoring' },
      { value: 3, label: '3 - Smart water sub meters' },
    ],
  },
  {
    key: 'q2_2',
    label: '2.2 Status of Water Fixtures (Average) Flow Rate in liters per minute (lpm)',
    options: [
      { value: 0, label: '0 - (>15 lpm)' },
      { value: 1, label: '1 - (10-15 lpm)' },
      { value: 2, label: '2 - (5-10 lpm)' },
      { value: 3, label: '3 - (<5 lpm)' },
    ],
  },
  {
    key: 'q2_3',
    label: '2.3 Status of Toilet Flushing',
    options: [
      { value: 0, label: '0 - Single flush (>12 litres)' },
      { value: 1, label: '1 - Single flush (10-12 litres)' },
      { value: 2, label: '2 - Dual flush (12 /6 litres)' },
      { value: 3, label: '3 - Dual flush (8 /4 litres)' },
    ],
  },
  {
    key: 'q2_4',
    label: '2.4 Status of Water Conservation Signage & Communication',
    options: [
      { value: 0, label: '0 - None' },
      { value: 1, label: '1 - Signage in washrooms' },
      { value: 2, label: '2 - Signage in washrooms and other areas' },
      { value: 3, label: '3 - Signage plus monthly staff and tenant awareness sessions' },
    ],
  },
  {
    key: 'q2_5',
    label: '2.5 Status of Water Use in Cooling Tower',
    options: [
      { value: -1, label: 'Not Applicable' },
      { value: 0, label: '0 - No submeter and/or single pass use' },
      { value: 1, label: '1 - Submeter and single pass use' },
      { value: 2, label: '2 - Submeter and water recirculation factor <3' },
      { value: 3, label: '3 - Submeter & water recirculation factor >3' },
    ],
  },
  {
    key: 'q2_6',
    label: '2.6 Status of Water Use Intensity',
    options: [
      { value: 0, label: '0 - (>60% more than best practice benchmark)' },
      { value: 1, label: '1 - (51-60% more than best practice benchmark)' },
      { value: 2, label: '2 - (11-40% more than best practice benchmark)' },
      { value: 3, label: '3 - (Within 10% of best practice benchmark)' },
    ],
  },
];

function Page5({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q2_1: form.q2_1 ?? '',
    q2_2: form.q2_2 ?? '',
    q2_3: form.q2_3 ?? '',
    q2_4: form.q2_4 ?? '',
    q2_5: form.q2_5 ?? '',
    q2_6: form.q2_6 ?? '',
  });
  const [error, setError] = useState({});

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    let err = {};
    questions.forEach(q => {
      // Not Applicable (-1) is allowed, but empty is not
      if (data[q.key] === '') err[q.key] = 'Required';
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'left' }}>
      <Typography variant="h5" gutterBottom color="primary">
        2) Water Efficiency
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

export default Page5;