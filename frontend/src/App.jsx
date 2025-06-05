import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Import your form page components and success page
import Page1Title from './components/Page1Title';
import Page2Personal from './components/Page2Personal';
import Page3Building from './components/Page3Building';
import Page4WaterManagement from './components/Page4WaterManagement';
import Page5WaterEfficiency from './components/Page5WaterEfficiency';
import Page6Groundwater from './components/Page6Groundwater';
import Page7Circularity from './components/Page7Circularity';
import Page8GreenCover from './components/Page8GreenCover';
import FormNavigation from './components/FormNavigation';
import SuccessPage from './components/SuccessPage';
import jalsmrutiBanner from './assets/jalsmruti-banner.png';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Please enter your full name. No numbers or symbols are allowed')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  whatsapp: Yup.string()
    .matches(/^\d{10}$/, 'Invalid phone number')
    .required('Required'),
  date: Yup.string().required('Required'),
  buildingName: Yup.string().required('Required'),
  mapLink: Yup.string()
    .matches(
      /^(https:\/\/(www\.)?google\.com\/maps|https:\/\/maps\.app\.goo\.gl\/)/,
      'Invalid link'
    )
    .required('Required'),
  unitsCount: Yup.number().required('Required'),
  q1_1: Yup.string().required('Required'),
  q1_2: Yup.string().required('Required'),
  q1_3: Yup.string().required('Required'),
  q1_4: Yup.string().required('Required'),
  q2_1: Yup.string().required('Required'),
  q2_2: Yup.string().required('Required'),
  q2_3: Yup.string().required('Required'),
  q2_4: Yup.string().required('Required'),
  q2_5: Yup.string().required('Required'),
  q2_6: Yup.string().required('Required'),
  q3_1: Yup.string().required('Required'),
  q3_2: Yup.string().required('Required'),
  q3_3: Yup.string().required('Required'),
  q4_1: Yup.string().required('Required'),
  q4_2: Yup.string().required('Required'),
  q4_3: Yup.string().required('Required'),
  q5_1: Yup.string().required('Required'),
  q5_2: Yup.string().required('Required'),
  q5_3: Yup.string().required('Required'),
  q5_4: Yup.string().required('Required'),
});

const initialValues = {
  fullName: '',
  email: '',
  whatsapp: '',
  date: '',
  buildingName: '',
  mapLink: '',
  unitsCount: '',
  // Page 4
  q1_1: '', q1_2: '', q1_3: '', q1_4: '',
  // Page 5
  q2_1: '', q2_2: '', q2_3: '', q2_4: '', q2_5: '', q2_6: '',
  // Page 6
  q3_1: '', q3_2: '', q3_3: '',
  // Page 7
  q4_1: '', q4_2: '', q4_3: '',
  // Page 8
  q5_1: '', q5_2: '', q5_3: '', q5_4: '',
};

function App() {
  const [page, setPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({});
  const totalPages = 8;

  const sectionKeys = {
    score_water_management: ['q1_1','q1_2','q1_3','q1_4'],
    score_water_efficiency: ['q2_1','q2_2','q2_3','q2_4','q2_5','q2_6'],
    score_groundwater: ['q3_1','q3_2','q3_3'],
    score_circularity: ['q4_1','q4_2','q4_3'],
    score_green_cover: ['q5_1','q5_2','q5_3','q5_4'],
  };

  function calculateSectionAvg(values, keys) {
    const valid = keys
      .map(k => values[k])
      .filter(v => v !== undefined && v !== '' && v !== 'NA');
    if (valid.length === 0) return 'NA';
    const sum = valid.reduce((acc, v) => acc + Number(v), 0);
    return (sum / valid.length).toFixed(2);
  }

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Submitting form...", values);
    const scores = {};
    Object.entries(sectionKeys).forEach(([key, keys]) => {
      scores[key] = calculateSectionAvg(values, keys);
    });

    const payload = { ...values, ...scores };

    const res = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setFormValues(payload);
      setSubmitted(true);
    } else {
      alert('Submission failed!');
    }
  };

  const handleClear = (resetForm) => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      resetForm();
      setPage(1);
      setSubmitted(false);
    }
  };

  const handleRestart = () => {
    setPage(1);
    setSubmitted(false);
    setFormValues({});
  };

  if (submitted) {
    return (
      <Container maxWidth="md">
        <SuccessPage values={formValues} onRestart={handleRestart} />
      </Container>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ borderRadius: 4, p: 4, boxShadow: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img
              src={jalsmrutiBanner}
              alt="Jal Smruti Banner"
              style={{
                maxWidth: '100%',
                borderRadius: '12px',
                marginBottom: '2rem',
                boxShadow: '0 2px 12px #0001'
              }}
            />
            <h1 className="big-title">Jal Smruti Apartment Building Water Scorecard Assessment Input Form</h1>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm, validateForm, errors, touched, setTouched }) => (
              <Form>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Progress: {Math.round((page / totalPages) * 100)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(page / totalPages) * 100}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" color="text.secondary" align="right">
                    Page {page} of {totalPages}
                  </Typography>
                </Box>
                {page === 1 && <Page1Title />}
                {page === 2 && <Page2Personal />}
                {page === 3 && <Page3Building />}
                {page === 4 && <Page4WaterManagement />}
                {page === 5 && <Page5WaterEfficiency />}
                {page === 6 && <Page6Groundwater />}
                {page === 7 && <Page7Circularity />}
                {page === 8 && <Page8GreenCover />}
                <FormNavigation
                  currentPage={page}
                  totalPages={totalPages}
                  setPage={setPage}
                  validateForm={validateForm}
                  errors={errors}
                  touched={touched}
                  setTouched={setTouched}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleClear(resetForm)}
                  >
                    Clear
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
