import { Controller, Get, Post, Put, Body, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogsService } from '../logs/logs.service';
import { TareasService } from './tareas.service';
import { Tarea } from './tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tareas')
export class TareasController {
  constructor(
    private readonly tareasService: TareasService,
    @Inject(LogsService) private readonly logsService: LogsService,
  ) {}

  @Get()
  findAll(): Promise<Tarea[]> {
    return this.tareasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tarea | null> {
    return this.tareasService.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() data: CreateTareaDto, @Req() req): Promise<Tarea> {
    const tarea = await this.tareasService.create(data);
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, 'Creó una tarea');
    return tarea;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() data: Partial<CreateTareaDto>, @Req() req): Promise<Tarea | null> {
    const tarea = await this.tareasService.update(Number(id), data);
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, `Editó la tarea ${id}`);
    return tarea;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    await this.tareasService.remove(Number(id));
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, `Eliminó la tarea ${id}`);
  }
}