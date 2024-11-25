import { useEffect, useState } from 'react';

const BoletinesPublicados = () => {
    const [boletines, setBoletines] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null); // Maneja la vista previa del boletín

    useEffect(() => {
        fetch("/api/boletines") // Endpoint para cargar los boletines
            .then((res) => res.json())
            .then((data) => setBoletines(Array.isArray(data) ? data : []))
            .catch((error) => console.error("Error al cargar boletines:", error));
    }, []);

    const handlePreview = (url) => {
        setPreviewUrl(url); // Establece la URL para la vista previa
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-4">Boletines Publicados</h2>
            {boletines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {boletines.map((boletin) => (
                        <div
                            key={boletin.id}
                            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center"
                        >
                            <h2 className="text-lg font-bold mb-2">{boletin.titulo}</h2>
                            <button
                                onClick={() => handlePreview(boletin.url)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                Ver
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No hay publicaciones disponibles.</p>
            )}

            {previewUrl && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-center">Vista Previa</h2>
                    <iframe
                        src={previewUrl}
                        className="w-full h-[500px] bg-white border border-gray-300 rounded-lg shadow-md"
                    ></iframe>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setPreviewUrl(null)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoletinesPublicados;
