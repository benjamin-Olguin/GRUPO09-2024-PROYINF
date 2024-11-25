import { useEffect, useState } from "react";
import Link from "next/link";

export default function GestionarPDFs() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestión de PDFs</h1>
      {pdfs.length === 0 ? (
        <p className="text-center text-gray-500">No hay PDFs disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {pdfs.map((pdf) => (
            <li key={pdf.id} className="flex justify-between items-center border-b pb-2">
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
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex justify-center space-x-4">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </button>
        </Link>
        <Link href="/gestionarArticulos">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Gestionar Artículos
          </button>
        </Link>
      </div>
    </div>
  );
}
