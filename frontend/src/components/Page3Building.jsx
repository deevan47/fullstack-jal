import React from 'react';
import { Field, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Page3Building() {
  const { errors, touched } = useFormikContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Field
        as={TextField}
        name="buildingName"
        label="Name and Full address of the Apartment Building"
        variant="outlined"
        error={touched.buildingName && Boolean(errors.buildingName)}
        helperText={touched.buildingName && errors.buildingName}
        fullWidth
      />
      <Field
        as={TextField}
        name="mapLink"
        label="Google map location link of the Apartment Building being assessed"
        variant="outlined"
        error={touched.mapLink && Boolean(errors.mapLink)}
        helperText={touched.mapLink && errors.mapLink}
        fullWidth
      />
      <Field
        as={TextField}
        name="unitsCount"
        label="How many Units/Flats in the Apartment Building"
        type="number"
        variant="outlined"
        error={touched.unitsCount && Boolean(errors.unitsCount)}
        helperText={touched.unitsCount && errors.unitsCount}
        fullWidth
      />
    </Box>
  );
}

export default Page3Building;
