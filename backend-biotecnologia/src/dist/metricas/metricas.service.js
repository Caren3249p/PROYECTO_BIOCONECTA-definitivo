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
exports.MetricasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const metrica_proyecto_entity_1 = require("./metrica-proyecto.entity");
const proyectos_entity_1 = require("../src/proyectos/proyectos.entity");
const tarea_entity_1 = require("../src/tareas/tarea.entity");
const hitos_entity_1 = require("../src/Hitos/hitos.entity");
const documento_entity_1 = require("../src/Documentos/documento.entity");
const usuarios_entity_1 = require("../src/usuarios/usuarios.entity");
let MetricasService = class MetricasService {
    metricaRepository;
    proyectoRepository;
    tareaRepository;
    hitoRepository;
    documentoRepository;
    usuarioRepository;
    constructor(metricaRepository, proyectoRepository, tareaRepository, hitoRepository, documentoRepository, usuarioRepository) {
        this.metricaRepository = metricaRepository;
        this.proyectoRepository = proyectoRepository;
        this.tareaRepository = tareaRepository;
        this.hitoRepository = hitoRepository;
        this.documentoRepository = documentoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async calcularMetricasProyecto(proyectoId) {
        const proyecto = await this.proyectoRepository.findOne({
            where: { id: proyectoId },
            relations: ['tareas', 'tareas.usuario']
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('Proyecto no encontrado');
        }
        const metrica = new metrica_proyecto_entity_1.MetricaProyecto();
        metrica.proyecto = proyecto;
        const fechaInicio = proyecto.fechaInicio ? new Date(proyecto.fechaInicio) : new Date();
        const fechaFin = proyecto.fechaFin ? new Date(proyecto.fechaFin) : new Date();
        const fechaActual = new Date();
        metrica.diasTranscurridos = Math.max(0, Math.floor((fechaActual.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)));
        metrica.diasRestantes = Math.max(0, Math.floor((fechaFin.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24)));
        const diasTotales = Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
        metrica.porcentajeTiempo = diasTotales > 0 ? (metrica.diasTranscurridos / diasTotales) * 100 : 0;
        const tareas = await this.tareaRepository.find({ where: { proyecto: { id: proyectoId } } });
        metrica.totalTareas = tareas.length;
        metrica.tareasCompletadas = tareas.filter(t => t.estado === 'completada').length;
        metrica.tareasEnProgreso = tareas.filter(t => t.estado === 'en progreso').length;
        metrica.tareasPendientes = tareas.filter(t => t.estado === 'pendiente').length;
        metrica.tareasRetrasadas = tareas.filter(t => t.estado === 'retrasado').length;
        metrica.porcentajeAvance = metrica.totalTareas > 0 ? (metrica.tareasCompletadas / metrica.totalTareas) * 100 : 0;
        const hitos = await this.hitoRepository.find({ where: { proyecto: { id: proyectoId } } });
        metrica.totalHitos = hitos.length;
        metrica.hitosCompletados = hitos.filter(h => h.estado === 'completado').length;
        metrica.hitosRetrasados = hitos.filter(h => h.estado === 'retrasado').length;
        const usuariosUnicos = [...new Set(tareas.map(t => t.usuario?.id).filter(id => id))];
        metrica.usuariosActivos = usuariosUnicos.length;
        const documentos = await this.documentoRepository.count({ where: { proyecto: { id: proyectoId } } });
        metrica.documentosGenerados = documentos;
        metrica.indiceEficiencia = metrica.diasTranscurridos > 0 ?
            (metrica.tareasCompletadas / metrica.diasTranscurridos) * 100 : 0;
        metrica.indiceCalidad = metrica.totalHitos > 0 ?
            (metrica.hitosCompletados / metrica.totalHitos) * 100 : 0;
        metrica.indiceColaboracion = metrica.usuariosActivos > 0 ?
            (metrica.usuariosActivos / Math.max(1, metrica.totalTareas)) * 100 : 0;
        metrica.nivelRiesgo = this.calcularNivelRiesgo(metrica);
        metrica.fechaProximaRevision = new Date();
        metrica.fechaProximaRevision.setDate(metrica.fechaProximaRevision.getDate() + 7);
        return this.metricaRepository.save(metrica);
    }
    calcularNivelRiesgo(metrica) {
        let riesgo = 0;
        if (metrica.porcentajeTiempo > 80 && metrica.porcentajeAvance < 60)
            riesgo += 2;
        if (metrica.porcentajeTiempo > 60 && metrica.porcentajeAvance < 40)
            riesgo += 1;
        if (metrica.totalTareas > 0) {
            const porcentajeRetrasadas = (metrica.tareasRetrasadas / metrica.totalTareas) * 100;
            if (porcentajeRetrasadas > 30)
                riesgo += 2;
            else if (porcentajeRetrasadas > 15)
                riesgo += 1;
        }
        if (metrica.totalHitos > 0) {
            const porcentajeHitosRetrasados = (metrica.hitosRetrasados / metrica.totalHitos) * 100;
            if (porcentajeHitosRetrasados > 50)
                riesgo += 2;
            else if (porcentajeHitosRetrasados > 25)
                riesgo += 1;
        }
        if (metrica.indiceColaboracion < 30)
            riesgo += 1;
        if (riesgo >= 4)
            return 'CRÍTICO';
        if (riesgo >= 3)
            return 'ALTO';
        if (riesgo >= 2)
            return 'MEDIO';
        return 'BAJO';
    }
    async obtenerMetricasProyecto(proyectoId) {
        return this.metricaRepository.findOne({
            where: { proyecto: { id: proyectoId } },
            relations: ['proyecto'],
            order: { fechaCalculo: 'DESC' }
        });
    }
    async obtenerMetricasGenerales() {
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
    async calcularPromedio(campo) {
        const resultado = await this.metricaRepository
            .createQueryBuilder('metrica')
            .select(`AVG(metrica.${campo})`, 'promedio')
            .getRawOne();
        return parseFloat(resultado.promedio) || 0;
    }
    async actualizarTodasLasMetricas() {
        const proyectos = await this.proyectoRepository.find();
        for (const proyecto of proyectos) {
            await this.calcularMetricasProyecto(proyecto.id);
        }
    }
    async obtenerMetricasPorRango(fechaInicio, fechaFin) {
        return this.metricaRepository.find({
            where: {
                fechaCalculo: {
                    gte: fechaInicio,
                    lte: fechaFin
                }
            },
            relations: ['proyecto'],
            order: { fechaCalculo: 'DESC' }
        });
    }
};
exports.MetricasService = MetricasService;
exports.MetricasService = MetricasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metrica_proyecto_entity_1.MetricaProyecto)),
    __param(1, (0, typeorm_1.InjectRepository)(proyectos_entity_1.Proyecto)),
    __param(2, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __param(3, (0, typeorm_1.InjectRepository)(hitos_entity_1.Hito)),
    __param(4, (0, typeorm_1.InjectRepository)(documento_entity_1.Documento)),
    __param(5, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MetricasService);
//# sourceMappingURL=metricas.service.js.map