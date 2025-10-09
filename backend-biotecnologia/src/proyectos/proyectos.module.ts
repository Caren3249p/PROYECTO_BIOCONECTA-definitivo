import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyectos.entity';
import { ProyectoService } from './proyectos.service';
import { ProyectoController } from './proyectos.controller';
import { Tarea } from '../tareas/tarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Tarea])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService],
})
export class ProyectosModule {} // 👈 en plural
