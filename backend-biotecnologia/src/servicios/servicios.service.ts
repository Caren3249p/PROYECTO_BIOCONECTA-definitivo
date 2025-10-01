import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  findAll(): Promise<Servicio[]> {
    return this.servicioRepository.find();
  }

  async findOne(id: number): Promise<Servicio> {
    const servicio = await this.servicioRepository.findOneBy({ id });
    if (!servicio) {
      throw new Error(`Servicio with id ${id} not found`);
    }
    return servicio;
  }

  create(data: Partial<Servicio>): Promise<Servicio> {
    const servicio = this.servicioRepository.create(data);
    return this.servicioRepository.save(servicio);
  }

  async update(id: number, data: Partial<Servicio>): Promise<Servicio> {
    await this.servicioRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.servicioRepository.delete(id);
  }
}