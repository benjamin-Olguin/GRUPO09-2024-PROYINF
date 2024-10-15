import { NextResponse } from 'next/server';
import sequelize from '../../../../dbConfig';

export async function GET() {
  try {
    // Intentar conectarse a la base de datos
    await sequelize.authenticate();
    return NextResponse.json({ message: 'Conexión a la base de datos exitosa!' });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    return NextResponse.json({ message: 'Error conectando a la base de datos' }, { status: 500 });
  }
}
