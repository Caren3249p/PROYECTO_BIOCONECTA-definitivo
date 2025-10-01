import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyectos.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  findAll(): Promise<Proyecto[]> {
    return this.proyectoRepository.find();
  }

  findOne(id: number): Promise<Proyecto | null> {
    return this.proyectoRepository.findOneBy({ id });
  }

  async create(data: CreateProyectoDto): Promise<Proyecto> {
    const proyecto = this.proyectoRepository.create({
      ...data,
      fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : undefined,
      fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
    });
    return this.proyectoRepository.save(proyecto);
  }

  async remove(id: number): Promise<void> {
    await this.proyectoRepository.delete(id);
  }
}