import fs from "fs";
import path from "path";

const plantillasDir = path.join(process.cwd(), "public/plantillas");

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      // Listar plantillas
      const plantillas = fs.readdirSync(plantillasDir).map((file) => ({
        name: file,
        content: fs.readFileSync(path.join(plantillasDir, file), "utf-8"),
      }));
      res.status(200).json(plantillas);
      break;
    }
    case "PUT": {
      // Editar contenido de una plantilla
      const { name, content } = req.body;
      const filePath = path.join(plantillasDir, name);
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf-8");
        res.status(200).json({ message: "Plantilla actualizada." });
      } else {
        res.status(404).json({ error: "Plantilla no encontrada." });
      }
      break;
    }
    default:
      res.status(405).json({ error: "Método no permitido." });
      break;
  }
}
