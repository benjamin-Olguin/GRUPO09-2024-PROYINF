import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,  // Asegúrate de que tengas la variable DB_HOST en tu archivo .env
  dialect: 'postgres',        // Utilizar PostgreSQL como dialecto
  logging: false,             // Desactivar el logging de Sequelize (opcional)
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

export default sequelize;
