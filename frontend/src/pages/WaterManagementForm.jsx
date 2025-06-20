import React, { useState } from "react";

const initialFormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  date: "",
  buildingname: "",
  maplink: "",
  unitscount: "",
  q1_1: "",
  q1_2: "",
  q1_3: "",
  q1_4: "",
  q2_1: "",
  q2_2: "",
  q2_3: "",
  q2_4: "",
  q2_5: "",
  q2_6: "",
  q3_1: "",
  q3_2: "",
  q3_3: "",
  q4_1: "",
  q4_2: "",
  q4_3: "",
  q5_1: "",
  q5_2: "",
  q5_3: "",
  q5_4: "",
};

export default function WaterManagementForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    

    if (!formData.fullName || !formData.email) {
      setErrorMsg("Please fill in your full name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://backend-8cq5.onrender.com/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Form submitted successfully!");
        setFormData(initialFormState);
      } else {
        setErrorMsg(data.message || "Failed to submit the form.");
      }
    } catch (err) {
      setErrorMsg("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Water Management Form</h2>
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>

        {/* Basic user info */}
        <label>
          Full Name*:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email*:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          WhatsApp:
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Building Name:
          <input
            type="text"
            name="buildingname"
            value={formData.buildingname}
            onChange={handleChange}
          />
        </label>

        <label>
          Map Link:
          <input
            type="url"
            name="maplink"
            value={formData.maplink}
            onChange={handleChange}
          />
        </label>

        <label>
          Units Count:
          <input
            type="number"
            name="units"
            value={formData.unitscount}
            onChange={handleChange}
            min="0"
          />
        </label>

        {/* Questions*/}
        <fieldset>
          <legend>Question 1</legend>
          <label>
            Q1.1:
            <input
              type="text"
              name="q1_1"
              value={formData.q1_1}
              onChange={handleChange}
            />
          </label>
          <label>
            Q1.2:
            <input
              type="text"
              name="q1_2"
              value={formData.q1_2}
              onChange={handleChange}
            />
          </label>
          <label>
            Q1.3:
            <input
              type="text"
              name="q1_3"
              value={formData.q1_3}
              onChange={handleChange}
            />
          </label>
          <label>
            Q1.4:
            <input
              type="text"
              name="q1_4"
              value={formData.q1_4}
              onChange={handleChange}
            />
          </label>
        </fieldset>


        <fieldset>
          <legend>Question 2</legend>
          <label>
            Q2.1:
            <input
              type="text"
              name="q2_1"
              value={formData.q2_1}
              onChange={handleChange}
            />
          </label>
          <label>
            Q2.2:
            <input
              type="text"
              name="q2_2"
              value={formData.q2_2}
              onChange={handleChange}
            />
          </label>
          <label>
            Q2.3:
            <input
              type="text"
              name="q2_3"
              value={formData.q2_3}
              onChange={handleChange}
            />
          </label>
          <label>
            Q2.4:
            <input
              type="text"
              name="q2_4"
              value={formData.q2_4}
              onChange={handleChange}
            />
          </label>
          <label>
            Q2.5:
            <input
              type="text"
              name="q2_5"
              value={formData.q2_5}
              onChange={handleChange}
            />
          </label>
          <label>
            Q2.6:
            <input
              type="text"
              name="q2_6"
              value={formData.q2_6}
              onChange={handleChange}
            />
          </label>
        </fieldset>


        <fieldset>
          <legend>Question 3</legend>
          <label>
            Q3.1:
            <input
              type="text"
              name="q3_1"
              value={formData.q3_1}
              onChange={handleChange}
            />
          </label>
          <label>
            Q3.2:
            <input
              type="text"
              name="q3_2"
              value={formData.q3_2}
              onChange={handleChange}
            />
          </label>
          <label>
            Q3.3:
            <input
              type="text"
              name="q3_3"
              value={formData.q3_3}
              onChange={handleChange}
            />
          </label>
        </fieldset>


        <fieldset>
          <legend>Question 4</legend>
          <label>
            Q4.1:
            <input
              type="text"
              name="q4_1"
              value={formData.q4_1}
              onChange={handleChange}
            />
          </label>
          <label>
            Q4.2:
            <input
              type="text"
              name="q4_2"
              value={formData.q4_2}
              onChange={handleChange}
            />
          </label>
          <label>
            Q4.3:
            <input
              type="text"
              name="q4_3"
              value={formData.q4_3}
              onChange={handleChange}
            />
          </label>
        </fieldset>


        <fieldset>
          <legend>Question 5</legend>
          <label>
            Q5.1:
            <input
              type="text"
              name="q5_1"
              value={formData.q5_1}
              onChange={handleChange}
            />
          </label>
          <label>
            Q5.2:
            <input
              type="text"
              name="q5_2"
              value={formData.q5_2}
              onChange={handleChange}
            />
          </label>
          <label>
            Q5.3:
            <input
              type="text"
              name="q5_3"
              value={formData.q5_3}
              onChange={handleChange}
            />
          </label>
          <label>
            Q5.4:
            <input
              type="text"
              name="q5_4"
              value={formData.q5_4}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
