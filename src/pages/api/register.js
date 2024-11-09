// /pages/api/register.js
import bcrypt from 'bcrypt';
import { pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username, password } = req.body;

  try {
    // Verifica si el nombre de usuario ya existe
    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error en la API de registro:', error);
    res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
  }
}
