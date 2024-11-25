"use client";  // Marca como un componente de cliente

import React from 'react';

const BoletinesPublicados = () => {
  return (
    <div className="mt-5 bg-white bg-opacity-80 p-5 rounded-lg">
      <h2>Boletines Publicados</h2>
      <p>No hay publicaciones.</p>
      <input
        type="text"
        placeholder="Buscar boletín..."
        className="my-3 p-3 w-[80%] max-w-[400px] border border-gray-300 rounded"
      />
    </div>
  );
};

export default BoletinesPublicados;
