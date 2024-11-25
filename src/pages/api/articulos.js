let articulos = []; // Esto se conectará a tu base de datos más adelante

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(articulos);
      break;
    case "POST":
      const nuevoArticulo = req.body;
      articulos.push(nuevoArticulo);
      res.status(201).json({ message: "Artículo creado", articulo: nuevoArticulo });
      break;
    case "PUT":
      const { id, ...datosActualizados } = req.body;
      articulos = articulos.map((art) =>
        art.id === id ? { ...art, ...datosActualizados } : art
      );
      res.status(200).json({ message: "Artículo actualizado" });
      break;
    case "DELETE":
      const { id: idEliminar } = req.query;
      articulos = articulos.filter((art) => art.id !== idEliminar);
      res.status(200).json({ message: "Artículo eliminado" });
      break;
    default:
      res.status(405).json({ error: "Método no permitido" });
      break;
  }
}
