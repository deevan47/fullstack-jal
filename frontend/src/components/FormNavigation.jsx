import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

const pageFields = [
  
  ['fullName', 'email', 'whatsapp', 'date'], 
  ['buildingName', 'mapLink', 'unitsCount'], 
  ['q1_1', 'q1_2', 'q1_3', 'q1_4'], 
  ['q2_1', 'q2_2', 'q2_3', 'q2_4', 'q2_5', 'q2_6'], 
  ['q3_1', 'q3_2', 'q3_3'], 
  ['q4_1', 'q4_2', 'q4_3'], 
  ['q5_1', 'q5_2', 'q5_3', 'q5_4'], 
];

function FormNavigation({ currentPage, setPage, validateForm, setTouched }) {
  const totalPages = pageFields.length;
  const { values } = useFormikContext();

  const handleNext = async () => {
    const fields = pageFields[currentPage - 1];
    setTouched(
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      true
    );
    const allErrors = await validateForm();
    const hasError = fields.some(field => allErrors[field]);
    if (!hasError) {
      setPage(currentPage + 1);
    }
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const allErrors = await validateForm();
    if (Object.keys(allErrors).length === 0) {
      document.querySelector('form').requestSubmit();
      return;
    }
    for (let i = 0; i < pageFields.length; i++) {
      if (pageFields[i].some(field => allErrors[field])) {
        setTouched(pageFields[i].reduce((acc, f) => ({ ...acc, [f]: true }), {}), true);
        setPage(i + 1);
        return;
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button
        variant="contained"
        color="secondary"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        Previous
      </Button>
      {currentPage === totalPages ? (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleSubmitClick}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleNext}
        >
          Next
        </Button>
      )}
    </Box>
  );
}

export default FormNavigation;