import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hito } from './hitos.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';

@Injectable()
export class HitosService {
  constructor(
    @InjectRepository(Hito)
    private readonly hitoRepository: Repository<Hito>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async findAll(): Promise<Hito[]> {
    const hitos = await this.hitoRepository.find({ relations: ['proyecto'] });
    return this.checkRetraso(hitos);
  }

  async findOne(id: number): Promise<Hito> {
    const hito = await this.hitoRepository.findOne({
      where: { id },
      relations: ['proyecto'],
    });
    if (!hito) throw new NotFoundException('Hito no encontrado');
    return this.checkRetraso([hito])[0];
  }

  async findByProyecto(proyectoId: number): Promise<Hito[]> {
    const hitos = await this.hitoRepository.find({
      where: { proyecto: { id: proyectoId } },
      relations: ['proyecto'],
    });
    return this.checkRetraso(hitos);
  }

  async create(data: CreateHitoDto): Promise<Hito> {
    const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    const hito = this.hitoRepository.create({
      nombre: data.nombre,
      estado: data.estado,
      fechaLimite: data.fechaLimite,
      proyecto,
    });
    return this.hitoRepository.save(hito);
  }

  async update(id: number, data: UpdateHitoDto): Promise<Hito> {
    const hito = await this.hitoRepository.findOne({ where: { id } });
    if (!hito) throw new NotFoundException('Hito no encontrado');
    if (data.proyectoId) {
      const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
      if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
      hito.proyecto = proyecto;
    }
    Object.assign(hito, data);
    await this.hitoRepository.save(hito);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.hitoRepository.delete(id);
  }

  // Lógica para marcar retraso automáticamente
  private checkRetraso(hitos: Hito[]): Hito[] {
    const hoy = new Date();
    return hitos.map(hito => {
      if (
        hito.estado !== 'completado' &&
        hito.fechaLimite &&
        new Date(hito.fechaLimite) < hoy
      ) {
        hito.estado = 'retrasado';
      }
      return hito;
    });
  }
}