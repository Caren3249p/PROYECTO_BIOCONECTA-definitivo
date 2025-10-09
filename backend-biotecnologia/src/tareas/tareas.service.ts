import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { User } from '../sysuser/sysuser.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepositorio: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepositorio: Repository<Proyecto>,
    @InjectRepository(User)
    private readonly usuarioRepositorio: Repository<User>,
  ) {}

  // 📋 Mostrar todas las tareas
  findAll(): Promise<Tarea[]> {
    return this.tareaRepositorio.find({ relations: ['proyecto', 'usuario'] });
  }

  // 🔍 Buscar una tarea por ID
  findOne(id: number): Promise<Tarea | null> {
    return this.tareaRepositorio.findOne({ where: { id }, relations: ['proyecto', 'usuario'] });
  }

  // ➕ Crear una nueva tarea
  async create(data: CrearTareaDto): Promise<Tarea> {
    const proyecto = await this.proyectoRepositorio.findOne({ where: { id: data.proyectoId } });

    const usuario = await this.usuarioRepositorio.findOne({ where: { idsysuser: data.usuarioId } });

    if (!proyecto || !usuario) {
      throw new Error('Proyecto o Usuario no encontrado');
    }

    const nuevaTarea = this.tareaRepositorio.create({
      descripcion: data.descripcion,
      estado: data.estado || 'pendiente',
      proyecto,
      usuario,
    });

    return await this.tareaRepositorio.save(nuevaTarea);
  }

  // ✏️ Actualizar una tarea
  async update(id: number, data: Partial<Tarea>): Promise<Tarea | null> {
    await this.tareaRepositorio.update(id, data);
    return this.findOne(id);
  }

  // 🗑️ Eliminar una tarea
  async remove(id: number): Promise<void> {
    await this.tareaRepositorio.delete(id);
  }
}
