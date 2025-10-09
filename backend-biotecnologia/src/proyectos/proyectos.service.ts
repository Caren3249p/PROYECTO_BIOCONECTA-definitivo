import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyectos.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  findAll() {
    return this.proyectoRepository.find();
  }

  findOne(id: number) {
    return this.proyectoRepository.findOneBy({ id });
  }

  create(data: Partial<Proyecto>) {
    const nuevo = this.proyectoRepository.create(data);
    return this.proyectoRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Proyecto>) {
    await this.proyectoRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.proyectoRepository.delete(id);
  }
}
