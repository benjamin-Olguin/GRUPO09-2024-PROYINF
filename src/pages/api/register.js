import supabase from '../../../config/supaBaseClient';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username, password } = req.body;

  try {
    // Verifica si el nombre de usuario ya existe en Supabase
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (userCheckError && userCheckError.code !== 'PGRST116') {
      // Maneja errores diferentes a "no encontrado"
      return res.status(500).json({ 
        success: false, 
        message: 'Error checking user', 
        details: userCheckError.message 
      });
    }

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en Supabase
    const { data, error } = await supabase.from('users').insert([
      {
        username: username,
        password: hashedPassword, // Se almacena la contraseña hasheada
        rol: 'user', // Asigna un rol predeterminado, si corresponde
      },
    ]);

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating user',
        details: error.message,
      });
    }

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error en la API de registro:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      details: error.message,
    });
  }
}
