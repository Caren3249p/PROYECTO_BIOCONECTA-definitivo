import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tarea } from '../tareas/tarea.entity'; // 👈 importante importar Tarea

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn({ name: 'idproyecto' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'float', nullable: true })
  costo: number;

  @Column({ type: 'datetime', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'datetime', nullable: true })
  fechaFin: Date;

  // ✅ Relación inversa que soluciona el error
  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas: Tarea[];
}
