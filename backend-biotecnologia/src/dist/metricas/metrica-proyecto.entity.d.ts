import { Proyecto } from '../src/proyectos/proyectos.entity';
export declare class MetricaProyecto {
    id: number;
    proyecto: Proyecto;
    diasTranscurridos: number;
    diasRestantes: number;
    porcentajeAvance: number;
    porcentajeTiempo: number;
    totalTareas: number;
    tareasCompletadas: number;
    tareasEnProgreso: number;
    tareasPendientes: number;
    tareasRetrasadas: number;
    totalHitos: number;
    hitosCompletados: number;
    hitosRetrasados: number;
    usuariosActivos: number;
    documentosGenerados: number;
    indiceEficiencia: number;
    indiceCalidad: number;
    indiceColaboracion: number;
    nivelRiesgo: string;
    observaciones: string;
    fechaCalculo: Date;
    fechaProximaRevision: Date;
}
