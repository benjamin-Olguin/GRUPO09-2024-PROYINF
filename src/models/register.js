import bcrypt from 'bcrypt';
import User from './user';  // Asegúrate de que el modelo User esté correctamente importado

// Función para registrar un nuevo usuario
export async function registerUser(username, password) {
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    return { success: true, userId: newUser.id };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return { success: false, message: 'Error al registrar el usuario' };
  }
}
