import { useEffect, useState } from "react";

export default function GestionarArticulos() {
  const [plantillas, setPlantillas] = useState([]);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    // Cargar las plantillas disponibles
    fetch("/api/plantillas")
      .then((res) => res.json())
      .then((data) => setPlantillas(data))
      .catch((error) => console.error("Error al cargar plantillas:", error));
  }, []);

  const handleConvertToPDF = async (txtFileName) => {
    try {
      const response = await fetch("/api/generarPDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txtFileName }),
      });

      if (response.ok) {
        const { url } = await response.json();
        alert("PDF generado con éxito.");
        window.open(url, "_blank");
      } else {
        alert("Error generando el PDF.");
      }
    } catch (error) {
      console.error("Error en la solicitud de conversión:", error);
      alert("Error generando el PDF.");
    }
  };

  const handleSave = async () => {
    // Guardar cambios en la plantilla
    if (selectedPlantilla) {
      const response = await fetch("/api/plantillas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: selectedPlantilla.name, content: newContent }),
      });

      if (response.ok) {
        alert("Plantilla actualizada.");
        setSelectedPlantilla(null);
        setNewContent("");
        fetch("/api/plantillas") // Refrescar lista de plantillas
          .then((res) => res.json())
          .then((data) => setPlantillas(data));
      } else {
        alert("Error actualizando la plantilla.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Plantillas</h1>
      {plantillas.length === 0 ? (
        <p className="text-center text-gray-500">No hay plantillas disponibles.</p>
      ) : (
        <ul className="mb-4 space-y-4">
          {plantillas.map((plantilla) => (
            <li
              key={plantilla.name}
              className="flex justify-between items-center border p-4 rounded shadow-md"
            >
              <span className="font-medium">{plantilla.name}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedPlantilla(plantilla);
                    setNewContent(plantilla.content);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleConvertToPDF(plantilla.name)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Convertir a PDF
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedPlantilla && (
        <div>
          <h2 className="text-xl font-bold mb-2">Editando: {selectedPlantilla.name}</h2>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full h-40 p-2 border rounded mb-4"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
