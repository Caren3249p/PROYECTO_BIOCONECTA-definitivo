import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sysuser') // 👈 nombre de la tabla en tu base de datos
export class SysUser {
  @PrimaryGeneratedColumn({ name: 'idsysuser' })
  id: number;

  @Column({ name: 'userName' })
  userName: string;

  @Column({ name: 'userLastname' })
  userLastname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;
}
