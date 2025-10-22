import { Repository } from 'typeorm';
import { MetricaProyecto } from './metrica-proyecto.entity';
import { Proyecto } from '../src/proyectos/proyectos.entity';
import { Tarea } from '../src/tareas/tarea.entity';
import { Hito } from '../src/Hitos/hitos.entity';
import { Documento } from '../src/Documentos/documento.entity';
import { Usuario } from '../src/usuarios/usuarios.entity';
export declare class MetricasService {
    private readonly metricaRepository;
    private readonly proyectoRepository;
    private readonly tareaRepository;
    private readonly hitoRepository;
    private readonly documentoRepository;
    private readonly usuarioRepository;
    constructor(metricaRepository: Repository<MetricaProyecto>, proyectoRepository: Repository<Proyecto>, tareaRepository: Repository<Tarea>, hitoRepository: Repository<Hito>, documentoRepository: Repository<Documento>, usuarioRepository: Repository<Usuario>);
    calcularMetricasProyecto(proyectoId: number): Promise<MetricaProyecto>;
    private calcularNivelRiesgo;
    obtenerMetricasProyecto(proyectoId: number): Promise<MetricaProyecto | null>;
    obtenerMetricasGenerales(): Promise<any>;
    private calcularPromedio;
    actualizarTodasLasMetricas(): Promise<void>;
    obtenerMetricasPorRango(fechaInicio: Date, fechaFin: Date): Promise<MetricaProyecto[]>;
}
