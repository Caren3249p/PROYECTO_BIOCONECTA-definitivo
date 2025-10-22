import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe, Req, UseGuards, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LogsService } from '../logs/logs.service';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('reservas')
export class ReservasController {
  constructor(
    private readonly reservasService: ReservasService,
    @Inject(LogsService) private readonly logsService: LogsService,
  ) {}

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() data: CreateReservaDto, @Req() req) {
    const reserva = await this.reservasService.create(data);
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, 'Creó una reserva');
    return reserva;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  async update(@Param('id') id: string, @Body('estado') estado: string, @Req() req) {
    const reserva = await this.reservasService.update(Number(id), estado);
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, `Editó la reserva ${id}`);
    return reserva;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Gestor', 'Administrador')
  async remove(@Param('id') id: string, @Req() req) {
    await this.reservasService.remove(Number(id));
    const usuario = req.user?.email || 'anonimo';
    await this.logsService.registrar(usuario, `Eliminó la reserva ${id}`);
  }
}
