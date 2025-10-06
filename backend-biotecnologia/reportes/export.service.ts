import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import PDFDocument = require('pdfkit');

@Injectable()
export class ExportService {
  
  async exportToPDF(data: any, reportType: string, res: Response): Promise<void> {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-${reportType}-${new Date().toISOString().split('T')[0]}.pdf"`);
    
    doc.pipe(res);

    // Header
    doc.fontSize(20).text('BIOCONECTA - Reporte de Métricas', { align: 'center' });
    doc.fontSize(16).text(`Tipo de Reporte: ${this.getTitleByType(reportType)}`, { align: 'center' });
    doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, { align: 'center' });
    doc.moveDown(2);

    // Content based on report type
    switch (reportType) {
      case 'proyecto':
        this.addProjectReportToPDF(doc, data);
        break;
      case 'comparativo':
        this.addComparativeReportToPDF(doc, data);
        break;
      case 'dashboard':
        this.addDashboardReportToPDF(doc, data);
        break;
      case 'riesgo':
        this.addRiskReportToPDF(doc, data);
        break;
      case 'temporal':
        this.addTemporalReportToPDF(doc, data);
        break;
      case 'productividad':
        this.addProductivityReportToPDF(doc, data);
        break;
    }

    doc.end();
  }

  async exportToExcel(data: any, reportType: string, res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Reporte ${reportType}`);

    // Header styles
    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFF' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '0066CC' } },
      alignment: { horizontal: 'center', vertical: 'middle' }
    };

    // Content based on report type
    switch (reportType) {
      case 'proyecto':
        this.addProjectReportToExcel(worksheet, data, headerStyle);
        break;
      case 'comparativo':
        this.addComparativeReportToExcel(worksheet, data, headerStyle);
        break;
      case 'dashboard':
        this.addDashboardReportToExcel(worksheet, data, headerStyle);
        break;
      case 'riesgo':
        this.addRiskReportToExcel(worksheet, data, headerStyle);
        break;
      case 'temporal':
        this.addTemporalReportToExcel(worksheet, data, headerStyle);
        break;
      case 'productividad':
        this.addProductivityReportToExcel(worksheet, data, headerStyle);
        break;
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-${reportType}-${new Date().toISOString().split('T')[0]}.xlsx"`);

    await workbook.xlsx.write(res);
    res.end();
  }

  private getTitleByType(type: string): string {
    const titles = {
      'proyecto': 'Métricas de Proyecto Individual',
      'comparativo': 'Análisis Comparativo de Proyectos',
      'dashboard': 'Dashboard Ejecutivo',
      'riesgo': 'Alerta de Riesgos',
      'temporal': 'Evolución Temporal',
      'productividad': 'Productividad del Equipo'
    };
    return titles[type] || 'Reporte General';
  }

  private addProjectReportToPDF(doc: any, data: any): void {
    doc.fontSize(14).text('Métricas del Proyecto:', { underline: true });
    doc.moveDown();

    if (data.proyecto) {
      doc.fontSize(12);
      doc.text(`Proyecto: ${data.proyecto.nombre}`);
      doc.text(`Estado: ${data.proyecto.estado}`);
      doc.text(`Fecha de inicio: ${data.proyecto.fechaInicio}`);
      doc.text(`Fecha de finalización: ${data.proyecto.fechaFin || 'En progreso'}`);
      doc.moveDown();
    }

    if (data.metricas) {
      doc.text('Métricas de Desempeño:', { underline: true });
      doc.text(`Progreso General: ${data.metricas.progresoGeneral}%`);
      doc.text(`Eficiencia Temporal: ${data.metricas.eficienciaTemporal}%`);
      doc.text(`Calidad de Entregables: ${data.metricas.calidadEntregables}%`);
      doc.text(`Índice de Colaboración: ${data.metricas.indiceColaboracion}%`);
      doc.text(`Nivel de Riesgo: ${data.metricas.nivelRiesgo}`);
      doc.moveDown();
    }

    if (data.tareas) {
      doc.text('Resumen de Tareas:', { underline: true });
      doc.text(`Total de tareas: ${data.tareas.total}`);
      doc.text(`Completadas: ${data.tareas.completadas}`);
      doc.text(`En progreso: ${data.tareas.enProgreso}`);
      doc.text(`Pendientes: ${data.tareas.pendientes}`);
      doc.text(`Retrasadas: ${data.tareas.retrasadas}`);
    }
  }

  private addComparativeReportToPDF(doc: any, data: any): void {
    doc.fontSize(14).text('Análisis Comparativo de Proyectos:', { underline: true });
    doc.moveDown();

    if (data.comparacion && data.comparacion.length > 0) {
      data.comparacion.forEach((item, index) => {
        doc.fontSize(12);
        doc.text(`${index + 1}. ${item.nombreProyecto}`);
        doc.text(`   Progreso: ${item.progreso}%`);
        doc.text(`   Eficiencia: ${item.eficiencia}%`);
        doc.text(`   Calidad: ${item.calidad}%`);
        doc.text(`   Riesgo: ${item.riesgo}`);
        doc.moveDown(0.5);
      });
    }

    if (data.estadisticas) {
      doc.moveDown();
      doc.text('Estadísticas Generales:', { underline: true });
      doc.text(`Promedio de progreso: ${data.estadisticas.progresoPromedio}%`);
      doc.text(`Promedio de eficiencia: ${data.estadisticas.eficienciaPromedio}%`);
      doc.text(`Proyectos en riesgo alto: ${data.estadisticas.proyectosRiesgoAlto}`);
    }
  }

  private addDashboardReportToPDF(doc: any, data: any): void {
    doc.fontSize(14).text('Dashboard Ejecutivo:', { underline: true });
    doc.moveDown();

    if (data.kpis) {
      doc.fontSize(12);
      doc.text('KPIs Principales:', { underline: true });
      doc.text(`Proyectos Activos: ${data.kpis.proyectosActivos}`);
      doc.text(`Proyectos Completados: ${data.kpis.proyectosCompletados}`);
      doc.text(`Eficiencia Global: ${data.kpis.eficienciaGlobal}%`);
      doc.text(`Usuarios Activos: ${data.kpis.usuariosActivos}`);
      doc.moveDown();
    }

    if (data.alertas && data.alertas.length > 0) {
      doc.text('Alertas Importantes:', { underline: true });
      data.alertas.forEach((alerta, index) => {
        doc.text(`${index + 1}. ${alerta.mensaje} (${alerta.tipo})`);
      });
      doc.moveDown();
    }

    if (data.tendencias) {
      doc.text('Tendencias:', { underline: true });
      doc.text(`Productividad: ${data.tendencias.productividad}`);
      doc.text(`Calidad: ${data.tendencias.calidad}`);
      doc.text(`Colaboración: ${data.tendencias.colaboracion}`);
    }
  }

  private addRiskReportToPDF(doc: any, data: any): void {
    doc.fontSize(14).text('Reporte de Riesgos:', { underline: true });
    doc.moveDown();

    if (data.riesgos && data.riesgos.length > 0) {
      data.riesgos.forEach((riesgo, index) => {
        doc.fontSize(12);
        doc.text(`${index + 1}. Proyecto: ${riesgo.nombreProyecto}`);
        doc.text(`   Nivel de Riesgo: ${riesgo.nivelRiesgo}`);
        doc.text(`   Factores de Riesgo: ${riesgo.factoresRiesgo.join(', ')}`);
        doc.text(`   Recomendaciones: ${riesgo.recomendaciones}`);
        doc.moveDown(0.5);
      });
    }
  }

  private addTemporalReportToPDF(doc: any, data: any): void {
    doc.fontSize(14).text('Evolución Temporal:', { underline: true });
    doc.moveDown();

    if (data.evolucion && data.evolucion.length > 0) {
      data.evolucion.forEach((punto, index) => {
        doc.fontSize(12);
        doc.text(`${punto.periodo}: Progreso ${punto.progreso}%, Eficiencia ${punto.eficiencia}%`);
      });
    }
  }

  private addProductivityReportToPDF(doc: any, data: any): void {
    doc.fontSize(14).text('Reporte de Productividad:', { underline: true });
    doc.moveDown();

    if (data.productividad && data.productividad.length > 0) {
      data.productividad.forEach((item, index) => {
        doc.fontSize(12);
        doc.text(`${item.usuario}: ${item.tareasCompletadas} tareas, ${item.horasTrabajo} horas`);
      });
    }
  }

  private addProjectReportToExcel(worksheet: any, data: any, headerStyle: any): void {
    // Headers
    worksheet.getCell('A1').value = 'REPORTE DE PROYECTO';
    worksheet.getCell('A1').style = headerStyle;
    worksheet.mergeCells('A1:F1');

    // Project info
    if (data.proyecto) {
      worksheet.getCell('A3').value = 'Información del Proyecto';
      worksheet.getCell('A3').style = headerStyle;
      worksheet.mergeCells('A3:B3');

      worksheet.getCell('A4').value = 'Nombre:';
      worksheet.getCell('B4').value = data.proyecto.nombre;
      worksheet.getCell('A5').value = 'Estado:';
      worksheet.getCell('B5').value = data.proyecto.estado;
      worksheet.getCell('A6').value = 'Fecha Inicio:';
      worksheet.getCell('B6').value = data.proyecto.fechaInicio;
    }

    // Metrics
    if (data.metricas) {
      worksheet.getCell('D3').value = 'Métricas';
      worksheet.getCell('D3').style = headerStyle;
      worksheet.mergeCells('D3:F3');

      worksheet.getCell('D4').value = 'Progreso General:';
      worksheet.getCell('E4').value = `${data.metricas.progresoGeneral}%`;
      worksheet.getCell('D5').value = 'Eficiencia:';
      worksheet.getCell('E5').value = `${data.metricas.eficienciaTemporal}%`;
      worksheet.getCell('D6').value = 'Calidad:';
      worksheet.getCell('E6').value = `${data.metricas.calidadEntregables}%`;
    }

    // Tasks summary
    if (data.tareas) {
      worksheet.getCell('A8').value = 'Resumen de Tareas';
      worksheet.getCell('A8').style = headerStyle;
      worksheet.mergeCells('A8:F8');

      const taskHeaders = ['Estado', 'Cantidad'];
      taskHeaders.forEach((header, index) => {
        const cell = worksheet.getCell(9, index + 1);
        cell.value = header;
        cell.style = headerStyle;
      });

      worksheet.getCell('A10').value = 'Completadas';
      worksheet.getCell('B10').value = data.tareas.completadas;
      worksheet.getCell('A11').value = 'En Progreso';
      worksheet.getCell('B11').value = data.tareas.enProgreso;
      worksheet.getCell('A12').value = 'Pendientes';
      worksheet.getCell('B12').value = data.tareas.pendientes;
    }

    // Auto-adjust column widths
    worksheet.columns.forEach(column => {
      column.width = 20;
    });
  }

  private addComparativeReportToExcel(worksheet: any, data: any, headerStyle: any): void {
    worksheet.getCell('A1').value = 'ANÁLISIS COMPARATIVO DE PROYECTOS';
    worksheet.getCell('A1').style = headerStyle;
    worksheet.mergeCells('A1:F1');

    const headers = ['Proyecto', 'Progreso (%)', 'Eficiencia (%)', 'Calidad (%)', 'Riesgo', 'Estado'];
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.value = header;
      cell.style = headerStyle;
    });

    if (data.comparacion && data.comparacion.length > 0) {
      data.comparacion.forEach((item, index) => {
        const row = index + 4;
        worksheet.getCell(`A${row}`).value = item.nombreProyecto;
        worksheet.getCell(`B${row}`).value = item.progreso;
        worksheet.getCell(`C${row}`).value = item.eficiencia;
        worksheet.getCell(`D${row}`).value = item.calidad;
        worksheet.getCell(`E${row}`).value = item.riesgo;
        worksheet.getCell(`F${row}`).value = item.estado;
      });
    }

    worksheet.columns.forEach(column => {
      column.width = 18;
    });
  }

  private addDashboardReportToExcel(worksheet: any, data: any, headerStyle: any): void {
    worksheet.getCell('A1').value = 'DASHBOARD EJECUTIVO';
    worksheet.getCell('A1').style = headerStyle;
    worksheet.mergeCells('A1:D1');

    if (data.kpis) {
      worksheet.getCell('A3').value = 'KPIs Principales';
      worksheet.getCell('A3').style = headerStyle;
      worksheet.mergeCells('A3:B3');

      worksheet.getCell('A4').value = 'Proyectos Activos:';
      worksheet.getCell('B4').value = data.kpis.proyectosActivos;
      worksheet.getCell('A5').value = 'Proyectos Completados:';
      worksheet.getCell('B5').value = data.kpis.proyectosCompletados;
      worksheet.getCell('A6').value = 'Eficiencia Global:';
      worksheet.getCell('B6').value = `${data.kpis.eficienciaGlobal}%`;
    }

    worksheet.columns.forEach(column => {
      column.width = 20;
    });
  }

  private addRiskReportToExcel(worksheet: any, data: any, headerStyle: any): void {
    worksheet.getCell('A1').value = 'REPORTE DE RIESGOS';
    worksheet.getCell('A1').style = headerStyle;
    worksheet.mergeCells('A1:E1');

    const headers = ['Proyecto', 'Nivel de Riesgo', 'Factores', 'Recomendaciones', 'Fecha'];
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.value = header;
      cell.style = headerStyle;
    });

    if (data.riesgos && data.riesgos.length > 0) {
      data.riesgos.forEach((riesgo, index) => {
        const row = index + 4;
        worksheet.getCell(`A${row}`).value = riesgo.nombreProyecto;
        worksheet.getCell(`B${row}`).value = riesgo.nivelRiesgo;
        worksheet.getCell(`C${row}`).value = riesgo.factoresRiesgo.join(', ');
        worksheet.getCell(`D${row}`).value = riesgo.recomendaciones;
        worksheet.getCell(`E${row}`).value = new Date().toLocaleDateString();
      });
    }

    worksheet.columns.forEach(column => {
      column.width = 25;
    });
  }

  private addTemporalReportToExcel(worksheet: any, data: any, headerStyle: any): void {
    worksheet.getCell('A1').value = 'EVOLUCIÓN TEMPORAL';
    worksheet.getCell('A1').style = headerStyle;
    worksheet.mergeCells('A1:D1');

    const headers = ['Período', 'Progreso (%)', 'Eficiencia (%)', 'Tendencia'];
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.value = header;
      cell.style = headerStyle;
    });

    if (data.evolucion && data.evolucion.length > 0) {
      data.evolucion.forEach((punto, index) => {
        const row = index + 4;
        worksheet.getCell(`A${row}`).value = punto.periodo;
        worksheet.getCell(`B${row}`).value = punto.progreso;
        worksheet.getCell(`C${row}`).value = punto.eficiencia;
        worksheet.getCell(`D${row}`).value = punto.tendencia || 'Estable';
      });
    }

    worksheet.columns.forEach(column => {
      column.width = 18;
    });
  }

  private addProductivityReportToExcel(worksheet: any, data: any, headerStyle: any): void {
    worksheet.getCell('A1').value = 'REPORTE DE PRODUCTIVIDAD';
    worksheet.getCell('A1').style = headerStyle;
    worksheet.mergeCells('A1:E1');

    const headers = ['Usuario', 'Tareas Completadas', 'Horas Trabajo', 'Eficiencia', 'Ranking'];
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.value = header;
      cell.style = headerStyle;
    });

    if (data.productividad && data.productividad.length > 0) {
      data.productividad.forEach((item, index) => {
        const row = index + 4;
        worksheet.getCell(`A${row}`).value = item.usuario;
        worksheet.getCell(`B${row}`).value = item.tareasCompletadas;
        worksheet.getCell(`C${row}`).value = item.horasTrabajo;
        worksheet.getCell(`D${row}`).value = `${item.eficiencia}%`;
        worksheet.getCell(`E${row}`).value = index + 1;
      });
    }

    worksheet.columns.forEach(column => {
      column.width = 20;
    });
  }
}