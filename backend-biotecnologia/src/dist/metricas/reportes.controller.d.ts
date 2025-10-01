import type { Response } from 'express';
import { MetricasService } from './metricas.service';
import { ReportesService } from './reportes.service';
import { ExportService } from './export.service';
import { LogsService } from '../logs/logs.service';
export declare class ReportesController {
    private readonly metricasService;
    private readonly reportesService;
    private readonly exportService;
    private readonly logsService;
    constructor(metricasService: MetricasService, reportesService: ReportesService, exportService: ExportService, logsService: LogsService);
    obtenerPlantillas(): {
        [key: string]: import("./reportes.service").ReporteTemplate;
    };
    calcularMetricasProyecto(id: string, req: any): Promise<import("./metrica-proyecto.entity").MetricaProyecto>;
    obtenerMetricasProyecto(id: string): Promise<import("./metrica-proyecto.entity").MetricaProyecto | null>;
    generarReporteIndividual(id: string, req: any): Promise<any>;
    generarReporteComparativo(body: {
        proyectoIds: number[];
    }, req: any): Promise<any>;
    generarDashboardGeneral(req: any): Promise<any>;
    generarReporteRiesgos(req: any): Promise<any>;
    obtenerMetricasGenerales(): Promise<any>;
    actualizarTodasLasMetricas(req: any): Promise<{
        mensaje: string;
    }>;
    obtenerMetricasPorRango(fechaInicio: string, fechaFin: string): Promise<import("./metrica-proyecto.entity").MetricaProyecto[]>;
    obtenerFiltrosDisponibles(): {
        proyectos: {
            tipo: string;
            endpoint: string;
            label: string;
        };
        fechas: {
            tipo: string;
            opciones: {
                label: string;
                valor: string;
            }[];
        };
        metricas: {
            tipo: string;
            opciones: {
                label: string;
                valor: string;
            }[];
        };
        tipoReporte: {
            tipo: string;
            opciones: {
                label: string;
                valor: string;
            }[];
        };
    };
    exportarProyectoPDF(proyectoId: number, res: Response, req: any): Promise<void>;
    exportarProyectoExcel(proyectoId: number, res: Response, req: any): Promise<void>;
    exportarComparativoPDF(filtros: any, res: Response, req: any): Promise<void>;
    exportarComparativoExcel(filtros: any, res: Response, req: any): Promise<void>;
    exportarDashboardPDF(filtros: any, res: Response, req: any): Promise<void>;
    exportarDashboardExcel(filtros: any, res: Response, req: any): Promise<void>;
    exportarRiesgosPDF(res: Response, req: any, nivelMinimo?: string): Promise<void>;
    exportarTemporalExcel(filtros: any, res: Response, req: any): Promise<void>;
    exportarProductividadExcel(filtros: any, res: Response, req: any): Promise<void>;
}
