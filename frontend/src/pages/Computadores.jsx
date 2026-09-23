import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { obtenerComputadores } from "../services/computadoresService";
import { ComputadorCard } from "../components/computadores/ComputadorCard";
import { BarraBusqueda } from "../components/computadores/BarraBusqueda";
import { Modal } from "../components/ui/Modal";
import { ComputadorForm } from "../components/computadores/ComputadorForm";


export function Computadores() {
  const [computadores, setComputadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [computadorEnEdicion, setComputadorEnEdicion] = useState(null);

  useEffect(() => {
    cargarComputadores();
  }, []);

  async function cargarComputadores() {
    try {
      setCargando(true);
      const datos = await obtenerComputadores();
      setComputadores(datos);
    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  const textoBusqueda = busqueda.toLowerCase();

  const computadoresFiltrados = computadores.filter((computador) => {
    return (
      computador.marca.toLowerCase().includes(textoBusqueda) ||
      computador.modelo.toLowerCase().includes(textoBusqueda) ||
      computador.placa.toLowerCase().includes(textoBusqueda) ||
      computador.usuarioEncargado.toLowerCase().includes(textoBusqueda)
    );
  });

  function abrirModalCrear() {
    setComputadorEnEdicion(null);
    setMostrarModal(true);
  }

  function abrirModalEditar(computador) {
    setComputadorEnEdicion(computador);
    setMostrarModal(true);
  }

  function cerrarModal() {
    setMostrarModal(false);
    setComputadorEnEdicion(null);
  }

  function guardarComputador(datosFormulario) {
    // Por ahora solo actualiza la lista en el frontend.
    // En la próxima etapa esto va a llamar al backend para guardar en MySQL de verdad.
    const estaEditando = computadorEnEdicion !== null;

    if (estaEditando) {
      const listaActualizada = computadores.map((computador) =>
        computador.id === computadorEnEdicion.id
          ? { ...datosFormulario, id: computadorEnEdicion.id }
          : computador
      );
      setComputadores(listaActualizada);
      toast.success("Computador actualizado correctamente.");
    } else {
      const nuevoComputador = { ...datosFormulario, id: Date.now() };
      setComputadores([...computadores, nuevoComputador]);
      toast.success("Computador creado correctamente.");
    }

    cerrarModal();
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
          onClick={abrirModalCrear}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar computador
        </button>
      </div>

      <div className="mb-6">
        <BarraBusqueda valor={busqueda} onCambiar={setBusqueda} />
      </div>

      {cargando ? (
        <p className="text-sm text-gray-500 text-center py-12">
          Cargando computadores...
        </p>
      ) : computadoresFiltrados.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-12">
          No se encontraron computadores con ese criterio de búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {computadoresFiltrados.map((computador) => (
            <ComputadorCard
              key={computador.id}
              computador={computador}
              onEditar={abrirModalEditar}
            />
          ))}
        </div>
      )}

      {mostrarModal && (
        <Modal
          titulo={
            computadorEnEdicion ? "Actualizar computador" : "Agregar computador"
          }
          onCerrar={cerrarModal}
        >
          <ComputadorForm
            computadorInicial={computadorEnEdicion}
            onGuardar={guardarComputador}
            onCancelar={cerrarModal}
          />
        </Modal>
      )}
    </div>
  );
}
