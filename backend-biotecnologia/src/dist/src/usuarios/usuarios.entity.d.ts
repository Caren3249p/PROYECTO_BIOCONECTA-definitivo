import { Rol } from '../roles/rol.entity';
import { Tarea } from '../tareas/tarea.entity';
export declare class Usuario {
    id: number;
    nombre: string;
    tareas: Tarea[];
    email: string;
    password: string;
    rol: Rol;
    asistencias: any;
}
