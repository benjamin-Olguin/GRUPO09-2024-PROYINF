'use client';

import { useState } from "react";

const BoletinesForm = ({ onBoletinAdded }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoBoletin = { titulo, descripcion, url };

    try {
      const res = await fetch("/api/boletines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoBoletin),
      });

      if (res.ok) {
        onBoletinAdded();
        setTitulo("");
        setDescripcion("");
        setUrl("");
        alert("Boletín agregado correctamente.");
      } else {
        alert("Error al agregar el boletín.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el boletín.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título del boletín"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Descripción del boletín"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="URL del boletín"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar Boletín
      </button>
    </form>
  );
};

export default BoletinesForm;
