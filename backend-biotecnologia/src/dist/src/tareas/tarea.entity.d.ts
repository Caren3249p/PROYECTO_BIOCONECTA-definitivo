import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
export declare class Tarea {
    id: number;
    descripcion: string;
    estado: string;
    proyecto: Proyecto;
    usuario: Usuario;
}
