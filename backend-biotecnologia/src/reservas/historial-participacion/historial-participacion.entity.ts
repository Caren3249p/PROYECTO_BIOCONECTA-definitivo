import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '@sysuser/sysuser.entity';
import { Proyecto } from '../../proyectos/proyectos.entity';

export enum TipoParticipacion {
  TAREA_ASIGNADA = 'tarea_asignada',
  TAREA_COMPLETADA = 'tarea_completada',
  RESERVA_CREADA = 'reserva_creada',
  RESERVA_COMPLETADA = 'reserva_completada',
  ASISTENCIA_REGISTRADA = 'asistencia_registrada',
  PROYECTO_ASIGNADO = 'proyecto_asignado',
  HITO_COMPLETADO = 'hito_completado',
  DOCUMENTO_SUBIDO = 'documento_subido'
}

@Entity('historial_participacion')
export class HistorialParticipacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  usuario: User;

  @Column({
    type: 'enum',
    enum: TipoParticipacion
  })
  tipoParticipacion: TipoParticipacion;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  entidadTipo: string; // 'tarea', 'reserva', 'proyecto', etc.

  @Column({ nullable: true })
  entidadId: number; // ID de la entidad relacionada

  @ManyToOne(() => Proyecto, { nullable: true, eager: true })
  proyecto: Proyecto;

  @CreateDateColumn()
  fechaEvento: Date;

  @Column({ type: 'json', nullable: true })
  metadatos: any; // Información adicional específica del evento

  @Column({ default: true })
  activo: boolean;
}