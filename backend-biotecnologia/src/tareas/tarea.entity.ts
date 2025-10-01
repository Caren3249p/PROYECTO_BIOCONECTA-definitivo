import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas)
  proyecto: Proyecto;

  @ManyToOne(() => Usuario, (usuario) => usuario.tareas)
  usuario: Usuario;

  // other properties
}