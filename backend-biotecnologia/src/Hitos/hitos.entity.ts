import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';

@Entity('hitos')
export class Hito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: 'pendiente' })
  estado: string; // 'pendiente', 'en progreso', 'completado', 'retrasado'

  @Column({ type: 'date', nullable: true })
  fechaLimite: Date;

  @ManyToOne(() => Proyecto, { nullable: false })
  proyecto: Proyecto;
}