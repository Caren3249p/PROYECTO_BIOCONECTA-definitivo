import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RecursosService } from './recursos.service';

@Controller('recursos')
export class RecursosController {
  constructor(private readonly recursosService: RecursosService) {}

  @Get('tipos')
  getTipos() {
    return this.recursosService.getTiposRecurso();
  }

  @Get()
  getRecursos() {
    return this.recursosService.getRecursos();
  }

  @Get('asignaciones')
  getAsignaciones() {
    return this.recursosService.getAsignaciones();
  }

  @Post('asignar')
  asignar(@Body() body: { recursoId: number; proyecto: string; fecha: string }) {
    return this.recursosService.asignarRecurso(body.recursoId, body.proyecto, body.fecha);
  }

  @Post('liberar')
  liberar(@Body() body: { asignacionId: number }) {
    return this.recursosService.liberarRecurso(body.asignacionId);
  }

  @Get('validar/:recursoId')
  validar(@Param('recursoId') recursoId: number, @Query('fecha') fecha: string) {
    return this.recursosService.validarDisponibilidad(recursoId, fecha);
  }

  @Get('alertas')
  alertas() {
    return this.recursosService.alertasConflicto();
  }
}
