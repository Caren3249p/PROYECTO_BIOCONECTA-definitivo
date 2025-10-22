import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';
import { User } from '@sysuser/sysuser.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  url: string; // Ruta o nombre del archivo

  @ManyToOne(() => Proyecto, { nullable: false })
  proyecto: Proyecto;

  @ManyToOne(() => User, { nullable: false })
  usuario: User;

  @Column({ default: 'privado' })
  permiso: string; // 'privado' | 'publico'
}