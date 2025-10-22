import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialParticipacionController } from './historial-participacion.controller';
import { HistorialParticipacionService } from './historial-participacion.service';
import { ReportesHistorialController } from './reportes-historial.controller';
import { ReportesHistorialService } from './reportes-historial.service';
import { HistorialParticipacion } from './historial-participacion.entity';
import { User } from '@sysuser/sysuser.entity';
import { Proyecto } from '../../proyectos/proyectos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialParticipacion, User, Proyecto])
  ],
  controllers: [HistorialParticipacionController, ReportesHistorialController],
  providers: [HistorialParticipacionService, ReportesHistorialService],
  exports: [HistorialParticipacionService] // Para que otros módulos puedan usarlo
})
export class HistorialParticipacionModule {}