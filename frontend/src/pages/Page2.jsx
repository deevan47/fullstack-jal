import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

function Page2({ onNext, onBack, form }) {
  const [data, setData] = useState({
    fullName: form.fullName || "",
    email: form.email || "",
    whatsapp: form.whatsapp || "",
    date: form.date || "",
  });
  const [error, setError] = useState({});

  // Live validation for each field
  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!/^[A-Za-z\s]*$/.test(value)) {
          return "Name must contain only letters and spaces";
        }
        return "";
      case "email":
        if (value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value)) {
          return "Invalid email address";
        }
        return "";
      case "whatsapp":
        if (value && !/^\d{0,10}$/.test(value)) {
          return "Phone must be only digits and up to 10 digits";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow digits for whatsapp field
    if (name === "whatsapp") {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, "");
      setData((prev) => ({ ...prev, [name]: digitsOnly }));
      setError((prev) => ({
        ...prev,
        [name]: validateField(name, digitsOnly),
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};

    if (!data.fullName || !/^[A-Za-z\s]+$/.test(data.fullName)) {
      err.fullName = "Name must contain only letters and spaces";
    }
    if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(data.email)) {
      err.email = "Invalid email address";
    }
    if (!/^\d{10}$/.test(data.whatsapp)) {
      err.whatsapp = "Phone must be exactly 10 digits";
    }
    if (!data.date) {
      err.date = "Required";
    }

    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <div>
      <h1></h1>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          Contact Person Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name of Contact person"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            error={!!error.fullName}
            helperText={error.fullName}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email Address of Contact Person"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Whatsapp Number of Contact Person"
            name="whatsapp"
            type="tel"
            value={data.whatsapp}
            onChange={handleChange}
            error={!!error.whatsapp}
            helperText={error.whatsapp}
            fullWidth
            margin="normal"
            inputProps={{
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            required
          />
          <TextField
            label="Date of Assessment"
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
            error={!!error.date}
            helperText={error.date}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Page2;
