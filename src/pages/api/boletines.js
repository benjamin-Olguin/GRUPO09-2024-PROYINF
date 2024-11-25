import fs from "fs";
import path from "path";

export default function handler(req, res) {
    try {
        const boletinesDir = path.join(process.cwd(), "public", "boletines");

        // Verifica si la carpeta existe
        if (!fs.existsSync(boletinesDir)) {
            return res.status(200).json([]);
        }

        // Lee los archivos en la carpeta
        const files = fs.readdirSync(boletinesDir).filter((file) => file.endsWith(".pdf"));

        // Crea un array con los datos de los boletines
        const boletines = files.map((file, index) => ({
            id: index + 1,
            titulo: file.replace(".pdf", ""), // Usa el nombre del archivo como título
            url: `/boletines/${file}`, // Construye la URL pública
        }));

        res.status(200).json(boletines);
    } catch (error) {
        console.error("Error al obtener los boletines:", error);
        res.status(500).json({ error: "Error al obtener los boletines" });
    }
}
