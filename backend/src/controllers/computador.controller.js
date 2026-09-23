import { obtenerComputadores } from "../models/computador.model.js";

export async function listarComputadores(req, res) {
  try {
    const computadores = await obtenerComputadores();
    res.status(200).json(computadores);
  } catch (error) {
    console.error("Error al obtener computadores:", error);
    res.status(500).json({ mensaje: "Error al consultar los computadores." });
  }
}