import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LogsService } from '../logs/logs.service';
import { TareasService } from './tareas.service';
import { Tarea } from './tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(
    private readonly tareasService: TareasService,
    private readonly logsService: LogsService,
  ) {}

  // 📋 Obtener todas las tareas
  @Get()
  obtenerTodas(): Promise<Tarea[]> {
    return this.tareasService.findAll();
  }

  // 🔍 Obtener una tarea por ID
  @Get(':id')
  obtenerPorId(@Param('id') id: string): Promise<Tarea | null> {
    return this.tareasService.findOne(Number(id));
  }

  // ➕ Crear tarea
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async crear(@Body() data: CrearTareaDto, @Req() req): Promise<Tarea> {
    const tarea = await this.tareasService.create(data);
    const usuario = req.user?.email || 'anónimo';
    await this.logsService.registrar(usuario, 'Creó una tarea');
    return tarea;
  }

  // ✏️ Actualizar tarea
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async actualizar(@Param('id') id: string, @Body() data: Partial<CrearTareaDto>, @Req() req): Promise<Tarea | null> {
    const tarea = await this.tareasService.update(Number(id), data);
    const usuario = req.user?.email || 'anónimo';
    await this.logsService.registrar(usuario, `Editó la tarea ${id}`);
    return tarea;
  }

  // 🗑️ Eliminar tarea
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  async eliminar(@Param('id') id: string, @Req() req): Promise<void> {
    await this.tareasService.remove(Number(id));
    const usuario = req.user?.email || 'anónimo';
    await this.logsService.registrar(usuario, `Eliminó la tarea ${id}`);
  }
}
