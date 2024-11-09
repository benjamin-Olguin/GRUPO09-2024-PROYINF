import { Pool } from 'pg';
import bcrypt from 'bcrypt';

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
    // Busca al usuario en la base de datos, incluyendo el rol
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      // Usuario no encontrado
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compara la contraseña ingresada con la contraseña hasheada almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Contraseña incorrecta
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Credenciales válidas, devuelve el rol del usuario
    res.status(200).json({ success: true, username: user.username, role: user.rol });
  } catch (error) {
    console.error('Error en la API de inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
