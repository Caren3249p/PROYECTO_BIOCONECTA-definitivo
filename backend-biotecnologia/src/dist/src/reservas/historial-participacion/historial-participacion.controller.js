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
exports.HistorialParticipacionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const historial_participacion_service_1 = require("./historial-participacion.service");
const historial_participacion_dto_1 = require("./dto/historial-participacion.dto");
let HistorialParticipacionController = class HistorialParticipacionController {
    historialService;
    constructor(historialService) {
        this.historialService = historialService;
    }
    async obtenerHistorial(filtros, req) {
        try {
            if (!filtros.usuarioId && req.user.rol?.nombre !== 'admin') {
                filtros.usuarioId = req.user.id;
            }
            const resultado = await this.historialService.obtenerHistorial(filtros);
            return {
                success: true,
                data: resultado
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al obtener el historial de participación',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerMiHistorial(filtros, req) {
        try {
            filtros.usuarioId = req.user.id;
            const resultado = await this.historialService.obtenerHistorial(filtros);
            return {
                success: true,
                data: resultado
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al obtener tu historial de participación',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerEstadisticas(usuarioId, fechaInicio, fechaFin, req) {
        try {
            if (req.user.rol?.nombre !== 'admin' && usuarioId && usuarioId !== req.user.id) {
                usuarioId = req.user.id;
            }
            else if (!usuarioId && req.user.rol?.nombre !== 'admin') {
                usuarioId = req.user.id;
            }
            const estadisticas = await this.historialService.obtenerEstadisticas(usuarioId, fechaInicio, fechaFin);
            return {
                success: true,
                data: estadisticas
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al obtener las estadísticas',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerTiposParticipacion() {
        try {
            const tipos = await this.historialService.obtenerTiposParticipacion();
            return {
                success: true,
                data: tipos
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al obtener los tipos de participación',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async crearRegistro(datos, req) {
        try {
            if (req.user.rol?.nombre !== 'admin' && datos.usuarioId !== req.user.id) {
                throw new common_1.HttpException('No tienes permisos para crear registros para otros usuarios', common_1.HttpStatus.FORBIDDEN);
            }
            const registro = await this.historialService.crearRegistro(datos);
            return {
                success: true,
                data: registro,
                message: 'Registro de participación creado exitosamente'
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al crear el registro de participación',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.HistorialParticipacionController = HistorialParticipacionController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [historial_participacion_dto_1.FiltroHistorialDto, Object]),
    __metadata("design:returntype", Promise)
], HistorialParticipacionController.prototype, "obtenerHistorial", null);
__decorate([
    (0, common_1.Get)('mi-historial'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [historial_participacion_dto_1.FiltroHistorialDto, Object]),
    __metadata("design:returntype", Promise)
], HistorialParticipacionController.prototype, "obtenerMiHistorial", null);
__decorate([
    (0, common_1.Get)('estadisticas'),
    __param(0, (0, common_1.Query)('usuarioId')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], HistorialParticipacionController.prototype, "obtenerEstadisticas", null);
__decorate([
    (0, common_1.Get)('tipos-participacion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HistorialParticipacionController.prototype, "obtenerTiposParticipacion", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [historial_participacion_dto_1.CrearHistorialDto, Object]),
    __metadata("design:returntype", Promise)
], HistorialParticipacionController.prototype, "crearRegistro", null);
exports.HistorialParticipacionController = HistorialParticipacionController = __decorate([
    (0, common_1.Controller)('historial-participacion'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [historial_participacion_service_1.HistorialParticipacionService])
], HistorialParticipacionController);
//# sourceMappingURL=historial-participacion.controller.js.map