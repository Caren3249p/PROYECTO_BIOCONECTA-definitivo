import { Repository } from 'typeorm';
import { HistorialParticipacion, TipoParticipacion } from './historial-participacion.entity';
import { FiltroHistorialDto, CrearHistorialDto } from './dto/historial-participacion.dto';
import { Usuario } from '../../usuarios/usuarios.entity';
import { Proyecto } from '../../proyectos/proyectos.entity';
export declare class HistorialParticipacionService {
    private historialRepository;
    private usuarioRepository;
    private proyectoRepository;
    constructor(historialRepository: Repository<HistorialParticipacion>, usuarioRepository: Repository<Usuario>, proyectoRepository: Repository<Proyecto>);
    obtenerHistorial(filtros: FiltroHistorialDto): Promise<{
        registros: HistorialParticipacion[];
        total: number;
        pagina: number;
        totalPaginas: number;
        limite: number;
    }>;
    crearRegistro(datos: CrearHistorialDto): Promise<HistorialParticipacion>;
    obtenerEstadisticas(usuarioId?: number, fechaInicio?: string, fechaFin?: string): Promise<{
        total: number;
        estadisticasPorTipo: any[];
        participacionPorMes: any[];
    }>;
    obtenerTiposParticipacion(): Promise<{
        valor: TipoParticipacion;
        etiqueta: string;
    }[]>;
    private obtenerEtiquetaTipo;
    registrarTareaAsignada(usuarioId: number, tareaId: number, proyectoId?: number, descripcion?: string): Promise<HistorialParticipacion>;
    registrarTareaCompletada(usuarioId: number, tareaId: number, proyectoId?: number, descripcion?: string): Promise<HistorialParticipacion>;
    registrarReservaCreada(usuarioId: number, reservaId: number, servicioNombre?: string): Promise<HistorialParticipacion>;
    registrarAsistencia(usuarioId: number, reservaId: number, servicioNombre?: string): Promise<HistorialParticipacion>;
}
