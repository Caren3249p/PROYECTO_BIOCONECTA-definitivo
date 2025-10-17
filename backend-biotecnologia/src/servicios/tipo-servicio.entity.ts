import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servicio } from './servicio.entity';

@Entity('serviceType')
export class TipoServicio {
  @PrimaryGeneratedColumn()
  idserviceType: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @OneToMany(() => Servicio, (servicio) => servicio.tipoServicio)
  servicios: Servicio[];
}
