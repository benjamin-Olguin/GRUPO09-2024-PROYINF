import { registerUser } from './register'; // Asume que ya tienes el archivo register.js que maneja el registro de usuarios

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    // Llama a la función registerUser para agregar el usuario a la base de datos
    const result = await registerUser(username, password);
    
    if (result.success) {
      res.status(200).json({ success: true, message: 'Usuario registrado exitosamente' });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
