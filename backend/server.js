const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db"); // ✅ Use db.js with .env

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to receive form submissions
app.post("/api/submit", async (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO submissions (
      fullname, email, whatsapp, date, buildingname, maplink, unitscount,
      q1_1, q1_2, q1_3, q1_4,
      q2_1, q2_2, q2_3, q2_4, q2_5, q2_6,
      q3_1, q3_2, q3_3,
      q4_1, q4_2, q4_3,
      q5_1, q5_2, q5_3, q5_4,
      score_water_management, score_water_efficiency, score_groundwater, score_circularity, score_green_cover,
      created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11,
      $12, $13, $14, $15, $16, $17,
      $18, $19, $20,
      $21, $22, $23,
      $24, $25, $26, $27,
      $28, $29, $30, $31, $32,
      NOW()
    )
    RETURNING id;
  `;

  const values = [
    data.fullName,
    data.email,
    data.whatsapp,
    data.date,
    data.buildingName,
    data.mapLink,
    data.unitsCount,
    data.q1_1,
    data.q1_2,
    data.q1_3,
    data.q1_4,
    data.q2_1,
    data.q2_2,
    data.q2_3,
    data.q2_4,
    data.q2_5,
    data.q2_6,
    data.q3_1,
    data.q3_2,
    data.q3_3,
    data.q4_1,
    data.q4_2,
    data.q4_3,
    data.q5_1,
    data.q5_2,
    data.q5_3,
    data.q5_4,
    data.score_water_management,
    data.score_water_efficiency,
    data.score_groundwater,
    data.score_circularity,
    data.score_green_cover,
  ];

  try {
    const result = await pool.query(query, values);
    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
