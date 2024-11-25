import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { txtFileName, pdfName } = req.body;

    if (!txtFileName || !pdfName) {
      return res.status(400).json({ error: "Faltan parámetros necesarios." });
    }

    try {
      const txtPath = path.join(process.cwd(), "public", "plantillas", txtFileName);
      const pdfPath = path.join(process.cwd(), "public", "pdfs", `${pdfName}.pdf`);

      const textContent = fs.readFileSync(txtPath, "utf8");

      const pdfDoc = new PDFDocument();
      const writeStream = fs.createWriteStream(pdfPath);
      pdfDoc.pipe(writeStream);

      pdfDoc.fontSize(12).text(textContent);
      pdfDoc.end();

      writeStream.on("finish", () => {
        res.status(200).json({ url: `/pdfs/${pdfName}.pdf` });
      });
    } catch (error) {
      console.error("Error generando PDF:", error);
      res.status(500).json({ error: "Error generando el PDF." });
    }
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
}
