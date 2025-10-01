import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';

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

  @ManyToOne(() => Usuario, { nullable: false })
  usuario: Usuario;

  @Column({ default: 'privado' })
  permiso: string; // 'privado' | 'publico'
}