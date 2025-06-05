import React from 'react';
import { Field, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Page2Personal() {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Full Name */}
      <Field
        as={TextField}
        name="fullName"
        label="Full name of Contact person"
        variant="outlined"
        error={touched.fullName && Boolean(errors.fullName)}
        helperText={touched.fullName && errors.fullName}
        fullWidth
      />

      {/* Email */}
      <Field
        as={TextField}
        name="email"
        label="Email Address of contact person"
        variant="outlined"
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        fullWidth
      />

      {/* Whatsapp Number */}
      <Field
        as={TextField}
        name="whatsapp"
        label="Whatsapp number of contact person"
        variant="outlined"
        inputProps={{
          maxLength: 10,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          type: 'tel',
        }}
        error={touched.whatsapp && Boolean(errors.whatsapp)}
        helperText={touched.whatsapp && errors.whatsapp}
        fullWidth
        onInput={e => {
          e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
          setFieldValue('whatsapp', e.target.value);
        }}
        value={values.whatsapp}
      />

      {/* Date */}
      <Field
        as={TextField}
        name="date"
        label="Date of Assessment"
        type="date"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        error={touched.date && Boolean(errors.date)}
        helperText={touched.date && errors.date}
        fullWidth
      />
    </Box>
  );
}

export default Page2Personal;
