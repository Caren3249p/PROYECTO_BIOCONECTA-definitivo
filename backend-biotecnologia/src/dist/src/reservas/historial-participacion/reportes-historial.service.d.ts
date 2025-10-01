import { HistorialParticipacionService } from './historial-participacion.service';
import { FiltroHistorialDto } from './dto/historial-participacion.dto';
export declare class ReportesHistorialService {
    private readonly historialService;
    constructor(historialService: HistorialParticipacionService);
    generarReporteExcel(filtros: FiltroHistorialDto): Promise<Buffer>;
    generarReporteCSV(filtros: FiltroHistorialDto): Promise<string>;
    private obtenerEtiquetaTipo;
}
