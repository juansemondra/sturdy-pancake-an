export interface Conductor {
  id?: number;
  nombre: string;
  telefono: number;
  cedula?: string;
  direccion?: string;
  buses_asignados?: number;
  relacionBusRutaConductorIds?: number[];
}
