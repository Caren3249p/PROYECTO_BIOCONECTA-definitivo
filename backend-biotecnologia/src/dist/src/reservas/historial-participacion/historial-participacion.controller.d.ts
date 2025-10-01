import { HistorialParticipacionService } from './historial-participacion.service';
import { FiltroHistorialDto, CrearHistorialDto } from './dto/historial-participacion.dto';
export declare class HistorialParticipacionController {
    private readonly historialService;
    constructor(historialService: HistorialParticipacionService);
    obtenerHistorial(filtros: FiltroHistorialDto, req: any): Promise<{
        success: boolean;
        data: {
            registros: import("./historial-participacion.entity").HistorialParticipacion[];
            total: number;
            pagina: number;
            totalPaginas: number;
            limite: number;
        };
    }>;
    obtenerMiHistorial(filtros: FiltroHistorialDto, req: any): Promise<{
        success: boolean;
        data: {
            registros: import("./historial-participacion.entity").HistorialParticipacion[];
            total: number;
            pagina: number;
            totalPaginas: number;
            limite: number;
        };
    }>;
    obtenerEstadisticas(usuarioId?: number, fechaInicio?: string, fechaFin?: string, req?: any): Promise<{
        success: boolean;
        data: {
            total: number;
            estadisticasPorTipo: any[];
            participacionPorMes: any[];
        };
    }>;
    obtenerTiposParticipacion(): Promise<{
        success: boolean;
        data: {
            valor: import("./historial-participacion.entity").TipoParticipacion;
            etiqueta: string;
        }[];
    }>;
    crearRegistro(datos: CrearHistorialDto, req: any): Promise<{
        success: boolean;
        data: import("./historial-participacion.entity").HistorialParticipacion;
        message: string;
    }>;
}
