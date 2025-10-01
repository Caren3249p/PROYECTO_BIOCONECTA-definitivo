import { Proyecto } from '../proyectos/proyectos.entity';
export declare class Hito {
    id: number;
    nombre: string;
    estado: string;
    fechaLimite: Date;
    proyecto: Proyecto;
}
