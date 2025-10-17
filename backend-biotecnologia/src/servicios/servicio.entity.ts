import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TipoServicio } from './tipo-servicio.entity';
import { Proyecto } from '../proyectos/proyectos.entity';

@Entity('service')
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'idservice' })
  id: number;

  // 👇 Alias: en código se usa 'nombreServicio', pero la columna real es 'serviceName'
  @Column({ name: 'serviceName', type: 'varchar', length: 100 })
  nombreServicio: string;

  // 👇 Alias para descripción
  @Column({ name: 'description', type: 'varchar', length: 300 })
  descripcion: string;

  @ManyToOne(() => TipoServicio, (tipo) => tipo.servicios)
  @JoinColumn({ name: 'serviceType_idserviceType' })
  tipoServicio: TipoServicio;

  @OneToMany(() => Proyecto, (proyecto) => proyecto.servicio)
  proyectos: Proyecto[];
}
