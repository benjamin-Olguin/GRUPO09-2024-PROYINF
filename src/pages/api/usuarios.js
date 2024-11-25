// /pages/api/usuarios.js
import supabase from '../../../config/supaBaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes GET' });
  }

  try {
    // Obtener la lista de usuarios (id, username y rol) desde la tabla `users`
    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, rol');

    if (error) {
      console.error('Error al obtener los usuarios:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener los usuarios', details: error.message });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error en la API de usuarios:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor', details: error.message });
  }
}
