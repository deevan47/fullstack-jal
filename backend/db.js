const { Pool } = require('pg');
require('dotenv').config();

<<<<<<< HEAD
const db = new sqlite3.Database(path.resolve(__dirname, 'scorecard.db'));

db.serialize(() => {
  db.run(`
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
});




module.exports = db;
=======
const pool = new Pool({
  user: process.env.PG_USER,       
  host: process.env.PG_HOST,       
  database: process.env.PG_DATABASE, 
  password: process.env.PG_PASSWORD, 
  port: process.env.PG_PORT,       
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL pool error:', err);
});

module.exports = pool;
>>>>>>> 6e26362 (SQL to postgresql)
