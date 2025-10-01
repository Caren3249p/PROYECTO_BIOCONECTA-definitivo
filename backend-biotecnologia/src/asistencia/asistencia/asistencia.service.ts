import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './asistencia.entity';
import { Reserva } from '../../reservas/reserva.entity';
import { Usuario } from '../../usuarios/usuarios.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async registrar(data: { reservaId: number; usuarioId: number; presente: boolean }) {
    const reserva = await this.reservaRepository.findOne({ where: { id: data.reservaId } });
    const usuario = await this.usuarioRepository.findOne({ where: { id: data.usuarioId } });

    if (!reserva || !usuario) {
      throw new BadRequestException('Reserva o usuario no encontrados');
    }

    const asistencia = this.asistenciaRepository.create({
      reserva,
      usuario,
      presente: data.presente,
      satisfaccion: undefined, // ✅ mejor undefined en lugar de null
    });

    return this.asistenciaRepository.save(asistencia);
  }

  async findAll() {
    return this.asistenciaRepository.find({ relations: ['reserva', 'usuario'] });
  }

  async findByReserva(reservaId: number) {
    return this.asistenciaRepository.find({
      where: { reserva: { id: reservaId } },
      relations: ['reserva', 'usuario'],
    });
  }
}
