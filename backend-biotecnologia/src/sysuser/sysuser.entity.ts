import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tarea } from '../tareas/tarea.entity';

@Entity('sysuser')
export class User {
  @PrimaryGeneratedColumn({ name: 'idsysuser' })
  idsysuser: number;

  @Column({ name: 'userName', type: 'varchar', length: 45 })
  userName: string;

  @Column({ name: 'userLastname', type: 'varchar', length: 45 })
  userLastname: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: true })
  email: string; // 👈 para compatibilidad con login

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string; // 👈 mantiene compatibilidad con módulos antiguos

  @Column({ name: 'userRole_iduserRole', type: 'int' })
  userRole_iduserRole: number;

  @Column({ name: 'userStatus_iduserStatus', type: 'int' })
  userStatus_iduserStatus: number;

  @Column({ name: 'company_idcompany', type: 'int', nullable: true })
  company_idcompany: number;

  // 🔗 Relación con tareas
  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];
}
