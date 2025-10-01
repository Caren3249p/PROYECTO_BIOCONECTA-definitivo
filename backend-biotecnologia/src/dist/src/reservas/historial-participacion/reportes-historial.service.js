"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportesHistorialService = void 0;
const common_1 = require("@nestjs/common");
const historial_participacion_service_1 = require("./historial-participacion.service");
const ExcelJS = __importStar(require("exceljs"));
let ReportesHistorialService = class ReportesHistorialService {
    historialService;
    constructor(historialService) {
        this.historialService = historialService;
    }
    async generarReporteExcel(filtros) {
        const filtrosSinPaginacion = { ...filtros, limite: 10000, pagina: 1 };
        const resultado = await this.historialService.obtenerHistorial(filtrosSinPaginacion);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Historial de Participación');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Usuario', key: 'usuario', width: 30 },
            { header: 'Tipo de Participación', key: 'tipo', width: 25 },
            { header: 'Descripción', key: 'descripcion', width: 50 },
            { header: 'Proyecto', key: 'proyecto', width: 30 },
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Entidad Tipo', key: 'entidadTipo', width: 15 },
            { header: 'Entidad ID', key: 'entidadId', width: 15 }
        ];
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE6F3FF' }
        };
        resultado.registros.forEach((registro, index) => {
            worksheet.addRow({
                id: registro.id,
                usuario: registro.usuario?.nombre || 'N/A',
                tipo: this.obtenerEtiquetaTipo(registro.tipoParticipacion),
                descripcion: registro.descripcion,
                proyecto: registro.proyecto?.nombre || 'N/A',
                fecha: registro.fechaEvento.toLocaleDateString('es-ES'),
                entidadTipo: registro.entidadTipo || 'N/A',
                entidadId: registro.entidadId || 'N/A'
            });
            if (index % 2 === 0) {
                worksheet.getRow(index + 2).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF8F9FA' }
                };
            }
        });
        const statsWorksheet = workbook.addWorksheet('Estadísticas');
        const estadisticas = await this.historialService.obtenerEstadisticas(filtros.usuarioId, filtros.fechaInicio, filtros.fechaFin);
        statsWorksheet.columns = [
            { header: 'Métrica', key: 'metrica', width: 30 },
            { header: 'Valor', key: 'valor', width: 20 }
        ];
        statsWorksheet.getRow(1).font = { bold: true };
        statsWorksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE6F3FF' }
        };
        statsWorksheet.addRow({ metrica: 'Total de Actividades', valor: estadisticas.total });
        statsWorksheet.addRow({ metrica: '', valor: '' });
        statsWorksheet.addRow({ metrica: 'ESTADÍSTICAS POR TIPO', valor: '' });
        estadisticas.estadisticasPorTipo.forEach(stat => {
            statsWorksheet.addRow({
                metrica: this.obtenerEtiquetaTipo(stat.tipo),
                valor: stat.cantidad
            });
        });
        if (estadisticas.participacionPorMes.length > 0) {
            statsWorksheet.addRow({ metrica: '', valor: '' });
            statsWorksheet.addRow({ metrica: 'PARTICIPACIÓN POR MES', valor: '' });
            estadisticas.participacionPorMes.forEach(stat => {
                statsWorksheet.addRow({
                    metrica: stat.mes,
                    valor: stat.cantidad
                });
            });
        }
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
    async generarReporteCSV(filtros) {
        const filtrosSinPaginacion = { ...filtros, limite: 10000, pagina: 1 };
        const resultado = await this.historialService.obtenerHistorial(filtrosSinPaginacion);
        const headers = [
            'ID',
            'Usuario',
            'Tipo de Participación',
            'Descripción',
            'Proyecto',
            'Fecha',
            'Entidad Tipo',
            'Entidad ID'
        ];
        let csv = headers.join(',') + '\n';
        resultado.registros.forEach(registro => {
            const row = [
                registro.id,
                `"${registro.usuario?.nombre || 'N/A'}"`,
                `"${this.obtenerEtiquetaTipo(registro.tipoParticipacion)}"`,
                `"${registro.descripcion.replace(/"/g, '""')}"`,
                `"${registro.proyecto?.nombre || 'N/A'}"`,
                registro.fechaEvento.toLocaleDateString('es-ES'),
                registro.entidadTipo || 'N/A',
                registro.entidadId || 'N/A'
            ];
            csv += row.join(',') + '\n';
        });
        return csv;
    }
    obtenerEtiquetaTipo(tipo) {
        const etiquetas = {
            'tarea_asignada': 'Tarea Asignada',
            'tarea_completada': 'Tarea Completada',
            'reserva_creada': 'Reserva Creada',
            'reserva_completada': 'Reserva Completada',
            'asistencia_registrada': 'Asistencia Registrada',
            'proyecto_asignado': 'Proyecto Asignado',
            'hito_completado': 'Hito Completado',
            'documento_subido': 'Documento Subido'
        };
        return etiquetas[tipo] || tipo;
    }
};
exports.ReportesHistorialService = ReportesHistorialService;
exports.ReportesHistorialService = ReportesHistorialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [historial_participacion_service_1.HistorialParticipacionService])
], ReportesHistorialService);
//# sourceMappingURL=reportes-historial.service.js.map