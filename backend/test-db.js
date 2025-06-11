const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB time:', res.rows[0]);
    await pool.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
