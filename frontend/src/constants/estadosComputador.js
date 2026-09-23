export const ESTADOS_COMPUTADOR = {
    ACTIVO: "Activo",
    INACTIVO: "Inactivo",
    MANTENIMIENTO: "En mantenimiento",
}

export const ESTILOS_POR_ESTADO = {
  [ESTADOS_COMPUTADOR.ACTIVO]: "bg-green-100 text-green-700",
  [ESTADOS_COMPUTADOR.INACTIVO]: "bg-red-100 text-red-700",
  [ESTADOS_COMPUTADOR.MANTENIMIENTO]: "bg-amber-100 text-amber-700",
};