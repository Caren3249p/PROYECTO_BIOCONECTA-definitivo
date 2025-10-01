import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';

@Controller('asistencias')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  registrar(@Body() data: { reservaId: number; usuarioId: number; presente: boolean }) {
    return this.asistenciaService.registrar(data);
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  findByReserva(@Param('id') id: number) {
    return this.asistenciaService.findByReserva(id);
  }
}
