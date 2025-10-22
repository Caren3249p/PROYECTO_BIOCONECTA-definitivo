import { Usuario } from '../src/usuarios/usuarios.entity';
import { Proyecto } from '../src/proyectos/proyectos.entity';
export declare enum TipoParticipacion {
    TAREA_ASIGNADA = "tarea_asignada",
    TAREA_COMPLETADA = "tarea_completada",
    RESERVA_CREADA = "reserva_creada",
    RESERVA_COMPLETADA = "reserva_completada",
    ASISTENCIA_REGISTRADA = "asistencia_registrada",
    PROYECTO_ASIGNADO = "proyecto_asignado",
    HITO_COMPLETADO = "hito_completado",
    DOCUMENTO_SUBIDO = "documento_subido"
}
export declare class HistorialParticipacion {
    id: number;
    usuario: Usuario;
    tipoParticipacion: TipoParticipacion;
    descripcion: string;
    entidadTipo: string;
    entidadId: number;
    proyecto: Proyecto;
    fechaEvento: Date;
    metadatos: any;
    activo: boolean;
}
