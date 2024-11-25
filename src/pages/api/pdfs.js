import fs from "fs";
import path from "path";

const pdfDirectory = path.join(process.cwd(), "public/pdfs");

export default function handler(req, res) {
  if (req.method === "GET") {
    // Devuelve la lista de PDFs
    try {
      const files = fs.readdirSync(pdfDirectory).map((file) => ({
        id: file,
        name: file,
        url: `/pdfs/${file}`,
      }));
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: "Error al leer los PDFs." });
    }
  } else if (req.method === "DELETE") {
    // Maneja la eliminación de un PDF
    const { id } = req.query;
    const filePath = path.join(pdfDirectory, id);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Elimina el archivo físicamente
        res.status(200).json({ message: "PDF eliminado correctamente." });
      } else {
        res.status(404).json({ error: "PDF no encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el PDF." });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
}
