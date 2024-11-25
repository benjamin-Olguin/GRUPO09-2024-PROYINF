import fs from "fs";
import path from "path";

// Ruta al archivo boletines.json en la carpeta raíz
const boletinesPath = path.join(process.cwd(), "data", "boletines.json");

export const getBoletines = () => {
  try {
    const data = fs.readFileSync(boletinesPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer boletines.json:", error);
    return [];
  }
};

export const saveBoletines = (boletines) => {
  try {
    fs.writeFileSync(boletinesPath, JSON.stringify(boletines, null, 2));
  } catch (error) {
    console.error("Error al escribir boletines.json:", error);
  }
};
