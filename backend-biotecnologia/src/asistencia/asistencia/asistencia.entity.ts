import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Reserva } from '../../reservas/reserva.entity';
import { Usuario } from '../../usuarios/usuarios.entity';

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.asistencias)
  reserva: Reserva;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @Column({ type: 'boolean', default: false })
  presente: boolean;

  @Column({ type: 'int', nullable: true })
  satisfaccion?: number;
}
