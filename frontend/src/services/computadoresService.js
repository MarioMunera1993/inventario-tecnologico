const API_URL = "http://localhost:3000/api/computadores";

export async function obtenerComputadores() {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la lista de computadores.");
  }

  return respuesta.json();
}