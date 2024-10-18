import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';  // Asegúrate de importar correctamente el archivo de configuración

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'users', // Define explícitamente el nombre de la tabla en la base de datos
  timestamps: false,  // Desactivar las columnas createdAt y updatedAt (opcional)
});

export default User;
