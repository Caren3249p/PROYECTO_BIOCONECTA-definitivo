import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { Servicio } from './servicio.entity';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  listarTodos() {
    return this.serviciosService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number) {
    return this.serviciosService.buscarPorId(id);
  }

  @Post()
  crear(@Body() datos: Partial<Servicio>) {
    return this.serviciosService.crear(datos);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() datos: Partial<Servicio>) {
    return this.serviciosService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.serviciosService.eliminar(id);
  }
}
