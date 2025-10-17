import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyectos.entity';
import { User } from '../sysuser/sysuser.entity';
import { Servicio } from '../servicios/servicio.entity';
import { CrearProyectoDto } from './create-proyecto.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}

  async findAll(): Promise<Proyecto[]> {
    return this.proyectoRepo.find({ relations: ['usuario', 'servicio'] });
  }

  async findOne(id: number): Promise<Proyecto | null> {
    return this.proyectoRepo.findOne({ where: { id }, relations: ['usuario', 'servicio'] });
  }

  async create(data: CrearProyectoDto): Promise<Proyecto> {
    // 🔹 Cambia 'id' por 'idsysuser' si tu entidad User usa ese nombre
    const usuario = await this.userRepo.findOne({ where: { id: data.usuarioId } });
    // 🔹 Cambia 'id' por 'idservice' si tu entidad Servicio usa ese nombre
    const servicio = await this.servicioRepo.findOne({ where: { id: data.servicioId } });

    if (!usuario || !servicio) {
      throw new Error('Usuario o servicio no encontrado');
    }

    const proyecto = this.proyectoRepo.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      usuario,
      servicio,
    });

    return this.proyectoRepo.save(proyecto);
  }

  async update(id: number, data: Partial<Proyecto>): Promise<Proyecto> {
    await this.proyectoRepo.update(id, data);
    const proyecto = await this.findOne(id);
    if (!proyecto) throw new Error('Proyecto no encontrado');
    return proyecto;
  }

  async remove(id: number): Promise<void> {
    await this.proyectoRepo.delete(id);
  }
  
}
