import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Tarea[]> {
    return this.tareaRepository.find({ relations: ['proyecto', 'usuario'] });
  }

  findOne(id: number): Promise<Tarea | null> {
    return this.tareaRepository.findOne({
      where: { id },
      relations: ['proyecto', 'usuario'],
    });
  }

  async create(data: { descripcion: string; proyectoId: number; usuarioId: number; estado?: string }): Promise<Tarea> {
    const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
    const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
      if (!proyecto || !usuario) {
        throw new Error('Proyecto o Usuario no encontrado');
      }
      const tarea = this.tareaRepository.create({
        descripcion: data.descripcion,
        estado: data.estado || 'pendiente',
        proyecto: proyecto,
        usuario: usuario,
      });
      return await this.tareaRepository.save(tarea);
  }

  async update(id: number, data: Partial<Tarea>): Promise<Tarea | null> {
    await this.tareaRepository.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tareaRepository.delete(id);
  }
}