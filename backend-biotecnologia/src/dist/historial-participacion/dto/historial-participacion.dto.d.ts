import { TipoParticipacion } from '../historial-participacion.entity';
export declare class FiltroHistorialDto {
    usuarioId?: number;
    proyectoId?: number;
    tipoParticipacion?: TipoParticipacion;
    fechaInicio?: string;
    fechaFin?: string;
    limite?: number;
    pagina?: number;
}
export declare class CrearHistorialDto {
    usuarioId: number;
    tipoParticipacion: TipoParticipacion;
    descripcion: string;
    entidadTipo?: string;
    entidadId?: number;
    proyectoId?: number;
    metadatos?: any;
}
