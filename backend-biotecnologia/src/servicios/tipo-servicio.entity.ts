import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servicio } from './servicio.entity';

@Entity('serviceType')
export class TipoServicio {
  @PrimaryGeneratedColumn({ name: 'idserviceType' })
  id: number;

  @Column({ name: 'description', type: 'varchar', length: 45 })
  descripcion: string;

  // Relación inversa: un tipo de servicio tiene varios servicios
  @OneToMany(() => Servicio, (servicio) => servicio.tipoServicio)
  servicios: Servicio[];
}
