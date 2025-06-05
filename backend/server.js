const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('./scorecard.db');

app.use(cors());
app.use(express.json());

// Create the submissions table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT,
    whatsapp TEXT,
    date TEXT,
    buildingName TEXT,
    mapLink TEXT,
    unitsCount INTEGER,
    q1_1 TEXT, q1_2 TEXT, q1_3 TEXT, q1_4 TEXT,
    q2_1 TEXT, q2_2 TEXT, q2_3 TEXT, q2_4 TEXT, q2_5 TEXT, q2_6 TEXT,
    q3_1 TEXT, q3_2 TEXT, q3_3 TEXT,
    q4_1 TEXT, q4_2 TEXT, q4_3 TEXT,
    q5_1 TEXT, q5_2 TEXT, q5_3 TEXT, q5_4 TEXT,
    score_water_management REAL,
    score_water_efficiency REAL,
    score_groundwater REAL,
    score_circularity REAL,
    score_green_cover REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Save a submission
app.post('/api/submit', (req, res) => {
  const data = req.body;
  const stmt = db.prepare(`
    INSERT INTO submissions (
      fullName, email, whatsapp, date, buildingName, mapLink, unitsCount,
      q1_1, q1_2, q1_3, q1_4,
      q2_1, q2_2, q2_3, q2_4, q2_5, q2_6,
      q3_1, q3_2, q3_3,
      q4_1, q4_2, q4_3,
      q5_1, q5_2, q5_3, q5_4,
      score_water_management, score_water_efficiency, score_groundwater, score_circularity, score_green_cover
    ) VALUES (?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `);

  stmt.run([
    data.fullName, data.email, data.whatsapp, data.date, data.buildingName, data.mapLink, data.unitsCount,
    data.q1_1, data.q1_2, data.q1_3, data.q1_4,
    data.q2_1, data.q2_2, data.q2_3, data.q2_4, data.q2_5, data.q2_6,
    data.q3_1, data.q3_2, data.q3_3,
    data.q4_1, data.q4_2, data.q4_3,
    data.q5_1, data.q5_2, data.q5_3, data.q5_4,
    data.score_water_management, data.score_water_efficiency, data.score_groundwater, data.score_circularity, data.score_green_cover
  ], function(err) {
    if (err) {
      console.error('DB Error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id: this.lastID });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));