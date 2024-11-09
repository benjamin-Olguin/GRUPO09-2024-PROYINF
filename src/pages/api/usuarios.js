// /pages/api/usuarios.js
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes GET' });
  }

  try {
    // Realizar consulta para obtener el id y nombre de usuario de todos los usuarios
    const result = await pool.query('SELECT id, username FROM users');
    res.status(200).json({ success: true, users: result.rows });
  } catch (error) {
    console.error('Error en la API de usuarios:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor', details: error.message });
  }
}
