import { MetricasService } from './metricas.service';
import { Repository } from 'typeorm';
import { Proyecto } from '../src/proyectos/proyectos.entity';
import { Usuario } from '../src/usuarios/usuarios.entity';
export interface ReporteTemplate {
    titulo: string;
    descripcion: string;
    tipo: 'INDIVIDUAL' | 'COMPARATIVO' | 'GENERAL' | 'HISTORICO';
    metricas: string[];
    graficos: string[];
}
export interface EvolucionTemporal {
    periodo: string;
    progreso: number;
    eficiencia: number;
    tendencia: string;
}
export interface ProductividadUsuario {
    usuario: string;
    tareasCompletadas: number;
    horasTrabajo: number;
    eficiencia: number;
}
export interface EvolucionTemporal {
    periodo: string;
    progreso: number;
    eficiencia: number;
    tendencia: string;
}
export interface ProductividadUsuario {
    usuario: string;
    tareasCompletadas: number;
    horasTrabajo: number;
    eficiencia: number;
}
export declare class ReportesService {
    private readonly metricasService;
    private readonly proyectoRepository;
    private readonly usuarioRepository;
    private readonly plantillas;
    constructor(metricasService: MetricasService, proyectoRepository: Repository<Proyecto>, usuarioRepository: Repository<Usuario>);
    obtenerPlantillas(): {
        [key: string]: ReporteTemplate;
    };
    obtenerPlantilla(codigo: string): ReporteTemplate | null;
    generarReporteIndividual(proyectoId: number): Promise<any>;
    generarReporteComparativo(proyectoIds: number[]): Promise<any>;
    generarDashboardGeneral(): Promise<any>;
    generarReporteRiesgos(): Promise<any>;
    private construirReporte;
    private generarResumenEjecutivo;
    private extraerDatosMetricas;
    private generarConfiguracionGraficos;
    private obtenerConfiguracionGrafico;
    private generarRecomendaciones;
    private generarAlertas;
    generarReporteProyecto(proyectoId: number): Promise<any>;
    generarDashboard(filtros?: any): Promise<any>;
    generarAlertasRiesgo(filtros?: any): Promise<any>;
    generarEvolucionTemporal(filtros: any): Promise<any>;
    generarReporteProductividad(filtros: any): Promise<any>;
    private generarRangoMeses;
    private calcularProgresoPromedioPorMes;
    private calcularEficienciaPromedioPorMes;
    private calcularTendencia;
    private calcularHorasTrabajo;
}
