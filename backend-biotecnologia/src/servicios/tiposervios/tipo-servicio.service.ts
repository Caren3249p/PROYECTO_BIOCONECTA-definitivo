import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoServicio } from '../tipo-servicio.entity';

@Injectable()
export class TipoServicioService {
  constructor(
    @InjectRepository(TipoServicio)
    private readonly tipoRepo: Repository<TipoServicio>,
  ) {}

  findAll() {
    return this.tipoRepo.find();
  }
}
