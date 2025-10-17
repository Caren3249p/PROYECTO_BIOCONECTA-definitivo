import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tarea } from '../tareas/tarea.entity';
import { Proyecto } from '../proyectos/proyectos.entity';

@Entity('sysuser')
export class User {
  @PrimaryGeneratedColumn({ name: 'idsysuser' })
  id: number;

  @Column({ name: 'userName', type: 'varchar', length: 45 })
  userName: string;

  @Column({ name: 'userLastname', type: 'varchar', length: 45 })
  userLastname: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'userRole_iduserRole', type: 'int' })
  userRole_iduserRole: number;

  @Column({ name: 'userStatus_iduserStatus', type: 'int' })
  userStatus_iduserStatus: number;

  @Column({ name: 'company_idcompany', type: 'int', nullable: true })
  company_idcompany: number;

  // ✅ Nuevo campo con valor automático
  @Column({
    name: 'creationDate',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];

  @OneToMany(() => Proyecto, (proyecto) => proyecto.usuario)
  proyectos: Proyecto[];
}
