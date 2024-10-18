"use client";  // Add this line to specify it's a Client Component

import React, { useState } from 'react';
import './globals.css';  // Assuming you're using this for global styles.
import Header from './components/header';  // Importa tu nuevo componente Header
import BoletinesPublicados from './components/boletinesPublicados';  // Importa el componente de Boletines

const LandingPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);

  // Nueva función handleLogin que hace una solicitud al backend
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),  // Enviar los datos de login al backend
      });

      const data = await response.json();  // Recibir respuesta del backend
      if (data.success) {
        alert(data.message);

        // Establecer el estado dependiendo del tipo de usuario
        if (data.user.role === 'admin') {  // Asumiendo que "role" existe en el backend
          setIsAdmin(true);
          setIsCollaborator(false);
        } else if (data.user.role === 'collaborator') {
          setIsAdmin(false);
          setIsCollaborator(true);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Hubo un error al intentar iniciar sesión. Inténtalo nuevamente.');
    }
  };

  const handleSignUp = () => {
    alert('Redirigiendo a la página de registro.');
  };

  const handleBoletin = () => {
    alert('El boletín se generará pronto.');
  };

  return (
    <div>
      {/* Pasa la función handleLogin como prop */}
      <Header handleLogin={handleLogin} />

      {/* Otras secciones de la página */}
      <BoletinesPublicados />

      {isAdmin && (
        <div className="mt-5 bg-white bg-opacity-80 p-5 rounded-lg">
          <h2>Panel de Administrador</h2>
          <p>Generar nuevo boletín:</p>
          <input
            type="text"
            placeholder="Tema del boletín"
            className="my-3 p-3 w-[80%] max-w-[400px] border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Fuente para el boletín"
            className="my-3 p-3 w-[80%] max-w-[400px] border border-gray-300 rounded"
          />
          <button
            onClick={handleBoletin}
            className="my-3 p-3 w-[80%] max-w-[400px] bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          >
            Generar Boletín
          </button>

          <h3>Boletines Disponibles</h3>
          <p>No hay boletines para editar o borrar.</p>
        </div>
      )}

      {isCollaborator && (
        <div className="mt-5 bg-white bg-opacity-80 p-5 rounded-lg">
          <h2>Boletines en los que puedes colaborar</h2>
          <p>No hay boletines disponibles para colaboración en este momento.</p>
        </div>
      )}

      <footer className="mt-5">
        <a
          href="https://www.fia.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-bold underline"
        >
          Dirigete a la pagina de FIA
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
