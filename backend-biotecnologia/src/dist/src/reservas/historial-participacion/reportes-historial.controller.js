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
exports.ReportesHistorialController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const reportes_historial_service_1 = require("./reportes-historial.service");
const historial_participacion_dto_1 = require("./dto/historial-participacion.dto");
let ReportesHistorialController = class ReportesHistorialController {
    reportesService;
    constructor(reportesService) {
        this.reportesService = reportesService;
    }
    async descargarReporteExcel(filtros, res, req) {
        try {
            if (req.user.rol?.nombre !== 'admin' && filtros.usuarioId && filtros.usuarioId !== req.user.id) {
                filtros.usuarioId = req.user.id;
            }
            else if (!filtros.usuarioId && req.user.rol?.nombre !== 'admin') {
                filtros.usuarioId = req.user.id;
            }
            const buffer = await this.reportesService.generarReporteExcel(filtros);
            const fechaActual = new Date().toISOString().split('T')[0];
            const nombreArchivo = `historial-participacion-${fechaActual}.xlsx`;
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${nombreArchivo}"`,
                'Content-Length': buffer.length.toString()
            });
            res.send(buffer);
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al generar el reporte Excel',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async descargarReporteCSV(filtros, res, req) {
        try {
            if (req.user.rol?.nombre !== 'admin' && filtros.usuarioId && filtros.usuarioId !== req.user.id) {
                filtros.usuarioId = req.user.id;
            }
            else if (!filtros.usuarioId && req.user.rol?.nombre !== 'admin') {
                filtros.usuarioId = req.user.id;
            }
            const csvData = await this.reportesService.generarReporteCSV(filtros);
            const fechaActual = new Date().toISOString().split('T')[0];
            const nombreArchivo = `historial-participacion-${fechaActual}.csv`;
            res.set({
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${nombreArchivo}"`
            });
            res.send('\ufeff' + csvData);
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al generar el reporte CSV',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ReportesHistorialController = ReportesHistorialController;
__decorate([
    (0, common_1.Get)('excel'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [historial_participacion_dto_1.FiltroHistorialDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesHistorialController.prototype, "descargarReporteExcel", null);
__decorate([
    (0, common_1.Get)('csv'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [historial_participacion_dto_1.FiltroHistorialDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesHistorialController.prototype, "descargarReporteCSV", null);
exports.ReportesHistorialController = ReportesHistorialController = __decorate([
    (0, common_1.Controller)('reportes/historial-participacion'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [reportes_historial_service_1.ReportesHistorialService])
], ReportesHistorialController);
//# sourceMappingURL=reportes-historial.controller.js.map