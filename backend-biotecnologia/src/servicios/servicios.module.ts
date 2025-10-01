import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { Servicio } from './servicio.entity'; 
import { LogsModule } from '../logs/logs.module'; // 👈 importar el módulo

@Module({
  imports: [
    TypeOrmModule.forFeature([Servicio]),
    LogsModule, // 👈 aquí conectamos Logs
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}
