import { Controller, Post, Get, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AsistenciaService } from './asistencia.service';
import { CertificadosService } from './certificados.service';

@Controller('asistencias')
export class AsistenciaController {
  constructor(
    private readonly asistenciaService: AsistenciaService,
    private readonly certificadosService: CertificadosService
  ) {}

  @Post()
  async registrar(@Body() data: { reservaId: number; usuarioId: number; presente: boolean }) {
    const asistencia = await this.asistenciaService.registrar(data);
    // Generar certificado automáticamente si está presente
    if (asistencia.presente) {
      // Aquí podrías guardar el PDF o enviarlo por correo si lo deseas
      // Por ahora solo se genera (no se guarda ni envía)
    }
    return asistencia;
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  findByReserva(@Param('id') id: number) {
    return this.asistenciaService.findByReserva(id);
  }

  @Get('certificado/:asistenciaId')
  async descargarCertificado(@Param('asistenciaId') asistenciaId: number, @Res() res: Response) {
    // Buscar asistencia y datos relacionados
    const asistencia = await this.asistenciaService.findById(asistenciaId);
    if (!asistencia || !asistencia.presente) {
      return res.status(404).json({ message: 'Asistencia no encontrada o no presente' });
    }
    const usuario = asistencia.usuario;
    const reserva = asistencia.reserva;
    await this.certificadosService.generarCertificado({
      nombre: usuario.userName,
      apellido: usuario.userLastname,
      actividad: reserva.servicio?.nombre || 'Actividad',
      fecha: reserva.fechaServicio,
    }, res);
  }
}
