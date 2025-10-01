import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Servicio } from '../servicios/servicio.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Asistencia } from '../asistencia/asistencia/asistencia.entity';


@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Servicio, { eager: true })
  servicio: Servicio;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @CreateDateColumn()
  fechaReserva: Date;

  @Column({ type: 'date' })
  fechaServicio: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.reserva, { cascade: true })
  asistencias: Asistencia[];
}
