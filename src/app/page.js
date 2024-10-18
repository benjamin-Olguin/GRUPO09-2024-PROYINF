"use client";  // Add this line to specify it's a Client Component

import React, { useState } from 'react';
import './globals.css';  // Assuming you're using this for global styles.
import Header from './components/header';  // Importa tu nuevo componente Header
import BoletinesPublicados from './components/boletinesPublicados';  // Importa el componente de Boletines

const LandingPage = () => {
  // Definir los estados de isAdmin e isCollaborator
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);

  const handleLogin = (idInput) => {
    if (idInput === '1') {
      setIsAdmin(true);
      setIsCollaborator(false);
      alert('Has iniciado sesión como administrador.');
    } else if (idInput === '2') {
      setIsAdmin(false);
      setIsCollaborator(true);
      alert('Has iniciado sesión como colaborador.');
    } else {
      alert('ID no válido. Por favor, intenta de nuevo.');
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
