import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './proyectos.entity';
import { LogsModule } from '../logs/logs.module'; // 👈 importamos LogsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyecto]),
    LogsModule, // 👈 necesario para usar LogsService en el controlador
  ],
  providers: [ProyectosService],
  controllers: [ProyectosController],
})
export class ProyectosModule {}
