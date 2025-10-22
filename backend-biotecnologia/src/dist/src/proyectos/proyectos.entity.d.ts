import { Tarea } from '../tareas/tarea.entity';
export declare class Proyecto {
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    tareas: Tarea[];
}
