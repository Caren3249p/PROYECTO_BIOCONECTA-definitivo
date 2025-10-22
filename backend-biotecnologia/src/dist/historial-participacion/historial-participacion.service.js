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
exports.HistorialParticipacionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const historial_participacion_entity_1 = require("./historial-participacion.entity");
const usuarios_entity_1 = require("../src/usuarios/usuarios.entity");
const proyectos_entity_1 = require("../src/proyectos/proyectos.entity");
let HistorialParticipacionService = class HistorialParticipacionService {
    historialRepository;
    usuarioRepository;
    proyectoRepository;
    constructor(historialRepository, usuarioRepository, proyectoRepository) {
        this.historialRepository = historialRepository;
        this.usuarioRepository = usuarioRepository;
        this.proyectoRepository = proyectoRepository;
    }
    async obtenerHistorial(filtros) {
        const { usuarioId, proyectoId, tipoParticipacion, fechaInicio, fechaFin, limite = 50, pagina = 1 } = filtros;
        const queryBuilder = this.historialRepository
            .createQueryBuilder('historial')
            .leftJoinAndSelect('historial.usuario', 'usuario')
            .leftJoinAndSelect('historial.proyecto', 'proyecto')
            .where('historial.activo = :activo', { activo: true });
        if (usuarioId) {
            queryBuilder.andWhere('historial.usuario.id = :usuarioId', { usuarioId });
        }
        if (proyectoId) {
            queryBuilder.andWhere('historial.proyecto.id = :proyectoId', { proyectoId });
        }
        if (tipoParticipacion) {
            queryBuilder.andWhere('historial.tipoParticipacion = :tipoParticipacion', { tipoParticipacion });
        }
        if (fechaInicio && fechaFin) {
            queryBuilder.andWhere('historial.fechaEvento BETWEEN :fechaInicio AND :fechaFin', {
                fechaInicio,
                fechaFin
            });
        }
        else if (fechaInicio) {
            queryBuilder.andWhere('historial.fechaEvento >= :fechaInicio', { fechaInicio });
        }
        else if (fechaFin) {
            queryBuilder.andWhere('historial.fechaEvento <= :fechaFin', { fechaFin });
        }
        const total = await queryBuilder.getCount();
        const registros = await queryBuilder
            .orderBy('historial.fechaEvento', 'DESC')
            .skip((pagina - 1) * limite)
            .take(limite)
            .getMany();
        return {
            registros,
            total,
            pagina,
            totalPaginas: Math.ceil(total / limite),
            limite
        };
    }
    async crearRegistro(datos) {
        const usuario = await this.usuarioRepository.findOne({ where: { id: datos.usuarioId } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        let proyecto = null;
        if (datos.proyectoId) {
            proyecto = await this.proyectoRepository.findOne({ where: { id: datos.proyectoId } });
        }
        const registro = this.historialRepository.create({
            usuario,
            tipoParticipacion: datos.tipoParticipacion,
            descripcion: datos.descripcion,
            entidadTipo: datos.entidadTipo,
            entidadId: datos.entidadId,
            proyecto: proyecto || undefined,
            metadatos: datos.metadatos
        });
        return await this.historialRepository.save(registro);
    }
    async obtenerEstadisticas(usuarioId, fechaInicio, fechaFin) {
        const queryBuilder = this.historialRepository
            .createQueryBuilder('historial')
            .where('historial.activo = :activo', { activo: true });
        if (usuarioId) {
            queryBuilder.andWhere('historial.usuario.id = :usuarioId', { usuarioId });
        }
        if (fechaInicio && fechaFin) {
            queryBuilder.andWhere('historial.fechaEvento BETWEEN :fechaInicio AND :fechaFin', {
                fechaInicio,
                fechaFin
            });
        }
        const estadisticasPorTipo = await queryBuilder
            .select('historial.tipoParticipacion', 'tipo')
            .addSelect('COUNT(*)', 'cantidad')
            .groupBy('historial.tipoParticipacion')
            .getRawMany();
        const total = await queryBuilder.getCount();
        const participacionPorMes = await queryBuilder
            .select('DATE_FORMAT(historial.fechaEvento, "%Y-%m")', 'mes')
            .addSelect('COUNT(*)', 'cantidad')
            .groupBy('mes')
            .orderBy('mes', 'DESC')
            .limit(12)
            .getRawMany();
        return {
            total,
            estadisticasPorTipo,
            participacionPorMes
        };
    }
    async obtenerTiposParticipacion() {
        return Object.values(historial_participacion_entity_1.TipoParticipacion).map(tipo => ({
            valor: tipo,
            etiqueta: this.obtenerEtiquetaTipo(tipo)
        }));
    }
    obtenerEtiquetaTipo(tipo) {
        const etiquetas = {
            [historial_participacion_entity_1.TipoParticipacion.TAREA_ASIGNADA]: 'Tarea Asignada',
            [historial_participacion_entity_1.TipoParticipacion.TAREA_COMPLETADA]: 'Tarea Completada',
            [historial_participacion_entity_1.TipoParticipacion.RESERVA_CREADA]: 'Reserva Creada',
            [historial_participacion_entity_1.TipoParticipacion.RESERVA_COMPLETADA]: 'Reserva Completada',
            [historial_participacion_entity_1.TipoParticipacion.ASISTENCIA_REGISTRADA]: 'Asistencia Registrada',
            [historial_participacion_entity_1.TipoParticipacion.PROYECTO_ASIGNADO]: 'Proyecto Asignado',
            [historial_participacion_entity_1.TipoParticipacion.HITO_COMPLETADO]: 'Hito Completado',
            [historial_participacion_entity_1.TipoParticipacion.DOCUMENTO_SUBIDO]: 'Documento Subido'
        };
        return etiquetas[tipo] || tipo;
    }
    async registrarTareaAsignada(usuarioId, tareaId, proyectoId, descripcion) {
        return this.crearRegistro({
            usuarioId,
            tipoParticipacion: historial_participacion_entity_1.TipoParticipacion.TAREA_ASIGNADA,
            descripcion: descripcion || 'Se asignó una nueva tarea',
            entidadTipo: 'tarea',
            entidadId: tareaId,
            proyectoId,
            metadatos: { tareaId }
        });
    }
    async registrarTareaCompletada(usuarioId, tareaId, proyectoId, descripcion) {
        return this.crearRegistro({
            usuarioId,
            tipoParticipacion: historial_participacion_entity_1.TipoParticipacion.TAREA_COMPLETADA,
            descripcion: descripcion || 'Se completó una tarea',
            entidadTipo: 'tarea',
            entidadId: tareaId,
            proyectoId,
            metadatos: { tareaId }
        });
    }
    async registrarReservaCreada(usuarioId, reservaId, servicioNombre) {
        return this.crearRegistro({
            usuarioId,
            tipoParticipacion: historial_participacion_entity_1.TipoParticipacion.RESERVA_CREADA,
            descripcion: `Se creó una reserva${servicioNombre ? ` para ${servicioNombre}` : ''}`,
            entidadTipo: 'reserva',
            entidadId: reservaId,
            metadatos: { reservaId, servicioNombre }
        });
    }
    async registrarAsistencia(usuarioId, reservaId, servicioNombre) {
        return this.crearRegistro({
            usuarioId,
            tipoParticipacion: historial_participacion_entity_1.TipoParticipacion.ASISTENCIA_REGISTRADA,
            descripcion: `Se registró asistencia${servicioNombre ? ` a ${servicioNombre}` : ''}`,
            entidadTipo: 'asistencia',
            entidadId: reservaId,
            metadatos: { reservaId, servicioNombre }
        });
    }
};
exports.HistorialParticipacionService = HistorialParticipacionService;
exports.HistorialParticipacionService = HistorialParticipacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(historial_participacion_entity_1.HistorialParticipacion)),
    __param(1, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(proyectos_entity_1.Proyecto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HistorialParticipacionService);
//# sourceMappingURL=historial-participacion.service.js.map