import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '@sysuser/sysuser.entity';
import { Reserva } from '../../reservas/reserva.entity';

@Entity('asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  idasistencia: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User; // 👈 nombre de la propiedad

  @ManyToOne(() => Reserva, { eager: true })
  @JoinColumn({ name: 'reservaId' })
  reserva: Reserva; // 👈 nombre de la propiedad

  @Column({ default: false })
  presente: boolean;

  @Column({ type: 'int', nullable: true })
  satisfaccion?: number;
}
