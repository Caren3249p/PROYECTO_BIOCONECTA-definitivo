import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CrearTareaDto } from './dto/crear-tarea.dto';
import { Proyecto } from '../proyectos/proyectos.entity';
import { User } from '../sysuser/sysuser.entity';

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

  // 🟢 Crear una nueva tarea
  async create(data: CrearTareaDto): Promise<Tarea> {
    const proyecto = await this.proyectoRepositorio.findOne({
      where: { id: data.proyectoId },
    });

    const usuario = await this.usuarioRepositorio.findOne({
      where: { id: data.usuarioId },
    });

    if (!proyecto || !usuario) {
      throw new NotFoundException('Proyecto o usuario no encontrado');
    }

    const nuevaTarea = this.tareaRepositorio.create({
      descripcion: data.descripcion,
      estado: data.estado || 'pendiente',
      proyecto,
      usuario,
    });

    return await this.tareaRepositorio.save(nuevaTarea);
  }

  // 🟡 Obtener todas las tareas
  async findAll(): Promise<Tarea[]> {
    return this.tareaRepositorio.find({ relations: ['proyecto', 'usuario'] });
  }

  // 🔵 Buscar tarea por ID
  async findOne(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepositorio.findOne({
      where: { idtask: id },
      relations: ['proyecto', 'usuario'],
    });

    if (!tarea) throw new NotFoundException('Tarea no encontrada');
    return tarea;
  }

  // 🟣 Actualizar tarea
  async update(id: number, data: Partial<Tarea>): Promise<Tarea> {
    const tarea = await this.findOne(id);
    Object.assign(tarea, data);
    return await this.tareaRepositorio.save(tarea);
  }

  // 🔴 Eliminar tarea
  async remove(id: number): Promise<void> {
    const tarea = await this.findOne(id);
    await this.tareaRepositorio.remove(tarea);
  }
}
