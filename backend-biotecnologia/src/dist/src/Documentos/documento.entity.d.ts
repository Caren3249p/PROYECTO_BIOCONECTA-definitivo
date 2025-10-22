import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
export declare class Documento {
    id: number;
    nombre: string;
    url: string;
    proyecto: Proyecto;
    usuario: Usuario;
    permiso: string;
}
