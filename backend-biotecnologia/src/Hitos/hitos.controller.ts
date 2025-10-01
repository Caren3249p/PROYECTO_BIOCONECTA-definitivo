import { Controller, Get, Post, Put, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { HitosService } from './hitos.service';
import { Hito } from './hitos.entity';
import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';

@Controller('hitos')
export class HitosController {
  constructor(private readonly hitosService: HitosService) {}

  @Get()
  findAll(): Promise<Hito[]> {
    return this.hitosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Hito> {
    return this.hitosService.findOne(Number(id));
  }

  @Get('/proyecto/:proyectoId')
  findByProyecto(@Param('proyectoId') proyectoId: string): Promise<Hito[]> {
    return this.hitosService.findByProyecto(Number(proyectoId));
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() data: CreateHitoDto): Promise<Hito> {
    return this.hitosService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() data: UpdateHitoDto): Promise<Hito> {
    return this.hitosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.hitosService.remove(Number(id));
  }
}