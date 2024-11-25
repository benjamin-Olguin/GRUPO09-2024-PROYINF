import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const txtDir = path.join(process.cwd(), "public/plantillas");
const outputDir = path.join(process.cwd(), "public/pdfs");

// Crear la carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { txtFileName } = req.body;

    try {
      const txtPath = path.join(txtDir, txtFileName);
      if (!fs.existsSync(txtPath)) {
        return res.status(404).json({ error: "Archivo .txt no encontrado." });
      }

      const txtContent = fs.readFileSync(txtPath, "utf-8");
      const pdfFileName = `${txtFileName.replace(".txt", ".pdf")}`;
      const pdfFilePath = path.join(outputDir, pdfFileName);

      // Crear el PDF
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(pdfFilePath);
      doc.pipe(stream);

      doc.fontSize(12).text(txtContent, {
        align: "left",
      });

      doc.end();

      // Esperar a que el PDF se guarde antes de responder
      stream.on("finish", () => {
        res.status(200).json({ url: `/pdfs/${pdfFileName}` });
      });

      stream.on("error", (error) => {
        console.error("Error al generar el PDF:", error);
        res.status(500).json({ error: "Error generando el PDF." });
      });
    } catch (error) {
      console.error("Error en la generación de PDF:", error);
      res.status(500).json({ error: "Error generando el PDF." });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
}
