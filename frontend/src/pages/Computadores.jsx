import { Plus } from "lucide-react";
import { useState } from "react";
import { computadoresFicticios } from "../data/computadoresFicticios";
import { ComputadorCard } from "../components/computadores/ComputadorCard";
import { BarraBusqueda } from "../components/computadores/BarraBusqueda";
import { Modal } from "../components/ui/Modal";
import { ComputadorForm } from "../components/computadores/ComputadorForm";
import toast from "react-hot-toast";

export function Computadores() {
  const [computadores, setComputadores] = useState(computadoresFicticios);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const textoBusqueda = busqueda.toLocaleLowerCase();

  const computadoresFiltrados = computadores.filter((computador) => {
    return (
      computador.marca.toLowerCase().includes(textoBusqueda) ||
      computador.modelo.toLowerCase().includes(textoBusqueda) ||
      computador.placa.toLowerCase().includes(textoBusqueda) ||
      computador.usuarioEncargado.toLowerCase().includes(textoBusqueda)
    );
  });

  function agregarComputador(datosFormulario) {
    console.log("Datos que llegan del formulario:", datosFormulario);
    const nuevoComputador = {
      ...datosFormulario,
      id: Date.now(),
    };

    setComputadores([...computadores, nuevoComputador]);
    setMostrarModal(false);
    toast.success("Computador creado correctamente.");
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Computadores
          </h1>
          <p className="text-sm text-gray-500">
            Gestiona el inventario de equipos de cómputo de la empresa.
          </p>
        </div>

        <button
          onClick={() => setMostrarModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar computador
        </button>
      </div>
      {/* Barra de busqueda */}
      <div className="mb-6">
        <BarraBusqueda valor={busqueda} onCambiar={setBusqueda} />
      </div>

      {computadoresFiltrados.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-12">
          No se encontraron computadores con ese criterio de búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {computadoresFiltrados.map((computador) => (
            <ComputadorCard key={computador.id} computador={computador} />
          ))}
        </div>
      )}

      {mostrarModal && (
        <Modal
          titulo="Agregar computador"
          onCerrar={() => setMostrarModal(false)}
        >
          <ComputadorForm
            onGuardar={agregarComputador}
            onCancelar={() => setMostrarModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
