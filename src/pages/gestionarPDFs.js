import { useEffect, useState } from "react";
import Link from "next/link";

const GestionarPDFs = () => {
    const [pdfs, setPdfs] = useState([]);
    const [boletinName, setBoletinName] = useState(""); // Estado para el nombre del boletín

    useEffect(() => {
        // Cargar los PDFs disponibles
        fetch("/api/pdfs")
            .then((res) => res.json())
            .then((data) => setPdfs(data))
            .catch((error) => console.error("Error al cargar los PDFs:", error));
    }, []);

    const deletePdf = async (id) => {
        if (confirm("¿Estás seguro de eliminar este PDF?")) {
            const response = await fetch(`/api/pdfs?id=${id}`, { method: "DELETE" });
            if (response.ok) {
                setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
            } else {
                alert("Error eliminando el PDF");
            }
        }
    };

    const handleGenerateBoletin = async () => {
        if (!boletinName) {
            alert("Por favor, ingrese un nombre para el boletín.");
            return;
        }

        try {
            const response = await fetch("/api/generarBoletines", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: boletinName }),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Boletín generado con éxito.");
                window.open(data.path, "_blank"); // Abrir el boletín generado
                setBoletinName(""); // Limpiar el nombre ingresado después de generar
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Error al generar el boletín.");
            }
        } catch (error) {
            console.error("Error al generar el boletín:", error);
            alert("Error al generar el boletín.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Gestión de PDFs</h1>
            <div>
                <h2 className="text-lg font-bold mb-2">PDFs publicados:</h2>
                {pdfs.length === 0 ? (
                    <p className="text-center text-gray-500">No hay PDFs disponibles.</p>
                ) : (
                    <ul className="space-y-4">
                        {pdfs.map((pdf) => (
                            <li
                                key={pdf.id}
                                className="flex justify-between items-center bg-white p-4 rounded shadow-md border"
                            >
                                <a
                                    href={pdf.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline font-medium"
                                >
                                    {pdf.name}
                                </a>
                                <button
                                    onClick={() => deletePdf(pdf.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Generar Nuevo Boletín</h2>
                <label htmlFor="boletinName" className="block text-gray-700 font-bold mb-2">
                    Nombre del Boletín:
                </label>
                <input
                    type="text"
                    id="boletinName"
                    value={boletinName}
                    onChange={(e) => setBoletinName(e.target.value)}
                    placeholder="Escriba el nombre del boletín"
                    className="w-full p-2 border rounded mb-4"
                />
                <button
                    onClick={handleGenerateBoletin}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Generar Boletín
                </button>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
                <Link href="/gestionarArticulos">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                        Gestionar Artículos
                    </button>
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default GestionarPDFs;
