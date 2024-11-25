// /pages/usuarios.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../app/components/UserContext';
import Header from '../app/components/header';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Obtén el usuario actual
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role !== 'admin') {
        router.push('/'); // Redirige si el usuario no es admin
      } else {
        const fetchUsuarios = async () => {
          try {
            const response = await fetch('/api/usuarios');
            const data = await response.json();

            if (data.success) {
              setUsuarios(data.users);
            } else {
              setError(data.message);
            }
          } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            setError('Error al cargar los usuarios');
          }
        };
        fetchUsuarios();
      }
    }
  }, [user, router]);

  if (!user) {
    return <p>Cargando...</p>;
  }

  if (user.role !== 'admin') {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Header />
      <h2>Lista de Usuarios</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Username</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  {usuario.id}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  {usuario.username}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  {usuario.rol}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
