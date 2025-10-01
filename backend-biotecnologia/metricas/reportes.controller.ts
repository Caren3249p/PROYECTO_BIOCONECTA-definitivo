import { Controller, Get, Post, Body, Param, Query, UseGuards, Inject, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { RolesGuard } from '../src/auth/roles.guard';
import { Roles } from '../src/auth/roles.decorator';
import { MetricasService } from './metricas.service';
import { ReportesService } from './reportes.service';
import { ExportService } from './export.service';
import { LogsService } from '../src/Documentos/logs/logs.service';

@Controller('reportes')
@UseGuards(JwtAuthGuard)
export class ReportesController {
  constructor(
    private readonly metricasService: MetricasService,
    private readonly reportesService: ReportesService,
    private readonly exportService: ExportService,
    @Inject(LogsService) private readonly logsService: LogsService,
  ) {}

  // Obtener plantillas de reportes disponibles
  @Get('plantillas')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  obtenerPlantillas() {
    return this.reportesService.obtenerPlantillas();
  }

  // Generar métricas para un proyecto específico
  @Post('metricas/proyecto/:id')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async calcularMetricasProyecto(@Param('id') id: string, @Req() req) {
    const metrica = await this.metricasService.calcularMetricasProyecto(Number(id));
    
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(
      usuario,
      `Calculó métricas del proyecto ${id}`
    );
    
    return metrica;
  }

  // Obtener métricas existentes de un proyecto
  @Get('metricas/proyecto/:id')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor', 'Estudiante')
  async obtenerMetricasProyecto(@Param('id') id: string) {
    return this.metricasService.obtenerMetricasProyecto(Number(id));
  }

  // Generar reporte individual de proyecto
  @Get('individual/:id')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async generarReporteIndividual(@Param('id') id: string, @Req() req) {
    const reporte = await this.reportesService.generarReporteIndividual(Number(id));
    
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(
      usuario,
      `Generó reporte individual del proyecto ${id}`
    );
    
    return reporte;
  }

  // Generar reporte comparativo de múltiples proyectos
  @Post('comparativo')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async generarReporteComparativo(
    @Body() body: { proyectoIds: number[] },
    @Req() req
  ) {
    const reporte = await this.reportesService.generarReporteComparativo(body.proyectoIds);
    
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(
      usuario,
      `Generó reporte comparativo de ${body.proyectoIds.length} proyectos`
    );
    
    return reporte;
  }

  // Generar dashboard general
  @Get('dashboard')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor')
  async generarDashboardGeneral(@Req() req) {
    const dashboard = await this.reportesService.generarDashboardGeneral();
    
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(
      usuario,
      'Accedió al dashboard general de reportes'
    );
    
    return dashboard;
  }

  // Generar reporte de riesgos
  @Get('riesgos')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async generarReporteRiesgos(@Req() req) {
    const reporte = await this.reportesService.generarReporteRiesgos();
    
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(
      usuario,
      'Generó reporte de alertas y riesgos'
    );
    
    return reporte;
  }

  // Obtener métricas generales del sistema
  @Get('metricas/generales')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor')
  async obtenerMetricasGenerales() {
    return this.metricasService.obtenerMetricasGenerales();
  }

  // Actualizar todas las métricas del sistema
  @Post('metricas/actualizar-todas')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async actualizarTodasLasMetricas(@Req() req) {
    await this.metricasService.actualizarTodasLasMetricas();
    
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(
      usuario,
      'Actualizó todas las métricas del sistema'
    );
    
    return { mensaje: 'Todas las métricas han sido actualizadas correctamente' };
  }

  // Obtener métricas por rango de fechas
  @Get('metricas/rango')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async obtenerMetricasPorRango(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string
  ) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    return this.metricasService.obtenerMetricasPorRango(inicio, fin);
  }

  // Obtener configuración de filtros dinámicos
  @Get('filtros')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
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

  // ENDPOINTS DE EXPORTACIÓN

  // Exportar reporte de proyecto a PDF
  @Get('proyecto/:id/export/pdf')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async exportarProyectoPDF(
    @Param('id') proyectoId: number,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarReporteProyecto(proyectoId);
      await this.exportService.exportToPDF(reporte, 'proyecto', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        `Exportó reporte PDF del proyecto ${proyectoId}`
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar reporte' });
    }
  }

  // Exportar reporte de proyecto a Excel
  @Get('proyecto/:id/export/excel')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async exportarProyectoExcel(
    @Param('id') proyectoId: number,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarReporteProyecto(proyectoId);
      await this.exportService.exportToExcel(reporte, 'proyecto', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        `Exportó reporte Excel del proyecto ${proyectoId}`
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar reporte' });
    }
  }

  // Exportar reporte comparativo a PDF
  @Post('comparativo/export/pdf')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor')
  async exportarComparativoPDF(
    @Body() filtros: any,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarReporteComparativo(filtros);
      await this.exportService.exportToPDF(reporte, 'comparativo', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó reporte comparativo en PDF'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar reporte' });
    }
  }

  // Exportar reporte comparativo a Excel
  @Post('comparativo/export/excel')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor')
  async exportarComparativoExcel(
    @Body() filtros: any,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarReporteComparativo(filtros);
      await this.exportService.exportToExcel(reporte, 'comparativo', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó reporte comparativo en Excel'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar reporte' });
    }
  }

  // Exportar dashboard a PDF
  @Post('dashboard/export/pdf')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async exportarDashboardPDF(
    @Body() filtros: any,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarDashboard(filtros);
      await this.exportService.exportToPDF(reporte, 'dashboard', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó dashboard en PDF'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar dashboard' });
    }
  }

  // Exportar dashboard a Excel
  @Post('dashboard/export/excel')
  @UseGuards(RolesGuard)
  @Roles('Administrador')
  async exportarDashboardExcel(
    @Body() filtros: any,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarDashboard(filtros);
      await this.exportService.exportToExcel(reporte, 'dashboard', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó dashboard en Excel'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar dashboard' });
    }
  }

  // Exportar reporte de riesgos a PDF
  @Get('riesgos/export/pdf')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor')
  async exportarRiesgosPDF(
    @Res() res: Response,
    @Req() req: any,
    @Query('nivelMinimo') nivelMinimo?: string
  ) {
    try {
      const filtros = nivelMinimo ? { nivelMinimo } : {};
      const reporte = await this.reportesService.generarAlertasRiesgo(filtros);
      await this.exportService.exportToPDF(reporte, 'riesgo', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó reporte de riesgos en PDF'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar reporte de riesgos' });
    }
  }

  // Exportar reporte temporal a Excel
  @Post('temporal/export/excel')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor', 'Asesor')
  async exportarTemporalExcel(
    @Body() filtros: any,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarEvolucionTemporal(filtros);
      await this.exportService.exportToExcel(reporte, 'temporal', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó análisis temporal en Excel'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar evolución temporal' });
    }
  }

  // Exportar reporte de productividad a Excel
  @Post('productividad/export/excel')
  @UseGuards(RolesGuard)
  @Roles('Administrador', 'Gestor')
  async exportarProductividadExcel(
    @Body() filtros: any,
    @Res() res: Response,
    @Req() req: any
  ) {
    try {
      const reporte = await this.reportesService.generarReporteProductividad(filtros);
      await this.exportService.exportToExcel(reporte, 'productividad', res);

      const usuario = req.user?.email || 'anonimo';
      await this.logsService.registrar(
        usuario,
        'Exportó reporte de productividad en Excel'
      );
    } catch (error) {
      res.status(500).json({ error: 'Error al exportar reporte de productividad' });
    }
  }
}