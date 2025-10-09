import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProyectoService } from './proyectos.service';
import { Proyecto } from './proyectos.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.proyectoService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Proyecto>) {
    return this.proyectoService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Proyecto>) {
    return this.proyectoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.proyectoService.remove(id);
  }
}
