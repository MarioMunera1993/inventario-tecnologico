import pool from "../config/db.js";

function mapearComputador(fila) {
  return {
    id: fila.id,
    placa: fila.placa,
    marca: fila.marca,
    modelo: fila.modelo,
    tipoEquipo: fila.tipo_equipo,
    sistemaOperativo: fila.sistema_operativo,
    procesador: fila.procesador,
    macLocal: fila.mac_local,
    macWifi: fila.mac_wifi,
    estado: fila.estado,
    usuarioEncargado: fila.usuario_encargado,
  };
}

export async function obtenerComputadores() {
  const [computadores] = await pool.query(
    "SELECT * FROM computadores"
  );

  const idsComputadores = computadores.map((c) => c.id);

  if (idsComputadores.length === 0) {
    return [];
  }

  const [memorias] = await pool.query(
    "SELECT * FROM memorias_ram WHERE computador_id IN (?)",
    [idsComputadores]
  );

  const [discos] = await pool.query(
    "SELECT * FROM discos_duros WHERE computador_id IN (?)",
    [idsComputadores]
  );

  return computadores.map((computador) => ({
    ...mapearComputador(computador),
    memoriaRam: memorias
      .filter((m) => m.computador_id === computador.id)
      .map((m) => ({ tipo: m.tipo, capacidadGb: m.capacidad_gb })),
    discosDuros: discos
      .filter((d) => d.computador_id === computador.id)
      .map((d) => ({ tipo: d.tipo, capacidadGb: d.capacidad_gb })),
  }));
}