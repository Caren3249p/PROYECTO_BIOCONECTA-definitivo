import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './asistencia.entity';
import { Reserva } from '../../reservas/reserva.entity';
import { User } from '@sysuser/sysuser.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,

    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) {}

  async registrar(data: { reservaId: number; usuarioId: number; presente: boolean }) {
    // 🔹 Buscar reserva y usuario
    const reserva = await this.reservaRepository.findOne({ where: { id: data.reservaId } });
    const usuario = await this.usuarioRepository.findOne({ where: { id: data.usuarioId } });

    if (!reserva || !usuario) {
      throw new BadRequestException('Reserva o usuario no encontrados');
    }

    // 🔹 Crear la asistencia con los nombres de propiedades correctos
    const asistencia = this.asistenciaRepository.create({
      reserva,           // ✅ coincide con la entidad
      usuario,           // ✅ no "User", debe coincidir con el campo en la entidad
      presente: data.presente,
      satisfaccion: undefined,
    });

    // 🔹 Guardar en base de datos
    return this.asistenciaRepository.save(asistencia);
  }

  async findAll() {
    // 🔹 Cargar relaciones definidas en la entidad
    return this.asistenciaRepository.find({ relations: ['reserva', 'usuario'] });
  }

  async findByReserva(reservaId: number) {
    return this.asistenciaRepository.find({
      where: { reserva: { id: reservaId } },
      relations: ['reserva', 'usuario'],
    });
  }
}
