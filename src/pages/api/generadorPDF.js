import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const pdfDir = path.join(process.cwd(), "public/pdfs");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, content } = req.body;

    // Crear PDF
    const pdfPath = path.join(pdfDir, `${name.replace(".txt", ".pdf")}`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text(content);
    doc.end();

    res.status(200).json({ message: "PDF generado.", url: `/pdfs/${name.replace(".txt", ".pdf")}` });
  } else {
    res.status(405).json({ error: "Método no permitido." });
  }
}
