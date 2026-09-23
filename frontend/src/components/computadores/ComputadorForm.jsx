import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { TIPOS_EQUIPO } from "../../constants/tiposEquipo";
import { SISTEMAS_OPERATIVOS } from "../../constants/sistemasOperativos";
import { ESTADOS_COMPUTADOR } from "../../constants/estadosComputador";
import { TIPOS_RAM } from "../../constants/tiposRam";
import { TIPOS_ALMACENAMIENTO } from "../../constants/tiposAlmacenamiento";

const datosIniciales = {
  placa: "",
  marca: "",
  modelo: "",
  tipoEquipo: TIPOS_EQUIPO.ESCRITORIO,
  sistemaOperativo: SISTEMAS_OPERATIVOS.WINDOWS_11,
  procesador: "",
  generacion: "",
  memoriaRam: [{ tipo: "DDR4", capacidadGb: "" }],
  discosDuros: [{ tipo: "SSD", capacidadGb: "" }],
  macLocal: "",
  macWifi: "",
  estado: ESTADOS_COMPUTADOR.ACTIVO,
  usuarioEncargado: "",
};

export function ComputadorForm({ onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(datosIniciales);

  function actualizarCampo(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
  }

  function actualizarModuloRam(index, campo, valor) {
    const nuevaLista = datos.memoriaRam.map((modulo, i) =>
      i === index ? { ...modulo, [campo]: valor } : modulo,
    );
    setDatos({ ...datos, memoriaRam: nuevaLista });
  }

  function agregarModuloRam() {
    setDatos({
      ...datos,
      memoriaRam: [...datos.memoriaRam, { tipo: "DDR4", capacidadGb: "" }],
    });
  }

  function quitarModuloRam(index) {
    setDatos({
      ...datos,
      memoriaRam: datos.memoriaRam.filter((_, i) => i !== index),
    });
  }

  function actualizarDisco(index, campo, valor) {
    const nuevaLista = datos.discosDuros.map((disco, i) =>
      i === index ? { ...disco, [campo]: valor } : disco,
    );
    setDatos({ ...datos, discosDuros: nuevaLista });
  }

  function agregarDisco() {
    setDatos({
      ...datos,
      discosDuros: [...datos.discosDuros, { tipo: "SSD", capacidadGb: "" }],
    });
  }

  function quitarDisco(index) {
    setDatos({
      ...datos,
      discosDuros: datos.discosDuros.filter((_, i) => i !== index),
    });
  }

  function manejarEnvio(event) {
    event.preventDefault();

    if (
      !datos.placa ||
      !datos.marca ||
      !datos.modelo ||
      !datos.usuarioEncargado
    ) {
      toast.error("Completa placa, marca, modelo y usuario encargado.");
      return;
    }

    onGuardar(datos);
  }

  return (
    <form onSubmit={manejarEnvio} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Campo label="Placa / número interno">
          <input
            type="text"
            value={datos.placa}
            onChange={(e) => actualizarCampo("placa", e.target.value)}
            className="input"
          />
        </Campo>

        <Campo label="Usuario encargado">
          <input
            type="text"
            value={datos.usuarioEncargado}
            onChange={(e) =>
              actualizarCampo("usuarioEncargado", e.target.value)
            }
            className="input"
          />
        </Campo>

        <Campo label="Marca">
          <input
            type="text"
            value={datos.marca}
            onChange={(e) => actualizarCampo("marca", e.target.value)}
            className="input"
          />
        </Campo>

        <Campo label="Modelo">
          <input
            type="text"
            value={datos.modelo}
            onChange={(e) => actualizarCampo("modelo", e.target.value)}
            className="input"
          />
        </Campo>

        <Campo label="Tipo de equipo">
          <select
            value={datos.tipoEquipo}
            onChange={(e) => actualizarCampo("tipoEquipo", e.target.value)}
            className="input"
          >
            <option value="" disabled >Selecione Tipo</option>
            {Object.values(TIPOS_EQUIPO).map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Estado">
          <select
            value={datos.estado}
            onChange={(e) => actualizarCampo("estado", e.target.value)}
            className="input"
          >
            {Object.values(ESTADOS_COMPUTADOR).map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Sistema operativo">
          <select
            value={datos.sistemaOperativo}
            onChange={(e) =>
              actualizarCampo(" sistemaOperativo", e.target.value)
            }
            className="input"
          >
            {Object.values(SISTEMAS_OPERATIVOS).map((sistema) => (
              <option key={sistema} value={sistema}>
                {sistema}
              </option>
            ))}
          </select>
        </Campo>

        <Campo label="Procesador">
          <input
            type="text"
            value={datos.procesador}
            onChange={(e) => actualizarCampo("procesador", e.target.value)}
            className="input"
          />
        </Campo>

        <Campo label="Generación">
          <input
            type="text"
            value={datos.generacion}
            onChange={(e) => actualizarCampo("generacion", e.target.value)}
            className="input"
          />
        </Campo>

        <Campo label="MAC local">
          <input
            type="text"
            value={datos.macLocal}
            onChange={(e) => actualizarCampo("macLocal", e.target.value)}
            className="input"
          />
        </Campo>

        <Campo label="MAC wifi">
          <input
            type="text"
            value={datos.macWifi}
            onChange={(e) => actualizarCampo("macWifi", e.target.value)}
            className="input"
          />
        </Campo>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Memoria RAM</span>
          <button
            type="button"
            onClick={agregarModuloRam}
            className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
          >
            <Plus size={14} /> Agregar módulo
          </button>
        </div>

        {datos.memoriaRam.map((modulo, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <select
              value={modulo.tipo}
              onChange={(e) =>
                actualizarModuloRam(index, "tipo", e.target.value)
              }
              className="input"
            >
              {TIPOS_RAM.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="GB"
              value={modulo.capacidadGb}
              onChange={(e) =>
                actualizarModuloRam(index, "capacidadGb", e.target.value)
              }
              className="input"
            />
            {datos.memoriaRam.length > 1 && (
              <button
                type="button"
                onClick={() => quitarModuloRam(index)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Discos duros
          </span>
          <button
            type="button"
            onClick={agregarDisco}
            className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
          >
            <Plus size={14} /> Agregar disco
          </button>
        </div>

        {datos.discosDuros.map((disco, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <select
              value={disco.tipo}
              onChange={(e) => actualizarDisco(index, "tipo", e.target.value)}
              className="input"
            >
              {TIPOS_ALMACENAMIENTO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="GB"
              value={disco.capacidadGb}
              onChange={(e) =>
                actualizarDisco(index, "capacidadGb", e.target.value)
              }
              className="input"
            />
            {datos.discosDuros.length > 1 && (
              <button
                type="button"
                onClick={() => quitarDisco(index)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          Guardar computador
        </button>
      </div>
    </form>
  );
}

function Campo({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
