import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CrearProyectoDto } from './create-proyecto.dto';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.proyectosService.findOne(id);
  }

  @Post()
  create(@Body() data: CrearProyectoDto) {
    return this.proyectosService.create(data);
  }
}
