import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Proyecto } from '../src/proyectos/proyectos.entity';

@Entity('metricas_proyecto')
export class MetricaProyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto, { nullable: false })
  proyecto: Proyecto;

  // Métricas de tiempo
  @Column({ type: 'int', default: 0 })
  diasTranscurridos: number;

  @Column({ type: 'int', default: 0 })
  diasRestantes: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  porcentajeAvance: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  porcentajeTiempo: number;

  // Métricas de tareas
  @Column({ type: 'int', default: 0 })
  totalTareas: number;

  @Column({ type: 'int', default: 0 })
  tareasCompletadas: number;

  @Column({ type: 'int', default: 0 })
  tareasEnProgreso: number;

  @Column({ type: 'int', default: 0 })
  tareasPendientes: number;

  @Column({ type: 'int', default: 0 })
  tareasRetrasadas: number;

  // Métricas de hitos
  @Column({ type: 'int', default: 0 })
  totalHitos: number;

  @Column({ type: 'int', default: 0 })
  hitosCompletados: number;

  @Column({ type: 'int', default: 0 })
  hitosRetrasados: number;

  // Métricas de participación
  @Column({ type: 'int', default: 0 })
  usuariosActivos: number;

  @Column({ type: 'int', default: 0 })
  documentosGenerados: number;

  // Índices de desempeño
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  indiceEficiencia: number; // (tareas completadas / días transcurridos) * 100

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  indiceCalidad: number; // (hitos completados / total hitos) * 100

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  indiceColaboracion: number; // (usuarios activos / total usuarios) * 100

  // Clasificación de riesgo
  @Column({ type: 'enum', enum: ['BAJO', 'MEDIO', 'ALTO', 'CRÍTICO'], default: 'BAJO' })
  nivelRiesgo: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  fechaCalculo: Date;

  @Column({ type: 'date', nullable: true })
  fechaProximaRevision: Date;
  tareasPausadas: number;
}