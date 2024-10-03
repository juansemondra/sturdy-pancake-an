export interface Ruta {
    id?: number;
    nombreRuta: string;
    horarioDeInicio: string;
    horarioDeFinal: string;
    diasDisponibles: string;
    estacionIds?: number[];
    relacionBusRutaConductorIds?: number[];
  }