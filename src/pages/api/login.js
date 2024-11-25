import supabase from '../../../config/supaBaseClient';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username, password } = req.body;

  try {
    // Busca al usuario en Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (userError) {
      console.error('Error buscando al usuario:', userError);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compara la contraseña ingresada con la contraseña hasheada almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Credenciales válidas, devuelve el rol del usuario
    res.status(200).json({ success: true, username: user.username, role: user.rol });
  } catch (error) {
    console.error('Error en la API de inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
