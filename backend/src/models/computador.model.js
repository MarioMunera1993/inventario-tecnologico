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

export async function crearComputador(datos) {
  const conexion = await pool.getConnection();

  try {
    await conexion.beginTransaction();

    const [resultado] = await conexion.query(
      `INSERT INTO computadores
        (placa, marca, modelo, tipo_equipo, sistema_operativo, procesador, mac_local, mac_wifi, estado, usuario_encargado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        datos.placa,
        datos.marca,
        datos.modelo,
        datos.tipoEquipo,
        datos.sistemaOperativo,
        datos.procesador,
        datos.macLocal,
        datos.macWifi,
        datos.estado,
        datos.usuarioEncargado,
      ]
    );

    const computadorId = resultado.insertId;

    for (const modulo of datos.memoriaRam) {
      await conexion.query(
        "INSERT INTO memorias_ram (computador_id, tipo, capacidad_gb) VALUES (?, ?, ?)",
        [computadorId, modulo.tipo, modulo.capacidadGb]
      );
    }

    for (const disco of datos.discosDuros) {
      await conexion.query(
        "INSERT INTO discos_duros (computador_id, tipo, capacidad_gb) VALUES (?, ?, ?)",
        [computadorId, disco.tipo, disco.capacidadGb]
      );
    }

    await conexion.commit();

    return {
      ...mapearComputador({
        id: computadorId,
        placa: datos.placa,
        marca: datos.marca,
        modelo: datos.modelo,
        tipo_equipo: datos.tipoEquipo,
        sistema_operativo: datos.sistemaOperativo,
        procesador: datos.procesador,
        generacion: datos.generacion,
        mac_local: datos.macLocal,
        mac_wifi: datos.macWifi,
        estado: datos.estado,
        usuario_encargado: datos.usuarioEncargado,
      }),
      memoriaRam: datos.memoriaRam,
      discosDuros: datos.discosDuros,
    };
    
  } catch (error) {
    await conexion.rollback();
    throw error;
  }finally{
    conexion.release();
  }
}