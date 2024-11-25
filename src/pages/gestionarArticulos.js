import { useEffect, useState } from "react";

export default function GestionarArticulos() {
  const [plantillas, setPlantillas] = useState([]);
  const [pdfNames, setPdfNames] = useState({});
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    // Cargar las plantillas disponibles
    fetch("/api/plantillas")
      .then((res) => res.json())
      .then((data) => {
        setPlantillas(data);
        const initialPdfNames = {};
        data.forEach((plantilla) => {
          initialPdfNames[plantilla.name] = ""; // Inicializar los nombres de PDFs
        });
        setPdfNames(initialPdfNames);
      })
      .catch((error) => console.error("Error al cargar plantillas:", error));
  }, []);

  const handlePdfNameChange = (name, value) => {
    setPdfNames((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratePDF = async (txtFileName) => {
    const pdfName = pdfNames[txtFileName];
    if (!pdfName) {
      alert("Por favor, escribe un nombre para el PDF.");
      return;
    }

    try {
      const response = await fetch("/api/generarPDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txtFileName, pdfName }),
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

  const handleEdit = (plantilla) => {
    setSelectedPlantilla(plantilla);
    setEditContent(plantilla.content); // Inicializar el contenido editable
  };

  const handleSave = async () => {
    if (selectedPlantilla) {
      try {
        const response = await fetch("/api/plantillas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: selectedPlantilla.name, content: editContent }),
        });

        if (response.ok) {
          alert("Plantilla actualizada con éxito.");
          setSelectedPlantilla(null);
          setEditContent("");
          fetch("/api/plantillas") // Refrescar lista de plantillas
            .then((res) => res.json())
            .then((data) => setPlantillas(data));
        } else {
          alert("Error al guardar la plantilla.");
        }
      } catch (error) {
        console.error("Error al guardar la plantilla:", error);
        alert("Error al guardar la plantilla.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Artículos</h1>
      {plantillas.length === 0 ? (
        <p className="text-center text-gray-500">No hay plantillas disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {plantillas.map((plantilla) => (
            <li
              key={plantilla.name}
              className="bg-white p-4 rounded shadow-md border space-y-2"
            >
              <a
                href={`/plantillas/${plantilla.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline font-medium block"
              >
                {plantilla.name}
              </a>
              <input
                type="text"
                placeholder="Nombre del PDF"
                value={pdfNames[plantilla.name] || ""}
                onChange={(e) => handlePdfNameChange(plantilla.name, e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleGeneratePDF(plantilla.name)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Generar PDF
                </button>
                <button
                  onClick={() => handleEdit(plantilla)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedPlantilla && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">
            Editando: {selectedPlantilla.name}
          </h2>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-40 p-2 border rounded mb-4"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
