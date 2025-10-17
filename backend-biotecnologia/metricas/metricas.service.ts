import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetricaProyecto } from './metrica-proyecto.entity';
import { Proyecto } from '../src/proyectos/proyectos.entity';
import { Tarea } from '../src/tareas/tarea.entity';
import { Hito } from '../src/Hitos/hitos.entity';
import { Documento } from '../src/Documentos/documento.entity';
import { User } from '@sysuser/sysuser.entity';


@Injectable()
export class MetricasService {
  constructor(
    @InjectRepository(MetricaProyecto)
    private readonly metricaRepository: Repository<MetricaProyecto>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @InjectRepository(Hito)
    private readonly hitoRepository: Repository<Hito>,
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) {}

  async calcularMetricasProyecto(proyectoId: number): Promise<MetricaProyecto> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id: proyectoId },
      relations: ['tareas', 'tareas.usuario']
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const metrica = new MetricaProyecto();
    metrica.proyecto = proyecto;

    // Calcular métricas de tiempo
    const fechaInicio = proyecto.fechaInicio ? new Date(proyecto.fechaInicio) : new Date();
    const fechaFin = proyecto.fechaFin ? new Date(proyecto.fechaFin) : new Date();
    const fechaActual = new Date();

    metrica.diasTranscurridos = Math.max(0, Math.floor((fechaActual.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)));
    metrica.diasRestantes = Math.max(0, Math.floor((fechaFin.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24)));
    
    const diasTotales = Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
    metrica.porcentajeTiempo = diasTotales > 0 ? (metrica.diasTranscurridos / diasTotales) * 100 : 0;

    // Calcular métricas de tareas
    const tareas = await this.tareaRepository.find({ where: { proyecto: { id: proyectoId } } });
    metrica.totalTareas = tareas.length;
    metrica.tareasCompletadas = tareas.filter(t => t.estado === 'completada').length;
    metrica.tareasEnProgreso = tareas.filter(t => t.estado === 'en progreso').length;
    metrica.tareasPausadas = tareas.filter(t => t.estado === 'pausada/bloqueda').length;
    metrica.tareasPendientes = tareas.filter(t => t.estado === 'pendiente').length;
    metrica.tareasRetrasadas = tareas.filter(t => t.estado === 'Atrasada').length;

    metrica.porcentajeAvance = metrica.totalTareas > 0 ? (metrica.tareasCompletadas / metrica.totalTareas) * 100 : 0;

    // Calcular métricas de hitos
    const hitos = await this.hitoRepository.find({ where: { proyecto: { id: proyectoId } } });
    metrica.totalHitos = hitos.length;
    metrica.hitosCompletados = hitos.filter(h => h.estado === 'completado').length;
    metrica.hitosRetrasados = hitos.filter(h => h.estado === 'retrasado').length;

    // Calcular métricas de participación
    const usuariosUnicos = [...new Set(tareas.map(t => t.usuario?.id).filter(id => id))];
    metrica.usuariosActivos = usuariosUnicos.length;

    const documentos = await this.documentoRepository.count({ where: { proyecto: { id: proyectoId } } });
    metrica.documentosGenerados = documentos;

    // Calcular índices de desempeño
    metrica.indiceEficiencia = metrica.diasTranscurridos > 0 ? 
      (metrica.tareasCompletadas / metrica.diasTranscurridos) * 100 : 0;
    
    metrica.indiceCalidad = metrica.totalHitos > 0 ? 
      (metrica.hitosCompletados / metrica.totalHitos) * 100 : 0;
    
    metrica.indiceColaboracion = metrica.usuariosActivos > 0 ? 
      (metrica.usuariosActivos / Math.max(1, metrica.totalTareas)) * 100 : 0;

    // Determinar nivel de riesgo
    metrica.nivelRiesgo = this.calcularNivelRiesgo(metrica);

    // Calcular próxima revisión (cada 7 días)
    metrica.fechaProximaRevision = new Date();
    metrica.fechaProximaRevision.setDate(metrica.fechaProximaRevision.getDate() + 7);

    return this.metricaRepository.save(metrica);
  }

  private calcularNivelRiesgo(metrica: MetricaProyecto): string {
    let riesgo = 0;

    // Factor tiempo: si se ha usado más del 80% del tiempo pero menos del 60% de avance
    if (metrica.porcentajeTiempo > 80 && metrica.porcentajeAvance < 60) riesgo += 2;
    if (metrica.porcentajeTiempo > 60 && metrica.porcentajeAvance < 40) riesgo += 1;

    // Factor tareas retrasadas
    if (metrica.totalTareas > 0) {
      const porcentajeRetrasadas = (metrica.tareasRetrasadas / metrica.totalTareas) * 100;
      if (porcentajeRetrasadas > 30) riesgo += 2;
      else if (porcentajeRetrasadas > 15) riesgo += 1;
    }

    // Factor hitos retrasados
    if (metrica.totalHitos > 0) {
      const porcentajeHitosRetrasados = (metrica.hitosRetrasados / metrica.totalHitos) * 100;
      if (porcentajeHitosRetrasados > 50) riesgo += 2;
      else if (porcentajeHitosRetrasados > 25) riesgo += 1;
    }

    // Factor colaboración baja
    if (metrica.indiceColaboracion < 30) riesgo += 1;

    // Determinar nivel final
    if (riesgo >= 4) return 'CRÍTICO';
    if (riesgo >= 3) return 'ALTO';
    if (riesgo >= 2) return 'MEDIO';
    return 'BAJO';
  }

  async obtenerMetricasProyecto(proyectoId: number): Promise<MetricaProyecto | null> {
    return this.metricaRepository.findOne({
      where: { proyecto: { id: proyectoId } },
      relations: ['proyecto'],
      order: { fechaCalculo: 'DESC' }
    });
  }

  async obtenerMetricasGenerales(): Promise<any> {
    const totalProyectos = await this.proyectoRepository.count();
    const totalTareas = await this.tareaRepository.count();
    const tareasCompletadas = await this.tareaRepository.count({ where: { estado: 'completada' } });
    const totalUsuarios = await this.usuarioRepository.count();

    const proyectosConRiesgoAlto = await this.metricaRepository.count({
      where: [
        { nivelRiesgo: 'ALTO' },
        { nivelRiesgo: 'CRÍTICO' }
      ]
    });

    return {
      resumenGeneral: {
        totalProyectos,
        totalTareas,
        tareasCompletadas,
        totalUsuarios,
        proyectosEnRiesgo: proyectosConRiesgoAlto
      },
      promedios: {
        eficienciaPromedio: await this.calcularPromedio('indiceEficiencia'),
        calidadPromedio: await this.calcularPromedio('indiceCalidad'),
        colaboracionPromedio: await this.calcularPromedio('indiceColaboracion'),
        avancePromedio: await this.calcularPromedio('porcentajeAvance')
      }
    };
  }

  private async calcularPromedio(campo: string): Promise<number> {
    const resultado = await this.metricaRepository
      .createQueryBuilder('metrica')
      .select(`AVG(metrica.${campo})`, 'promedio')
      .getRawOne();
    
    return parseFloat(resultado.promedio) || 0;
  }

  async actualizarTodasLasMetricas(): Promise<void> {
    const proyectos = await this.proyectoRepository.find();
    
    for (const proyecto of proyectos) {
      await this.calcularMetricasProyecto(proyecto.id);
    }
  }

  async obtenerMetricasPorRango(fechaInicio: Date, fechaFin: Date): Promise<MetricaProyecto[]> {
    return this.metricaRepository.find({
      where: {
        fechaCalculo: {
          gte: fechaInicio,
          lte: fechaFin
        } as any
      },
      relations: ['proyecto'],
      order: { fechaCalculo: 'DESC' }
    });
  }
}