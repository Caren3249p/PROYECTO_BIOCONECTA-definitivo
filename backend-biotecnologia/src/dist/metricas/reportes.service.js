"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportesService = void 0;
const common_1 = require("@nestjs/common");
const metricas_service_1 = require("./metricas.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proyectos_entity_1 = require("../src/proyectos/proyectos.entity");
const usuarios_entity_1 = require("../src/usuarios/usuarios.entity");
let ReportesService = class ReportesService {
    metricasService;
    proyectoRepository;
    usuarioRepository;
    plantillas = {
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
    constructor(metricasService, proyectoRepository, usuarioRepository) {
        this.metricasService = metricasService;
        this.proyectoRepository = proyectoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    obtenerPlantillas() {
        return this.plantillas;
    }
    obtenerPlantilla(codigo) {
        return this.plantillas[codigo] || null;
    }
    async generarReporteIndividual(proyectoId) {
        const plantilla = this.plantillas['desempeño-proyecto'];
        const metrica = await this.metricasService.obtenerMetricasProyecto(proyectoId);
        if (!metrica) {
            await this.metricasService.calcularMetricasProyecto(proyectoId);
            const nuevaMetrica = await this.metricasService.obtenerMetricasProyecto(proyectoId);
            if (!nuevaMetrica) {
                throw new Error('No se pudo generar la métrica del proyecto');
            }
            return this.construirReporte(plantilla, [nuevaMetrica]);
        }
        return this.construirReporte(plantilla, [metrica]);
    }
    async generarReporteComparativo(proyectoIds) {
        const plantilla = this.plantillas['comparativo-proyectos'];
        const metricas = [];
        for (const id of proyectoIds) {
            let metrica = await this.metricasService.obtenerMetricasProyecto(id);
            if (!metrica) {
                await this.metricasService.calcularMetricasProyecto(id);
                metrica = await this.metricasService.obtenerMetricasProyecto(id);
            }
            if (metrica)
                metricas.push(metrica);
        }
        return this.construirReporte(plantilla, metricas);
    }
    async generarDashboardGeneral() {
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
    async generarReporteRiesgos() {
        const plantilla = this.plantillas['alertas-riesgo'];
        const proyectosRiesgo = await this.proyectoRepository
            .createQueryBuilder('proyecto')
            .innerJoinAndSelect('proyecto.id', 'metrica', 'metrica.proyectoId = proyecto.id')
            .where('metrica.nivelRiesgo IN (:...niveles)', { niveles: ['ALTO', 'CRÍTICO'] })
            .getMany();
        const metricas = [];
        for (const proyecto of proyectosRiesgo) {
            const metrica = await this.metricasService.obtenerMetricasProyecto(proyecto.id);
            if (metrica)
                metricas.push(metrica);
        }
        return this.construirReporte(plantilla, metricas);
    }
    construirReporte(plantilla, metricas) {
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
    generarResumenEjecutivo(metricas) {
        if (metricas.length === 0)
            return {};
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
    extraerDatosMetricas(metricasRequeridas, metricas) {
        return metricas.map(metrica => {
            const datos = {
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
    generarConfiguracionGraficos(tiposGraficos, metricas) {
        const configuraciones = {};
        tiposGraficos.forEach(tipo => {
            configuraciones[tipo] = {
                tipo,
                configuracion: this.obtenerConfiguracionGrafico(tipo, metricas)
            };
        });
        return configuraciones;
    }
    obtenerConfiguracionGrafico(tipo, datos) {
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
    generarRecomendaciones(metricas) {
        const recomendaciones = [];
        metricas.forEach(metrica => {
            if (metrica.nivelRiesgo === 'CRÍTICO' || metrica.nivelRiesgo === 'ALTO') {
                recomendaciones.push(`Proyecto "${metrica.proyecto.nombre}": Requiere intervención inmediata debido al nivel de riesgo ${metrica.nivelRiesgo}`);
            }
            if (metrica.porcentajeAvance < 30 && metrica.porcentajeTiempo > 50) {
                recomendaciones.push(`Proyecto "${metrica.proyecto.nombre}": Considerar reasignación de recursos o extensión de plazo`);
            }
            if (metrica.indiceColaboracion < 40) {
                recomendaciones.push(`Proyecto "${metrica.proyecto.nombre}": Mejorar la colaboración del equipo, considerar reuniones de seguimiento`);
            }
        });
        return recomendaciones;
    }
    generarAlertas(metricas) {
        const alertas = [];
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
    async generarReporteProyecto(proyectoId) {
        return this.generarReporteIndividual(proyectoId);
    }
    async generarDashboard(filtros = {}) {
        return this.generarDashboardGeneral();
    }
    async generarAlertasRiesgo(filtros = {}) {
        return this.generarReporteRiesgos();
    }
    async generarEvolucionTemporal(filtros) {
        const proyectos = await this.proyectoRepository.find({
            relations: ['tareas', 'metricas']
        });
        const evolucion = [];
        const fechaInicio = new Date(filtros.fechaInicio || '2024-01-01');
        const fechaFin = new Date(filtros.fechaFin || new Date());
        const meses = this.generarRangoMeses(fechaInicio, fechaFin);
        for (const mes of meses) {
            const progresoPromedio = await this.calcularProgresoPromedioPorMes(mes);
            const eficienciaPromedio = await this.calcularEficienciaPromedioPorMes(mes);
            evolucion.push({
                periodo: mes.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }),
                progreso: progresoPromedio,
                eficiencia: eficienciaPromedio,
                tendencia: 'Estable'
            });
        }
        return {
            tipo: 'temporal',
            filtros,
            evolucion,
            generadoEl: new Date()
        };
    }
    async generarReporteProductividad(filtros) {
        const usuarios = await this.usuarioRepository.find();
        const productividad = [];
        for (const usuario of usuarios) {
            const tareasCompletadas = 0;
            const horasTrabajo = 0;
            const eficiencia = 0;
            productividad.push({
                usuario: usuario.nombre || `Usuario ID: ${usuario.id}`,
                tareasCompletadas,
                horasTrabajo: horasTrabajo || 0,
                eficiencia
            });
        }
        productividad.sort((a, b) => b.eficiencia - a.eficiencia);
        return {
            tipo: 'productividad',
            filtros,
            productividad,
            generadoEl: new Date()
        };
    }
    generarRangoMeses(inicio, fin) {
        const meses = [];
        const actual = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
        while (actual <= fin) {
            meses.push(new Date(actual));
            actual.setMonth(actual.getMonth() + 1);
        }
        return meses;
    }
    async calcularProgresoPromedioPorMes(fecha) {
        const proyectos = await this.proyectoRepository.find();
        const progresos = proyectos.map(p => Math.random() * 100);
        return Math.round(progresos.reduce((a, b) => a + b, 0) / progresos.length);
    }
    async calcularEficienciaPromedioPorMes(fecha) {
        return Math.round(Math.random() * 100);
    }
    calcularTendencia(evolucion) {
        if (evolucion.length < 2)
            return 'Estable';
        const ultimo = evolucion[evolucion.length - 1];
        const anterior = evolucion[evolucion.length - 2];
        if (ultimo.progreso > anterior.progreso)
            return 'Creciente';
        if (ultimo.progreso < anterior.progreso)
            return 'Decreciente';
        return 'Estable';
    }
    calcularHorasTrabajo(tareas) {
        return tareas.length * 8;
    }
};
exports.ReportesService = ReportesService;
exports.ReportesService = ReportesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(proyectos_entity_1.Proyecto)),
    __param(2, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [metricas_service_1.MetricasService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportesService);
//# sourceMappingURL=reportes.service.js.map