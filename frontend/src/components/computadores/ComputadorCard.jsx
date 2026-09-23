import { ComputerIcon, EyeOff, Pencil } from "lucide-react";
import { ESTILOS_POR_ESTADO } from "../../constants/estadosComputador";

export const ComputadorCard = ({ computador }) => {
  const totalRamGb = computador.memoriaRam.reduce(
    (total, modulo) => total + modulo.capacidadGb,
    0,
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
      {/* INDICADOR TÉCNICO */}
      <div className="absolute top-0 left-0 px-3 py-1 bg-gray-800 text-white text-[9px] font-black uppercase tracking-tighter rounded-br-xl shadow-sm">
        Nº EQUIPO: {computador.placa}
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
          <Pencil size={15} />
        </button>
        <button className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
          <EyeOff size={15} />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 mt-4">
        <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600 text-3xl group-hover:scale-110 transition-transform">
          <ComputerIcon/>
        </div>
        <div>
          <h4 className="font-black text-gray-800 text-xl uppercase tracking-tight leading-none">
            {computador.marca}
          </h4>
          <p className="text-gray-500 text-base font-semibold">
            {computador.modelo}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            ESTILOS_POR_ESTADO[computador.estado]
          }`}
        >
          {computador.estado}
        </span>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-black uppercase text-[10px]">
            Tipo Equipo:
          </span>
          <span className="text-gray-900 font-black">
            {computador.tipoEquipo}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-black uppercase text-[10px]">
            Responsable:
          </span>
          <span className="text-gray-900 font-black">
            {computador.usuarioEncargado || "SIN ASIGNAR"}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
          <span className="text-gray-400 font-black uppercase text-[10px]">
            Procesador:
          </span>
          <span className="text-gray-700 font-bold">
            {computador.procesador}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
          <span className="text-gray-400 font-black uppercase text-[10px]">
            Sistema Operativo:
          </span>
          <span className="text-gray-700 font-bold">
            {computador.sistemaOperativo}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
          <span className="text-gray-400 font-black uppercase text-[10px]">
            Memoria Ram:
          </span>
          <span className="text-gray-700 font-bold">
            {totalRamGb} GB ({computador.memoriaRam.length} módulo
            {computador.memoriaRam.length > 1 ? "s" : ""})
          </span>
        </div>

        <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
          <span className="text-gray-400 font-black uppercase text-[10px]">
            Almacenamiento:
          </span>
          {computador.discosDuros.map((disco, index) => {
            <span key={index} className="text-gray-700 font-bold">
              {disco.capacidadGb} GB {disco.tipo}
              {index < computador.discosDuros.length - 1 ? ", " : ""}
            </span>;
          })}
        </div>

        {/* MAC ADDRESSES */}
        <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-2">
          <div className="flex flex-col">
            <span className="text-gray-400 font-black uppercase text-[8px]">
              MAC LAN:
            </span>
            <span className="text-[10px] font-mono text-gray-600">
              {computador.macLocal || "N/A"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 font-black uppercase text-[8px]">
              MAC WIFI:
            </span>
            <span className="text-[10px] font-mono text-gray-600">
              {computador.macWifi || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
