import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepositorio: Repository<Servicio>,
  ) {}

  listarTodos() {
    return this.servicioRepositorio.find({ relations: ['tipoServicio'] });
  }

  buscarPorId(id: number) {
    return this.servicioRepositorio.findOne({
      where: { id },
      relations: ['tipoServicio'],
    });
  }

  crear(datos: Partial<Servicio>) {
    const nuevo = this.servicioRepositorio.create(datos);
    return this.servicioRepositorio.save(nuevo);
  }

  async actualizar(id: number, datos: Partial<Servicio>) {
    await this.servicioRepositorio.update(id, datos);
    return this.buscarPorId(id);
  }

  eliminar(id: number) {
    return this.servicioRepositorio.delete(id);
  }
}
