import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';

@Module({
  providers: [NotificacionesService],
  exports: [NotificacionesService], // 👈 importante para que otros módulos lo usen
})
export class NotificacionesModule {}
