// /pages/api/test-db.js
import { pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  try {
    // Realiza una consulta simple para probar la conexión
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ success: true, timestamp: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection error' });
  }
}
