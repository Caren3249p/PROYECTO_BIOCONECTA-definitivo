import type { Response } from 'express';
import { ReportesHistorialService } from './reportes-historial.service';
import { FiltroHistorialDto } from './dto/historial-participacion.dto';
export declare class ReportesHistorialController {
    private readonly reportesService;
    constructor(reportesService: ReportesHistorialService);
    descargarReporteExcel(filtros: FiltroHistorialDto, res: Response, req: any): Promise<void>;
    descargarReporteCSV(filtros: FiltroHistorialDto, res: Response, req: any): Promise<void>;
}
