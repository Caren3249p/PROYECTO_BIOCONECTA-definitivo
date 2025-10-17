import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CrearTareaDto } from './dto/crear-tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  create(@Body() data: CrearTareaDto) {
    return this.tareasService.create(data);
  }

  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.tareasService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(Number(id));
  }
}
