import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  UsePipes, 
  ValidationPipe, 
  Req, 
  UseGuards 
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './proyectos.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { LogsService } from '../logs/logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('proyectos')
export class ProyectosController {
  constructor(
    private readonly proyectosService: ProyectosService,
    private readonly logsService: LogsService, // 👈 ya no necesitas @Inject
  ) {}

  @Get()
  findAll(): Promise<Proyecto[]> {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Proyecto | null> {
    return this.proyectosService.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() data: CreateProyectoDto, @Req() req): Promise<Proyecto> {
    const proyecto = await this.proyectosService.create(data);
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, 'Creó un proyecto');
    return proyecto;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    await this.proyectosService.remove(Number(id));
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, `Eliminó proyecto ${id}`);
  }
}
