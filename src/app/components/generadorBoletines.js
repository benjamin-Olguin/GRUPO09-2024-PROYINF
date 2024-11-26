'use client';

import React, { useState } from 'react';

const GeneradorBoletines = () => {
    const [region, setRegion] = useState('');
    const [contenido, setContenido] = useState('');
    const [mensaje, setMensaje] = useState('');

    const regionesDeChile = [
        'Arica y Parinacota',
        'Tarapacá',
        'Antofagasta',
        'Atacama',
        'Coquimbo',
        'Valparaíso',
        'Metropolitana de Santiago',
        'O’Higgins',
        'Maule',
        'Ñuble',
        'Biobío',
        'Araucanía',
        'Los Ríos',
        'Los Lagos',
        'Aysén',
        'Magallanes y la Antártica Chilena',
    ];

    const handleGenerarBoletin = () => {
        if (!region || !contenido) {
            setMensaje('Por favor, selecciona una región y escribe el contenido del boletín.');
            return;
        }
        
        // Aquí puedes manejar el envío de los datos, por ejemplo, a una API o al backend.
        alert(`Boletín generado para la región: ${region}\nContenido: ${contenido}`);
        setMensaje('Boletín enviado para revisión.');
        setRegion('');
        setContenido('');
    };

    return (
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md mt-5">
            <h2 className="text-2xl font-bold mb-4">Generador de Boletines</h2>

            <label htmlFor="region" className="block mb-2 font-medium">
                Selecciona tu región:
            </label>
            <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="">-- Selecciona una región --</option>
                {regionesDeChile.map((reg, index) => (
                    <option key={index} value={reg}>
                        {reg}
                    </option>
                ))}
            </select>

            <label htmlFor="contenido" className="block mb-2 font-medium">
                Escribe el contenido del boletín:
            </label>
            <textarea
                id="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                rows="5"
                placeholder="Describe el contenido que deseas incluir en tu boletín..."
            ></textarea>

            {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}

            <button
                onClick={handleGenerarBoletin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Generar Boletín
            </button>
        </div>
    );
};

export default GeneradorBoletines;
