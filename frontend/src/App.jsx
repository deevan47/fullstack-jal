import React, { useRef, useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Start from "./pages/Start";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Preview from "./pages/Preview";
import Banner from "./components/Banner";
import Success from "./pages/Success";
import sections from "./pages/sections";

const steps = [
  "Start",
  "Contact Details",
  "Apartment Details",
  "Water Management",
  "Water Efficiency",
  "Groundwater Sustainability",
  "Water Circularity",
  "Green Vegetation",
  "Preview",
  "Success",
];

// Default form state
function getDefaultForm() {
  return {
    fullName: "",
    email: "",
    whatsapp: "",
    date: "",
    buildingName: "",
    mapLink: "",
    unitsCount: null,

    // Initializing question fields as null for backend compatibility
    q1_1: null, q1_2: null, q1_3: null, q1_4: null,
    q2_1: null, q2_2: null, q2_3: null, q2_4: null, q2_5: null, q2_6: null,
    q3_1: null, q3_2: null, q3_3: null,
    q4_1: null, q4_2: null, q4_3: null,
    q5_1: null, q5_2: null, q5_3: null, q5_4: null,

    // Score fields
    score_water_management: null,
    score_water_efficiency: null,
    score_groundwater: null,
    score_circularity: null,
    score_green_cover: null,
  };
}

const initialForm = getDefaultForm();

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [clearDialog, setClearDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

  const handleNext = (data = {}) => {
    setForm((prev) => ({ ...prev, ...data }));
    setActiveStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClear = () => setClearDialog(true);
  const confirmClear = () => {
    setForm(getDefaultForm());
    setActiveStep(0);
    setClearDialog(false);
    setIsEditing(false);
  };
  const cancelClear = () => setClearDialog(false);
  const handleRestart = () => {
    setForm(getDefaultForm());
    setActiveStep(0);
    setIsEditing(false);
  };

  const handleSubmitDetailedForm = async () => {
    try {
      const formToSend = { ...form };

      const replacer = (key, value) => {
        if (
          value instanceof Window ||
          value instanceof HTMLElement ||
          value instanceof Event
        ) {
          console.warn(`Filtering non-serializable property: ${key}`);
          return undefined;
        }
        if (
          value &&
          typeof value === "object" &&
          value.current &&
          (value.current instanceof HTMLElement || value.current instanceof Window)
        ) {
          console.warn(`Filtering ref.current HTML element: ${key}`);
          return undefined;
        }
        if (typeof value === "function") {
          console.warn(`Filtering function property: ${key}`);
          return undefined;
        }
        return value;
      };

      Object.keys(formToSend).forEach((key) => {
        if (formToSend[key] === undefined) return;

        const value = formToSend[key];

        if (
          (key.startsWith("q") && key.includes("_")) ||
          key.startsWith("score_") ||
          key === "unitsCount"
        ) {
          if (value === null || value === undefined || value === "") {
            formToSend[key] = null;
          } else {
            const numVal = Number(value);
            formToSend[key] = !isNaN(numVal) ? numVal : null;
          }
        }
      });

      console.log("Sending form data:", formToSend);

      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://backend-8cq5.onrender.com";

      const jsonData = JSON.stringify(formToSend, replacer);

      const response = await fetch(`https://backend-8cq5.onrender.com/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Detailed form submitted successfully to /api/submit:", result);

      setActiveStep(steps.length - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Failed to submit the form. Error: ${error.message}. Please check your network or server logs and try again.`
      );
    }
  };

  const getStepContent = (step) => {
    const pageProps = {
      onNext: handleNext,
      onBack: handleBack,
      form,
      setForm,
      sections,
    };

    switch (step) {
      case 0:
        return <Start onNext={handleNext} />;
      case 1:
        return <Page2 {...pageProps} />;
      case 2:
        return <Page3 {...pageProps} />;
      case 3:
        return <Page4 {...pageProps} />;
      case 4:
        return <Page5 {...pageProps} />;
      case 5:
        return <Page6 {...pageProps} />;
      case 6:
        return <Page7 {...pageProps} />;
      case 7:
        return <Page8 {...pageProps} />;
      case 8:
        return (
          <Preview
            form={form}
            onEdit={() => {
              setActiveStep(1);
              setIsEditing(true);
            }}
            onSubmit={handleSubmitDetailedForm}
            sections={sections}
          />
        );
      case 9:
        return (
          <Success
            form={form}
            onRestart={handleRestart}
            sections={sections}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {activeStep !== 0 && activeStep !== steps.length - 1 && <Banner />}

      {activeStep !== steps.length - 1 && (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const isClickable = isEditing && index !== 0 && index !== steps.length - 1;
            return (
              <Step key={label}>
                <StepLabel
                  {...(isClickable
                    ? {
                        onClick: () => setActiveStep(index),
                        style: { cursor: "pointer" },
                      }
                    : {})}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}

      <Box sx={{ mt: 4 }} ref={formRef}>
        {getStepContent(activeStep)}
      </Box>

      {activeStep > 0 && activeStep < steps.length - 1 && (
        <Box sx={{ mt: 2, mb: 7, display: "flex", justifyContent: "space-between" }}>
          <Button color="error" variant="outlined" onClick={handleClear}>
            Clear Form
          </Button>
        </Box>
      )}

      <Dialog open={clearDialog} onClose={cancelClear}>
        <DialogTitle>Clear Form</DialogTitle>
        <DialogContent>
          This action will clear all form fields and cannot be undone. Would you like to
          proceed?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelClear}>Cancel</Button>
          <Button color="error" onClick={confirmClear}>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
