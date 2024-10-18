import bcrypt from 'bcrypt';
import User from './models/user.js'; // Importar el modelo de User

// Función de login usando Sequelize
async function handleLogin(username, password) {
  try {
    // Buscar el usuario por nombre de usuario usando Sequelize
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    // Verificar la contraseña usando bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return { success: true, message: 'Login exitoso', user };
    } else {
      return { success: false, message: 'Contraseña incorrecta' };
    }
  } catch (error) {
    console.error('Error al manejar el login:', error);
    return { success: false, message: 'Error interno del servidor' };
  }
}

export { handleLogin };
