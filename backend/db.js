const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'scorecard.db'));

db.serialize(() => {
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
});

module.exports = db;
