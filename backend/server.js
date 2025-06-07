// backend/server.js

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });

  stmt.finalize();
});

app.get('/api/submissions', (req, res) => {
  db.all('SELECT * FROM submissions ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
