import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';
import { User } from '../sysuser/sysuser.entity';

@Entity('tarea')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'varchar', length: 45, default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas, { eager: true })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @ManyToOne(() => User, (usuario) => usuario.tareas, { eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
