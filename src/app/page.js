"use client";

import React, { useState, useEffect } from 'react';
import './globals.css';
import Header from './components/header';
import BoletinesPublicados from './components/boletinesPublicados';
import GeneradorBoletines from './components/generadorBoletines';
import { useUser } from './components/UserContext';

const LandingPage = () => {
  const { user } = useUser(); // Obtener información del usuario desde el contexto

  return (
    <div>
      {/* Encabezado con opciones de navegación */}
      <Header />

      {/* Sección de boletines publicados, visible para todos */}
      <BoletinesPublicados />

      {/* Generador de boletines, visible solo para administradores */}
      {user && user.role === 'admin' && (
        <GeneradorBoletines />
      )}

      {/* Mensaje para colaboradores, si aplica */}
      {user && user.role === 'colaborador' && (
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
        >
          Dirígete a VIGIFIA
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
