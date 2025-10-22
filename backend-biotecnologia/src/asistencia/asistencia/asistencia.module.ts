import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './asistencia.entity';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { Reserva } from '../../reservas/reserva.entity';
import { User } from '@sysuser/sysuser.entity';
import { CertificadosService } from './certificados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Reserva, User])],
  providers: [AsistenciaService, CertificadosService],
  controllers: [AsistenciaController],
})
export class AsistenciaModule {}
