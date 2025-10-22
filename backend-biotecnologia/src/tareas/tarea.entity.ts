import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';
import { User } from '../sysuser/sysuser.entity';

@Entity('task')
export class Tarea {
  @PrimaryGeneratedColumn()
  idtask: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas, { eager: true })
  proyecto: Proyecto;

  @ManyToOne(() => User, (usuario) => usuario.tareas, { eager: true })
  usuario: User;
}
