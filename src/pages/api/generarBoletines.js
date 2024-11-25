import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { name } = req.body; // Obtiene el nombre del boletín enviado desde el frontend

    if (!name) {
        return res.status(400).json({ error: "El nombre del boletín es requerido." });
    }

    try {
        // Directorios
        const pdfsDir = path.join(process.cwd(), "public", "pdfs");
        const boletinesDir = path.join(process.cwd(), "public", "boletines");

        // Crear la carpeta de boletines si no existe
        if (!fs.existsSync(boletinesDir)) {
            fs.mkdirSync(boletinesDir);
        }

        // Leer los PDFs disponibles
        const pdfFiles = fs.readdirSync(pdfsDir).filter((file) => file.endsWith(".pdf"));

        if (pdfFiles.length === 0) {
            return res.status(400).json({ error: "No hay PDFs disponibles para generar el boletín" });
        }

        // Crear el nuevo boletín con el nombre proporcionado
        const boletinPath = path.join(boletinesDir, `${name}.pdf`);
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(boletinPath));

        doc.fontSize(20).text("Boletín General", { align: "center" });
        doc.moveDown();

        // Agregar el contenido de cada PDF al boletín
        pdfFiles.forEach((pdfFile, index) => {
            doc.addPage().fontSize(15).text(`Contenido del archivo: ${pdfFile}`, { align: "center" });
            doc.moveDown();
            doc.fontSize(12).text(`Este es el contenido simulado del archivo: ${pdfFile}`);
            if (index < pdfFiles.length - 1) doc.addPage();
        });

        doc.end();

        res.status(200).json({ message: "Boletín generado con éxito", path: `/boletines/${path.basename(boletinPath)}` });
    } catch (error) {
        console.error("Error al generar el boletín:", error);
        res.status(500).json({ error: "Error al generar el boletín" });
    }
}
