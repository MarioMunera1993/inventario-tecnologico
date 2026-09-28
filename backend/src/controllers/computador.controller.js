import { obtenerComputadores, crearComputador } from "../models/computador.model.js";

export async function listarComputadores(req, res) {
  try {
    const computadores = await obtenerComputadores();
    res.status(200).json(computadores);
  } catch (error) {
    console.error("Error al obtener computadores:", error);
    res.status(500).json({ mensaje: "Error al consultar los computadores." });
  }
}

export async function registrarComputador(req, res) {
  try {
    const nuevoComputador = await crearComputador(req.body);
    res.status(201).json(nuevoComputador);
  } catch (error) {
    console.error("Error al crear computador:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ mensaje: "Ya existe un computador con esa placa." });
    }

    res.status(500).json({ mensaje: "Error al guardar el computador." });
  }
}