import { Injectable } from '@nestjs/common';
import { HistorialParticipacionService } from './historial-participacion.service';
import { FiltroHistorialDto } from './dto/historial-participacion.dto';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportesHistorialService {
  constructor(
    private readonly historialService: HistorialParticipacionService
  ) {}

  async generarReporteExcel(filtros: FiltroHistorialDto): Promise<Buffer> {
    // Obtener todos los registros sin paginación para el reporte
    const filtrosSinPaginacion = { ...filtros, limite: 10000, pagina: 1 };
    const resultado = await this.historialService.obtenerHistorial(filtrosSinPaginacion);
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Historial de Participación');

    // Configurar cabeceras
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

    // Estilo para cabeceras
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE6F3FF' }
    };

    // Agregar datos
    resultado.registros.forEach((registro, index) => {
      worksheet.addRow({
        usuario: registro.usuario?.userName || 'N/A',
        tipo: this.obtenerEtiquetaTipo(registro.tipoParticipacion),
        descripcion: registro.descripcion,
       proyecto: registro.proyecto?.descripcion || 'N/A',
        fecha: registro.fechaEvento.toLocaleDateString('es-ES'),
        entidadTipo: registro.entidadTipo || 'N/A',
        entidadId: registro.entidadId || 'N/A'
      });

      // Alternar colores de filas
      if (index % 2 === 0) {
        worksheet.getRow(index + 2).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F9FA' }
        };
      }
    });

    // Agregar hoja de estadísticas
    const statsWorksheet = workbook.addWorksheet('Estadísticas');
    const estadisticas = await this.historialService.obtenerEstadisticas(
      filtros.usuarioId,
      filtros.fechaInicio,
      filtros.fechaFin
    );

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

    // Agregar estadísticas generales
    statsWorksheet.addRow({ metrica: 'Total de Actividades', valor: estadisticas.total });
    
    // Agregar estadísticas por tipo
    statsWorksheet.addRow({ metrica: '', valor: '' }); // Fila vacía
    statsWorksheet.addRow({ metrica: 'ESTADÍSTICAS POR TIPO', valor: '' });
    
    estadisticas.estadisticasPorTipo.forEach(stat => {
      statsWorksheet.addRow({
        metrica: this.obtenerEtiquetaTipo(stat.tipo),
        valor: stat.cantidad
      });
    });

    // Agregar participación por mes
    if (estadisticas.participacionPorMes.length > 0) {
      statsWorksheet.addRow({ metrica: '', valor: '' }); // Fila vacía
      statsWorksheet.addRow({ metrica: 'PARTICIPACIÓN POR MES', valor: '' });
      
      estadisticas.participacionPorMes.forEach(stat => {
        statsWorksheet.addRow({
          metrica: stat.mes,
          valor: stat.cantidad
        });
      });
    }

    // Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generarReporteCSV(filtros: FiltroHistorialDto): Promise<string> {
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
        `"${registro.usuario?.userName || 'N/A'}"`,
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

  private obtenerEtiquetaTipo(tipo: string): string {
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
}