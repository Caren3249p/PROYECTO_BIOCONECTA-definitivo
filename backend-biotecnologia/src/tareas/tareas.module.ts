import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { Tarea } from './tarea.entity';
import { Proyecto } from '../proyectos/proyectos.entity';  // 👈 importa la entidad Proyecto
import { Usuario } from '../usuarios/usuarios.entity';      // 👈 importa la entidad Usuario
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea, Proyecto, Usuario]), // 👈 incluye todas las entidades que uses en el service
    LogsModule,
  ],
  providers: [TareasService],
  controllers: [TareasController],
})
export class TareasModule {}
