import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tarea } from '../tareas/tarea.entity';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'date', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', nullable: true })
  fechaFin: Date;

  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas: Tarea[];
}