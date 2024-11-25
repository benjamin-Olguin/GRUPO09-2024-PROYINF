import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../app/components/UserContext';
import Header from '../app/components/header';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState({});
  const [error, setError] = useState(null);
  const { user } = useUser();
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

  const handleRoleChange = (userId, newRole) => {
    setUpdatedRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updates = Object.entries(updatedRoles).map(([userId, newRole]) => ({
        userId,
        newRole,
      }));

      for (const update of updates) {
        const response = await fetch('/api/usuarios', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(update),
        });

        const data = await response.json();

        if (!data.success) {
          alert(`Error al actualizar el usuario con ID ${update.userId}: ${data.message}`);
        }
      }

      // Actualiza la lista de usuarios en el estado
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) => ({
          ...usuario,
          rol: updatedRoles[usuario.id] || usuario.rol,
        }))
      );

      setUpdatedRoles({});
      alert('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios. Inténtalo de nuevo.');
    }
  };

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
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Username</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Rol</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Acciones</th>
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
                    <select
                      value={updatedRoles[usuario.id] || usuario.rol}
                      onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="colaborador">Colaborador</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    {/* Solo mostramos cambios pendientes */}
                    {updatedRoles[usuario.id] && <span>Cambio pendiente</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleSaveChanges}
          >
            Guardar Cambios
          </button>
        </>
      )}
    </div>
  );
}
