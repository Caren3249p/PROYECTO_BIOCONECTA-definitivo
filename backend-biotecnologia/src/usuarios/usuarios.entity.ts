// src/usuarios/usuarios.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Rol } from '../roles/rol.entity';
import { Tarea } from '../tareas/tarea.entity';



@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Rol, { nullable: true })
  rol: Rol;
  asistencias: any;
}

