import { 
  Controller, 
  Get, 
  Query, 
  Res, 
  UseGuards, 
  Request,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ReportesHistorialService } from './reportes-historial.service';
import { FiltroHistorialDto } from './dto/historial-participacion.dto';

@Controller('reportes/historial-participacion')
@UseGuards(JwtAuthGuard)
export class ReportesHistorialController {
  constructor(private readonly reportesService: ReportesHistorialService) {}

  @Get('excel')
  async descargarReporteExcel(
    @Query() filtros: FiltroHistorialDto,
    @Res() res: Response,
    @Request() req
  ) {
    try {
      // Si no es admin, solo puede generar reportes de su propio historial
      if (req.user.rol?.nombre !== 'admin' && filtros.usuarioId && filtros.usuarioId !== req.user.id) {
        filtros.usuarioId = req.user.id;
      } else if (!filtros.usuarioId && req.user.rol?.nombre !== 'admin') {
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
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al generar el reporte Excel',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('csv')
  async descargarReporteCSV(
    @Query() filtros: FiltroHistorialDto,
    @Res() res: Response,
    @Request() req
  ) {
    try {
      // Si no es admin, solo puede generar reportes de su propio historial
      if (req.user.rol?.nombre !== 'admin' && filtros.usuarioId && filtros.usuarioId !== req.user.id) {
        filtros.usuarioId = req.user.id;
      } else if (!filtros.usuarioId && req.user.rol?.nombre !== 'admin') {
        filtros.usuarioId = req.user.id;
      }

      const csvData = await this.reportesService.generarReporteCSV(filtros);
      
      const fechaActual = new Date().toISOString().split('T')[0];
      const nombreArchivo = `historial-participacion-${fechaActual}.csv`;

      res.set({
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${nombreArchivo}"`
      });

      // Agregar BOM para UTF-8 para mejor compatibilidad con Excel
      res.send('\ufeff' + csvData);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al generar el reporte CSV',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}