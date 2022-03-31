import { Terapia } from "./terapiaInterf"
export interface Programacion {
    id: string,
    userId: string,
    grupo_id: string,
    grupo_nombre: string,
    lugar: string,
    observ: string,
    foto: string,
    fechaInicio: string,
    fechaFin: string,
    Terapias: Terapia[]
} 