import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TipoServicio } from './tipo-servicio.entity';

@Entity('service') // nombre real de la tabla en MySQL
export class Servicio {
  @PrimaryGeneratedColumn({ name: 'idservice' })
  id: number;

  @Column({ name: 'serviceName', type: 'varchar', length: 45 })
  nombreServicio: string; // 👈 Este es el campo correcto (no 'nombre')

  @Column({ name: 'description', type: 'varchar', length: 45, nullable: true })
  descripcion: string;

  // Relación con tipo de servicio
  @ManyToOne(() => TipoServicio, (tipo) => tipo.servicios)
  @JoinColumn({ name: 'serviceType_idserviceType' })
  tipoServicio: TipoServicio;

  @Column({ name: 'company_idcompany', type: 'int', nullable: true })
  idEmpresa: number;
}
