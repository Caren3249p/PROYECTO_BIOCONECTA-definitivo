import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sysuser')
export class User {
  @PrimaryGeneratedColumn()
  idsysuser: number;

  @Column({ length: 45 })
  userName: string;

  @Column({ length: 45 })
  userLastname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 250 })
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column()
  userRole_iduserRole: number;

  @Column()
  userStatus_iduserStatus: number;

  @Column()
  company_idcompany: number;
}
