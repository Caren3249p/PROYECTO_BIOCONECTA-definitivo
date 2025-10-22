import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Servicio } from '../servicios/servicio.entity';
import { User } from '../sysuser/sysuser.entity';
import { NotificacionesService } from '../Notificaciones/notificaciones/notificaciones.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,

    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,

    private readonly notificacionesService: NotificacionesService,
  ) {}

  // Crear nueva reserva
  async create(data: {
    servicioId: number;
    usuarioId: number;
    fechaServicio: string;
    estado?: string;
  }): Promise<Reserva> {
    // Buscar el servicio
    const servicio = await this.servicioRepository.findOneBy({
      id: data.servicioId,
    });
    if (!servicio) throw new Error(`Servicio con ID ${data.servicioId} no encontrado`);

    // Buscar el usuario
    const usuario = await this.usuarioRepository.findOneBy({
      id: data.usuarioId,
    });
    if (!usuario) throw new Error(`Usuario con ID ${data.usuarioId} no encontrado`);

    // Verificar si ya existe una reserva para ese servicio y fecha
    const reservaExistente = await this.reservaRepository.findOne({
      where: {
        servicio: { id: data.servicioId },
        fechaServicio: data.fechaServicio,
      },
    });

    if (reservaExistente) {
      throw new Error(
        `Ya existe una reserva para el servicio ID ${data.servicioId} en la fecha ${data.fechaServicio}`,
      );
    }

    // Crear y guardar nueva reserva
    const reserva = this.reservaRepository.create({
      fechaServicio: data.fechaServicio,
      estado: data.estado ?? 'Pendiente',
      servicio,
      usuario,
    });

    const nuevaReserva = await this.reservaRepository.save(reserva);

    // Crear notificación
    if (this.notificacionesService.crearNotificacion) {
      await this.notificacionesService.crearNotificacion({
        idUsuario: usuario.id,
        tipo: 'info',
        mensaje: `Hola ${usuario.userName}, tu reserva para el servicio "${servicio.nombreServicio}" el día ${data.fechaServicio} ha sido registrada exitosamente.`,
      });
    }

    return nuevaReserva;
  }

  // Obtener todas las reservas
  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      relations: ['servicio', 'usuario'],
    });
  }

  // Actualizar estado de la reserva
  async update(id: number, estado: string): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id: id }, // 👈 usa "id" si en la entidad es así
      relations: ['servicio', 'usuario'],
    });

    if (!reserva) {
      throw new Error(`Reserva con ID ${id} no encontrada`);
    }

    reserva.estado = estado;
    return await this.reservaRepository.save(reserva);
  }

  // Eliminar reserva
  async remove(id: number): Promise<void> {
    await this.reservaRepository.delete(id);
  }
}
