import supabase from '../../../config/supaBaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Obtener la lista de usuarios (id, username y rol)
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
  } else if (req.method === 'PATCH') {
    const { userId, newRole } = req.body;

    if (!userId || !newRole) {
      return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
    }

    try {
      // Actualizar el rol del usuario
      const { error } = await supabase
        .from('users')
        .update({ rol: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error al actualizar el rol del usuario:', error);
        return res.status(500).json({ success: false, message: 'Error al actualizar el rol', details: error.message });
      }

      res.status(200).json({ success: true, message: 'Rol actualizado exitosamente' });
    } catch (error) {
      console.error('Error en la API de usuarios (PATCH):', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
