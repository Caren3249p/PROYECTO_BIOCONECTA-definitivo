import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Servicio } from '../servicios/servicio.entity';
import { Hito } from '../Hitos/hitos.entity';
import { Tarea } from '../tareas/tarea.entity';
import { User } from '../sysuser/sysuser.entity';

@Entity('project')
export class Proyecto {
  @PrimaryGeneratedColumn({ name: 'idproject' })
  id: number;

  // ⚙️ Mapeamos 'description' de la base como 'descripcion' y damos alias 'nombre'
  @Column({ name: 'description', type: 'varchar', length: 45 })
  descripcion: string;

  // ⚙️ Alias virtual para compatibilidad con reportes y métricas
  get nombre(): string {
    return this.descripcion;
  }

  @Column({ name: 'cost', type: 'float' })
  cost: number;

  @Column({ name: 'startDate', type: 'datetime' })
  fechaInicio: Date;

  @Column({ name: 'endDateExpectation', type: 'datetime' })
  fechaFinEsperada: Date;

  @Column({ name: 'endDate', type: 'datetime' })
  fechaFin: Date;

  // Relación con servicio
  @ManyToOne(() => Servicio, (servicio) => servicio.proyectos)
  @JoinColumn({ name: 'service_idservice' })
  servicio: Servicio;

  // Relación con estado del proyecto
  @Column({ name: 'projectStatus_idprojectStatus', type: 'int' })
  estadoProyecto: number;

  // ⚙️ Relaciones lógicas
  @OneToMany(() => Hito, (hito) => hito.proyecto)
  hitos: Hito[];

  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas: Tarea[];

  // ⚙️ Relación con usuario (aunque tu DB no lo tiene, dejamos el campo virtual)
  usuario?:   User;
}
