// /pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserDispatch } from '../app/components/UserContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useUserDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        // Enviar tanto username como role en el payload
        dispatch({ type: 'LOGIN', payload: { username: data.username, role: data.role } });
        router.push('/');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error en el servidor. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
