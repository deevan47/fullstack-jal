import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

function Page3({ onNext, onBack, form }) {
  const [data, setData] = useState({
    apartmentName: form.apartmentName || "",
    mapLink: form.mapLink || "",
    units: form.units || "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "units") {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, "");
      setData((prev) => ({ ...prev, [name]: digitsOnly }));
      setError((prev) => ({ ...prev, [name]: digitsOnly ? "" : "Required" }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "mapLink":
        if (
          !/^https?:\/\/(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/.test(
            value
          ) &&
          !/^https?:\/\/google\.com\/maps/.test(value) &&
          !/^https?:\/\/maps\.app\.goo\.gl/.test(value)
        ) {
          return "Please enter a valid Google Maps link";
        }
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    if (!data.apartmentName) err.apartmentName = "Required";
    if (!data.mapLink || validateField("mapLink", data.mapLink))
      err.mapLink = validateField("mapLink", data.mapLink) || "Required";
    if (!data.units || !/^\d+$/.test(data.units)) err.units = "Required";
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  const handleUnitsChange = (delta) => {
    setData((prev) => {
      let newUnits = parseInt(prev.units || "0", 10) + delta;
      if (newUnits < 0) newUnits = 0;
      return { ...prev, units: String(newUnits) };
    });
    setError((prev) => ({ ...prev, units: "" }));
  };

  return (
    <div>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom color="primary">
          About the Apartment Building being Assessed
        </Typography>{" "}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name and Full Address of the Apartment Building"
            name="apartmentName"
            value={data.apartmentName}
            onChange={handleChange}
            error={!!error.apartmentName}
            helperText={error.apartmentName}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Google map location link of the Apartment Building being assessed *"
            name="mapLink"
            value={data.mapLink}
            onChange={handleChange}
            error={!!error.mapLink}
            helperText={error.mapLink}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="How many Units/Flats in the Apartment Building *"
            name="units"
            type="number"
            value={data.units}
            onChange={handleChange}
            error={!!error.units}
            helperText={error.units}
            fullWidth
            margin="normal"
            inputProps={{ min: 0, step: 1 }}
            required
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={onBack}>
              Previous
            </Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Page3;
