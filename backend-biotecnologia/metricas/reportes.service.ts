import { Injectable } from '@nestjs/common';
import { MetricasService } from './metricas.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../src/proyectos/proyectos.entity';
import { User } from '@sysuser/sysuser.entity';

import { MetricaProyecto } from './metrica-proyecto.entity';

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

@Injectable()
export class ReportesService {
  private readonly plantillas: { [key: string]: ReporteTemplate } = {
    'desempeño-proyecto': {
      titulo: 'Reporte de Desempeño Individual de Proyecto',
      descripcion: 'Análisis detallado del progreso y métricas de un proyecto específico',
      tipo: 'INDIVIDUAL',
      metricas: [
        'porcentajeAvance', 'porcentajeTiempo', 'indiceEficiencia', 
        'indiceCalidad', 'indiceColaboracion', 'nivelRiesgo'
      ],
      graficos: ['progreso-temporal', 'distribucion-tareas', 'nivel-riesgo']
    },
    'comparativo-proyectos': {
      titulo: 'Reporte Comparativo de Proyectos',
      descripcion: 'Comparación de métricas entre múltiples proyectos activos',
      tipo: 'COMPARATIVO',
      metricas: [
        'porcentajeAvance', 'indiceEficiencia', 'usuariosActivos', 'nivelRiesgo'
      ],
      graficos: ['radar-comparativo', 'ranking-eficiencia', 'distribucion-riesgo']
    },
    'dashboard-general': {
      titulo: 'Dashboard General de BIOCONECTA',
      descripcion: 'Vista panorámica del estado de todos los proyectos y actividades',
      tipo: 'GENERAL',
      metricas: [
        'totalProyectos', 'promedioEficiencia', 'proyectosEnRiesgo', 'usuariosActivos'
      ],
      graficos: ['kpi-principales', 'tendencias-mensuales', 'distribucion-estados']
    },
    'seguimiento-temporal': {
      titulo: 'Reporte de Seguimiento Temporal',
      descripcion: 'Evolución histórica de las métricas de uno o varios proyectos',
      tipo: 'HISTORICO',
      metricas: [
        'porcentajeAvance', 'indiceEficiencia', 'tareasCompletadas', 'hitosCompletados'
      ],
      graficos: ['linea-temporal', 'hitos-historicos', 'velocidad-progreso']
    },
    'alertas-riesgo': {
      titulo: 'Reporte de Alertas y Gestión de Riesgos',
      descripcion: 'Identificación y análisis de proyectos con alto riesgo o problemas',
      tipo: 'GENERAL',
      metricas: [
        'nivelRiesgo', 'tareasRetrasadas', 'hitosRetrasados', 'diasRestantes'
      ],
      graficos: ['matriz-riesgo', 'alertas-criticas', 'proyectos-problema']
    },
    'productividad-usuarios': {
      titulo: 'Reporte de Productividad de Usuarios',
      descripcion: 'Análisis de la participación y productividad de estudiantes y colaboradores',
      tipo: 'COMPARATIVO',
      metricas: [
        'tareasAsignadas', 'tareasCompletadas', 'tiempoPromedio', 'proyectosActivos'
      ],
      graficos: ['ranking-usuarios', 'distribucion-carga', 'eficiencia-personal']
    }
  };

  constructor(
    private readonly metricasService: MetricasService,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) {}

  obtenerPlantillas(): { [key: string]: ReporteTemplate } {
    return this.plantillas;
  }

  obtenerPlantilla(codigo: string): ReporteTemplate | null {
    return this.plantillas[codigo] || null;
  }

  async generarReporteIndividual(proyectoId: number): Promise<any> {
    const plantilla = this.plantillas['desempeño-proyecto'];
    const metrica = await this.metricasService.obtenerMetricasProyecto(proyectoId);
    
    if (!metrica) {
      // Si no existe métrica, calcularla
      await this.metricasService.calcularMetricasProyecto(proyectoId);
      const nuevaMetrica = await this.metricasService.obtenerMetricasProyecto(proyectoId);
      if (!nuevaMetrica) {
        throw new Error('No se pudo generar la métrica del proyecto');
      }
      return this.construirReporte(plantilla, [nuevaMetrica]);
    }

    return this.construirReporte(plantilla, [metrica]);
  }

  async generarReporteComparativo(proyectoIds: number[]): Promise<any> {
    const plantilla = this.plantillas['comparativo-proyectos'];
    const metricas: MetricaProyecto[] = [];

    for (const id of proyectoIds) {
      let metrica = await this.metricasService.obtenerMetricasProyecto(id);
      if (!metrica) {
        await this.metricasService.calcularMetricasProyecto(id);
        metrica = await this.metricasService.obtenerMetricasProyecto(id);
      }
      if (metrica) metricas.push(metrica);
    }

    return this.construirReporte(plantilla, metricas);
  }

  async generarDashboardGeneral(): Promise<any> {
    const plantilla = this.plantillas['dashboard-general'];
    const metricasGenerales = await this.metricasService.obtenerMetricasGenerales();
    
    return {
      metadatos: {
        titulo: plantilla.titulo,
        descripcion: plantilla.descripcion,
        fechaGeneracion: new Date(),
        tipo: plantilla.tipo
      },
      datos: metricasGenerales,
      graficos: this.generarConfiguracionGraficos(plantilla.graficos, [metricasGenerales])
    };
  }

  async generarReporteRiesgos(): Promise<any> {
    const plantilla = this.plantillas['alertas-riesgo'];
    
    // Obtener proyectos con riesgo alto o crítico
    const proyectosRiesgo = await this.proyectoRepository
      .createQueryBuilder('proyecto')
      .innerJoinAndSelect('proyecto.id', 'metrica', 'metrica.proyectoId = proyecto.id')
      .where('metrica.nivelRiesgo IN (:...niveles)', { niveles: ['ALTO', 'CRÍTICO'] })
      .getMany();

    const metricas: MetricaProyecto[] = [];
    for (const proyecto of proyectosRiesgo) {
      const metrica = await this.metricasService.obtenerMetricasProyecto(proyecto.id);
      if (metrica) metricas.push(metrica);
    }

    return this.construirReporte(plantilla, metricas);
  }

  private construirReporte(plantilla: ReporteTemplate, metricas: MetricaProyecto[]): any {
    return {
      metadatos: {
        titulo: plantilla.titulo,
        descripcion: plantilla.descripcion,
        fechaGeneracion: new Date(),
        tipo: plantilla.tipo,
        totalProyectos: metricas.length
      },
      resumenEjecutivo: this.generarResumenEjecutivo(metricas),
      datos: this.extraerDatosMetricas(plantilla.metricas, metricas),
      graficos: this.generarConfiguracionGraficos(plantilla.graficos, metricas),
      recomendaciones: this.generarRecomendaciones(metricas),
      alertas: this.generarAlertas(metricas)
    };
  }

  private generarResumenEjecutivo(metricas: MetricaProyecto[]): any {
    if (metricas.length === 0) return {};

    const promedioAvance = metricas.reduce((sum, m) => sum + m.porcentajeAvance, 0) / metricas.length;
    const promedioEficiencia = metricas.reduce((sum, m) => sum + m.indiceEficiencia, 0) / metricas.length;
    const proyectosEnRiesgo = metricas.filter(m => m.nivelRiesgo === 'ALTO' || m.nivelRiesgo === 'CRÍTICO').length;

    return {
      avancePromedio: Math.round(promedioAvance * 100) / 100,
      eficienciaPromedio: Math.round(promedioEficiencia * 100) / 100,
      proyectosAnalizados: metricas.length,
      proyectosEnRiesgo,
      estadoGeneral: proyectosEnRiesgo > metricas.length * 0.3 ? 'CRÍTICO' : 
                     proyectosEnRiesgo > metricas.length * 0.1 ? 'ATENCIÓN' : 'BUENO'
    };
  }

  private extraerDatosMetricas(metricasRequeridas: string[], metricas: MetricaProyecto[]): any {
    return metricas.map(metrica => {
      const datos: any = {
        proyecto: metrica.proyecto.nombre,
        fechaCalculo: metrica.fechaCalculo
      };

      metricasRequeridas.forEach(campo => {
        if (metrica[campo] !== undefined) {
          datos[campo] = metrica[campo];
        }
      });

      return datos;
    });
  }

  private generarConfiguracionGraficos(tiposGraficos: string[], metricas: any[]): any {
    const configuraciones = {};

    tiposGraficos.forEach(tipo => {
      configuraciones[tipo] = {
        tipo,
        configuracion: this.obtenerConfiguracionGrafico(tipo, metricas)
      };
    });

    return configuraciones;
  }

  private obtenerConfiguracionGrafico(tipo: string, datos: any[]): any {
    switch (tipo) {
      case 'progreso-temporal':
        return {
          type: 'line',
          data: datos.map(d => ({ x: d.fechaCalculo, y: d.porcentajeAvance })),
          options: { title: 'Evolución del Progreso', yAxis: 'Porcentaje de Avance' }
        };
      
      case 'distribucion-tareas':
        return {
          type: 'pie',
          data: datos.map(d => ({
            label: `Completadas: ${d.tareasCompletadas}`,
            value: d.tareasCompletadas
          })),
          options: { title: 'Distribución de Tareas' }
        };
      
      case 'radar-comparativo':
        return {
          type: 'radar',
          data: datos.map(d => ({
            proyecto: d.proyecto?.nombre || 'Proyecto',
            metricas: [d.porcentajeAvance, d.indiceEficiencia, d.indiceCalidad, d.indiceColaboracion]
          })),
          options: { 
            title: 'Comparación de Métricas',
            labels: ['Avance', 'Eficiencia', 'Calidad', 'Colaboración']
          }
        };
      
      default:
        return { type: 'bar', data: [], options: { title: tipo } };
    }
  }

  private generarRecomendaciones(metricas: MetricaProyecto[]): string[] {
    const recomendaciones: string[] = [];

    metricas.forEach(metrica => {
      if (metrica.nivelRiesgo === 'CRÍTICO' || metrica.nivelRiesgo === 'ALTO') {
        recomendaciones.push(
          `Proyecto "${metrica.proyecto.nombre}": Requiere intervención inmediata debido al nivel de riesgo ${metrica.nivelRiesgo}`
        );
      }

      if (metrica.porcentajeAvance < 30 && metrica.porcentajeTiempo > 50) {
        recomendaciones.push(
          `Proyecto "${metrica.proyecto.nombre}": Considerar reasignación de recursos o extensión de plazo`
        );
      }

      if (metrica.indiceColaboracion < 40) {
        recomendaciones.push(
          `Proyecto "${metrica.proyecto.nombre}": Mejorar la colaboración del equipo, considerar reuniones de seguimiento`
        );
      }
    });

    return recomendaciones;
  }

  private generarAlertas(metricas: MetricaProyecto[]): any[] {
    const alertas: any[] = [];

    metricas.forEach(metrica => {
      if (metrica.nivelRiesgo === 'CRÍTICO') {
        alertas.push({
          tipo: 'CRÍTICA',
          proyecto: metrica.proyecto.nombre,
          mensaje: 'Proyecto en estado crítico - Acción inmediata requerida',
          fecha: metrica.fechaCalculo
        });
      }

      if (metrica.tareasRetrasadas > 0) {
        alertas.push({
          tipo: 'ADVERTENCIA',
          proyecto: metrica.proyecto.nombre,
          mensaje: `${metrica.tareasRetrasadas} tareas retrasadas`,
          fecha: metrica.fechaCalculo
        });
      }

      if (metrica.diasRestantes <= 7 && metrica.porcentajeAvance < 80) {
        alertas.push({
          tipo: 'URGENTE',
          proyecto: metrica.proyecto.nombre,
          mensaje: 'Proyecto próximo a vencer con avance insuficiente',
          fecha: metrica.fechaCalculo
        });
      }
    });

    return alertas;
  }

  // Métodos alias para mejor compatibilidad con la API
  async generarReporteProyecto(proyectoId: number): Promise<any> {
    return this.generarReporteIndividual(proyectoId);
  }

  async generarDashboard(filtros: any = {}): Promise<any> {
    return this.generarDashboardGeneral();
  }

  async generarAlertasRiesgo(filtros: any = {}): Promise<any> {
    return this.generarReporteRiesgos();
  }

  async generarEvolucionTemporal(filtros: any): Promise<any> {
    // Implementación básica para evolución temporal
    const proyectos = await this.proyectoRepository.find({
      relations: ['tareas', 'metricas']
    });

    const evolucion: EvolucionTemporal[] = [];
    const fechaInicio = new Date(filtros.fechaInicio || '2024-01-01');
    const fechaFin = new Date(filtros.fechaFin || new Date());

    // Generar datos mensuales
    const meses = this.generarRangoMeses(fechaInicio, fechaFin);
    
    for (const mes of meses) {
      const progresoPromedio = await this.calcularProgresoPromedioPorMes(mes);
      const eficienciaPromedio = await this.calcularEficienciaPromedioPorMes(mes);
      
      evolucion.push({
        periodo: mes.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }),
        progreso: progresoPromedio,
        eficiencia: eficienciaPromedio,
        tendencia: 'Estable' // Simplificado por ahora
      });
    }

    return {
      tipo: 'temporal',
      filtros,
      evolucion,
      generadoEl: new Date()
    };
  }

  async generarReporteProductividad(filtros: any): Promise<any> {
    // Implementación básica para productividad
    const usuarios = await this.usuarioRepository.find();

    const productividad: ProductividadUsuario[] = [];

    for (const usuario of usuarios) {
      // Simplificar acceso a propiedades de Usuario
      const tareasCompletadas = 0; // Se obtendría de la tabla de tareas
      const horasTrabajo = 0; // Se obtendría del log de actividades
      const eficiencia = 0; // Se calcularía basado en datos reales

      productividad.push({
       usuario: usuario.userName || `Usuario ID: ${usuario.idsysuser}`,
        tareasCompletadas,
        horasTrabajo: horasTrabajo || 0,
        eficiencia
      });
    }

    // Ordenar por eficiencia
    productividad.sort((a, b) => b.eficiencia - a.eficiencia);

    return {
      tipo: 'productividad',
      filtros,
      productividad,
      generadoEl: new Date()
    };
  }

  private generarRangoMeses(inicio: Date, fin: Date): Date[] {
    const meses: Date[] = [];
    const actual = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
    
    while (actual <= fin) {
      meses.push(new Date(actual));
      actual.setMonth(actual.getMonth() + 1);
    }
    
    return meses;
  }

  private async calcularProgresoPromedioPorMes(fecha: Date): Promise<number> {
    // Implementación simplificada
    const proyectos = await this.proyectoRepository.find();
    const progresos = proyectos.map(p => Math.random() * 100); // Placeholder
    return Math.round(progresos.reduce((a, b) => a + b, 0) / progresos.length);
  }

  private async calcularEficienciaPromedioPorMes(fecha: Date): Promise<number> {
    // Implementación simplificada
    return Math.round(Math.random() * 100); // Placeholder
  }

  private calcularTendencia(evolucion: any[]): string {
    if (evolucion.length < 2) return 'Estable';
    const ultimo = evolucion[evolucion.length - 1];
    const anterior = evolucion[evolucion.length - 2];
    
    if (ultimo.progreso > anterior.progreso) return 'Creciente';
    if (ultimo.progreso < anterior.progreso) return 'Decreciente';
    return 'Estable';
  }

  private calcularHorasTrabajo(tareas: any[]): number {
    // Implementación simplificada - calcular horas basado en tareas
    return tareas.length * 8; // Placeholder: 8 horas por tarea
  }
}