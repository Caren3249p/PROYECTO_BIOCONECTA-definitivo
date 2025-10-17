import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}

  // ✅ Devuelve solo los nombres de los servicios
  async findAllNames(): Promise<string[]> {
    const resultados = await this.servicioRepo
      .createQueryBuilder('servicio')
      .select('servicio.serviceName', 'nombreServicio')
      .getRawMany();

    // Solo retornamos la lista de nombres
    return resultados.map((r) => r.nombreServicio);
  }
}

