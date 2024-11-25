"use client";

import React, { useState } from 'react';
import './globals.css';
import Header from './components/header';
import BoletinesPublicados from './components/boletinesPublicados';

const LandingPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);

  const handleBoletin = () => {
    alert('El boletín se generará pronto.');
  };

  return (
    <div>
      {/* Encabezado con opciones de navegación */}
      <Header />

      {/* Otras secciones de la página */}
      <BoletinesPublicados />

      {/* Panel del Administrador */}
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

      {/* Panel del Colaborador */}
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
          Dirígete a la página de FIA
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
