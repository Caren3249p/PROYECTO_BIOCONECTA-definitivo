import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva } from './reserva.entity';
import { Servicio } from '../servicios/servicio.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Asistencia } from '../asistencia/asistencia/asistencia.entity'; // 👈 IMPORTANTE
import { LogsModule } from '../logs/logs.module';
import { NotificacionesModule } from '../Notificaciones/notificaciones/notificaciones.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Servicio, Usuario, Asistencia]), // 👈 aquí agregamos Asistencia
    LogsModule,
    NotificacionesModule,
  ],
  providers: [ReservasService],
  controllers: [ReservasController],
  exports: [ReservasService],
})
export class ReservasModule {}
