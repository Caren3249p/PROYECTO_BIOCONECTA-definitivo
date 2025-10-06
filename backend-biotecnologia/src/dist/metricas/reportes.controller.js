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
exports.ReportesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../src/auth/jwt-auth.guard");
const roles_guard_1 = require("../src/auth/roles.guard");
const roles_decorator_1 = require("../src/auth/roles.decorator");
const metricas_service_1 = require("./metricas.service");
const reportes_service_1 = require("./reportes.service");
const export_service_1 = require("./export.service");
const logs_service_1 = require("../src/logs/logs.service");
let ReportesController = class ReportesController {
    metricasService;
    reportesService;
    exportService;
    logsService;
    constructor(metricasService, reportesService, exportService, logsService) {
        this.metricasService = metricasService;
        this.reportesService = reportesService;
        this.exportService = exportService;
        this.logsService = logsService;
    }
    obtenerPlantillas() {
        return this.reportesService.obtenerPlantillas();
    }
    async calcularMetricasProyecto(id, req) {
        const metrica = await this.metricasService.calcularMetricasProyecto(Number(id));
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Calculó métricas del proyecto ${id}`);
        return metrica;
    }
    async obtenerMetricasProyecto(id) {
        return this.metricasService.obtenerMetricasProyecto(Number(id));
    }
    async generarReporteIndividual(id, req) {
        const reporte = await this.reportesService.generarReporteIndividual(Number(id));
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Generó reporte individual del proyecto ${id}`);
        return reporte;
    }
    async generarReporteComparativo(body, req) {
        const reporte = await this.reportesService.generarReporteComparativo(body.proyectoIds);
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Generó reporte comparativo de ${body.proyectoIds.length} proyectos`);
        return reporte;
    }
    async generarDashboardGeneral(req) {
        const dashboard = await this.reportesService.generarDashboardGeneral();
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, 'Accedió al dashboard general de reportes');
        return dashboard;
    }
    async generarReporteRiesgos(req) {
        const reporte = await this.reportesService.generarReporteRiesgos();
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, 'Generó reporte de alertas y riesgos');
        return reporte;
    }
    async obtenerMetricasGenerales() {
        return this.metricasService.obtenerMetricasGenerales();
    }
    async actualizarTodasLasMetricas(req) {
        await this.metricasService.actualizarTodasLasMetricas();
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, 'Actualizó todas las métricas del sistema');
        return { mensaje: 'Todas las métricas han sido actualizadas correctamente' };
    }
    async obtenerMetricasPorRango(fechaInicio, fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        return this.metricasService.obtenerMetricasPorRango(inicio, fin);
    }
    obtenerFiltrosDisponibles() {
        return {
            proyectos: {
                tipo: 'select-multiple',
                endpoint: '/proyectos',
                label: 'Seleccionar Proyectos'
            },
            fechas: {
                tipo: 'date-range',
                opciones: [
                    { label: 'Última semana', valor: '7d' },
                    { label: 'Último mes', valor: '30d' },
                    { label: 'Últimos 3 meses', valor: '90d' },
                    { label: 'Personalizado', valor: 'custom' }
                ]
            },
            metricas: {
                tipo: 'checkbox-group',
                opciones: [
                    { label: 'Porcentaje de Avance', valor: 'porcentajeAvance' },
                    { label: 'Índice de Eficiencia', valor: 'indiceEficiencia' },
                    { label: 'Índice de Calidad', valor: 'indiceCalidad' },
                    { label: 'Índice de Colaboración', valor: 'indiceColaboracion' },
                    { label: 'Nivel de Riesgo', valor: 'nivelRiesgo' }
                ]
            },
            tipoReporte: {
                tipo: 'radio',
                opciones: [
                    { label: 'Individual', valor: 'individual' },
                    { label: 'Comparativo', valor: 'comparativo' },
                    { label: 'Dashboard General', valor: 'dashboard' },
                    { label: 'Alertas de Riesgo', valor: 'riesgos' }
                ]
            }
        };
    }
    async exportarProyectoPDF(proyectoId, res, req) {
        try {
            const reporte = await this.reportesService.generarReporteProyecto(proyectoId);
            await this.exportService.exportToPDF(reporte, 'proyecto', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, `Exportó reporte PDF del proyecto ${proyectoId}`);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar reporte' });
        }
    }
    async exportarProyectoExcel(proyectoId, res, req) {
        try {
            const reporte = await this.reportesService.generarReporteProyecto(proyectoId);
            await this.exportService.exportToExcel(reporte, 'proyecto', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, `Exportó reporte Excel del proyecto ${proyectoId}`);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar reporte' });
        }
    }
    async exportarComparativoPDF(filtros, res, req) {
        try {
            const reporte = await this.reportesService.generarReporteComparativo(filtros);
            await this.exportService.exportToPDF(reporte, 'comparativo', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó reporte comparativo en PDF');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar reporte' });
        }
    }
    async exportarComparativoExcel(filtros, res, req) {
        try {
            const reporte = await this.reportesService.generarReporteComparativo(filtros);
            await this.exportService.exportToExcel(reporte, 'comparativo', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó reporte comparativo en Excel');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar reporte' });
        }
    }
    async exportarDashboardPDF(filtros, res, req) {
        try {
            const reporte = await this.reportesService.generarDashboard(filtros);
            await this.exportService.exportToPDF(reporte, 'dashboard', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó dashboard en PDF');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar dashboard' });
        }
    }
    async exportarDashboardExcel(filtros, res, req) {
        try {
            const reporte = await this.reportesService.generarDashboard(filtros);
            await this.exportService.exportToExcel(reporte, 'dashboard', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó dashboard en Excel');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar dashboard' });
        }
    }
    async exportarRiesgosPDF(res, req, nivelMinimo) {
        try {
            const filtros = nivelMinimo ? { nivelMinimo } : {};
            const reporte = await this.reportesService.generarAlertasRiesgo(filtros);
            await this.exportService.exportToPDF(reporte, 'riesgo', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó reporte de riesgos en PDF');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar reporte de riesgos' });
        }
    }
    async exportarTemporalExcel(filtros, res, req) {
        try {
            const reporte = await this.reportesService.generarEvolucionTemporal(filtros);
            await this.exportService.exportToExcel(reporte, 'temporal', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó análisis temporal en Excel');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar evolución temporal' });
        }
    }
    async exportarProductividadExcel(filtros, res, req) {
        try {
            const reporte = await this.reportesService.generarReporteProductividad(filtros);
            await this.exportService.exportToExcel(reporte, 'productividad', res);
            const usuario = req.user?.email || 'anonimo';
            await this.logsService.registrar(usuario, 'Exportó reporte de productividad en Excel');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al exportar reporte de productividad' });
        }
    }
};
exports.ReportesController = ReportesController;
__decorate([
    (0, common_1.Get)('plantillas'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "obtenerPlantillas", null);
__decorate([
    (0, common_1.Post)('metricas/proyecto/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "calcularMetricasProyecto", null);
__decorate([
    (0, common_1.Get)('metricas/proyecto/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor', 'Estudiante'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "obtenerMetricasProyecto", null);
__decorate([
    (0, common_1.Get)('individual/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "generarReporteIndividual", null);
__decorate([
    (0, common_1.Post)('comparativo'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "generarReporteComparativo", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "generarDashboardGeneral", null);
__decorate([
    (0, common_1.Get)('riesgos'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "generarReporteRiesgos", null);
__decorate([
    (0, common_1.Get)('metricas/generales'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "obtenerMetricasGenerales", null);
__decorate([
    (0, common_1.Post)('metricas/actualizar-todas'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "actualizarTodasLasMetricas", null);
__decorate([
    (0, common_1.Get)('metricas/rango'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Query)('fechaInicio')),
    __param(1, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "obtenerMetricasPorRango", null);
__decorate([
    (0, common_1.Get)('filtros'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportesController.prototype, "obtenerFiltrosDisponibles", null);
__decorate([
    (0, common_1.Get)('proyecto/:id/export/pdf'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarProyectoPDF", null);
__decorate([
    (0, common_1.Get)('proyecto/:id/export/excel'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarProyectoExcel", null);
__decorate([
    (0, common_1.Post)('comparativo/export/pdf'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarComparativoPDF", null);
__decorate([
    (0, common_1.Post)('comparativo/export/excel'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarComparativoExcel", null);
__decorate([
    (0, common_1.Post)('dashboard/export/pdf'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarDashboardPDF", null);
__decorate([
    (0, common_1.Post)('dashboard/export/excel'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarDashboardExcel", null);
__decorate([
    (0, common_1.Get)('riesgos/export/pdf'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('nivelMinimo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarRiesgosPDF", null);
__decorate([
    (0, common_1.Post)('temporal/export/excel'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor', 'Asesor'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarTemporalExcel", null);
__decorate([
    (0, common_1.Post)('productividad/export/excel'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Administrador', 'Gestor'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportesController.prototype, "exportarProductividadExcel", null);
exports.ReportesController = ReportesController = __decorate([
    (0, common_1.Controller)('reportes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(3, (0, common_1.Inject)(logs_service_1.LogsService)),
    __metadata("design:paramtypes", [metricas_service_1.MetricasService,
        reportes_service_1.ReportesService,
        export_service_1.ExportService,
        logs_service_1.LogsService])
], ReportesController);
//# sourceMappingURL=reportes.controller.js.map