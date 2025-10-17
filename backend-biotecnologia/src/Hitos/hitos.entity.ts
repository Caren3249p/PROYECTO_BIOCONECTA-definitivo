import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';

@Entity('hito') // ⚠️ o usa el nombre real de tu tabla (milestone, project_milestone, etc.)
export class Hito {
  @PrimaryGeneratedColumn({ name: 'idhito' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'datetime', nullable: true })
  fechaLimite: Date;

  // Relación con proyecto
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.hitos)
  @JoinColumn({ name: 'project_idproject' })
  proyecto: Proyecto;

  @Column({ type: 'varchar', length: 50, default: 'pendiente' })
  estado: string;

}
